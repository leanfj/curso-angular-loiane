import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TemplateFormComponent } from './template-form.component';

@NgModule({
  declarations: [TemplateFormComponent],
  imports: [CommonModule, FormsModule]
})
export class TemplateFormModule {}
