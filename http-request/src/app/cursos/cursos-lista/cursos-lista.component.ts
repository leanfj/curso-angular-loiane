import { Component, OnInit } from '@angular/core';
import { CursosService } from '../cursos.service';
import { Curso } from '../curso';
import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  constructor(private service: CursosService) { }

  ngOnInit() {
    this.onRefresh()
  }

  onRefresh() {
    // this.service.list().subscribe(dados => this.cursos = dados)
    this.cursos$ = this.service.list().pipe(catchError(error => {
      console.error(error)
      this.errors$.next(true)
      return empty()
    }))
  }

}
