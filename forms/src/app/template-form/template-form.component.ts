import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  user: any = {
    email: 'leandro@email.com',
    password: 'leandro12'
  };

  constructor() {}

  ngOnInit() {}

  onSubmit(form) {
    console.log(form);
  }
}
