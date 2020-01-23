import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[]

  cursos$: Observable<Curso[]>;
  errors$ = new Subject<boolean>();
  bsModalRef: BsModalRef;

  constructor(private service: CursosService, private modalService: BsModalService) { }

  ngOnInit() {
    this.onRefresh()
  }

  onRefresh() {
    // this.service.list().subscribe(dados => this.cursos = dados)
    this.cursos$ = this.service.list().pipe(catchError(error => {
      console.error(error)
      // this.errors$.next(true)
      this.handleError()
      return empty()
    }))
  }


  handleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent)
    this.bsModalRef.content.type = 'danger'
    this.bsModalRef.content.message = 'Error ao carregar cursos...Tente novamente mais tarde'
  }
}
