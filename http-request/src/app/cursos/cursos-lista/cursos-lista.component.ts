import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos$: Observable<Curso[]>;
  errors$ = new Subject<boolean>();
  bsModalRef: BsModalRef;

  constructor(private service: CursosService, private alerteService: AlertModalService, private router: Router, private route: ActivatedRoute) { }

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
    this.alerteService.showAlertDanger('Error ao carregar cursos...Tente novamente mais tarde')
  }

  onEdit(id) {
    this.router.navigate(['editar', id], { relativeTo: this.route })
  }
}
