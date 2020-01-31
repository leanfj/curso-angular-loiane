import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from "@angular/common";

import { CursosService } from '../cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
  preserveWhitespaces: true

})
export class CursosFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: CursosService, private modalService: AlertModalService, private location: Location) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
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
