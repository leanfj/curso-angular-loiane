import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from "@angular/common";

import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  preserveWhitespaces: true

})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: CursosService, private modalService: AlertModalService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    })

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const curso$ = this.service.loadById(params.id)

    //     curso$.subscribe(curso => {
    //       this.updateForm(curso)
    //     })
    //   }
    // )


    this.route.params.pipe(
      map((params: any) => params['id']),
      switchMap(id => this.service.loadById(id))
    ).subscribe(curso => this.updateForm(curso))
  }

  updateForm(curso) {
    this.form.patchValue({
      id: curso.id,
      name: curso.name
    })
  }

  hasError(field: string) {
    return this.form.get(field).errors
  }

  onSubmit() {
    this.submitted = true
    console.log(this.form.value)
    if (this.form.valid) {
      console.log('submit')
      this.service.create(this.form.value).subscribe(
        success => {
          console.log(success)
          this.modalService.showAlertSucces('Curso cadastrado com sucesso')
          this.location.back()
        },
        error => {
          console.log(error)
          this.modalService.showAlertDanger('Erro ao criar curso, tente novamente')
        },
        () => console.log('Request Completado')
      )
    }
  }

  onCancel() {
    this.submitted = false
    this.form.reset()
  }


}
