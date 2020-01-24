import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal/alert-modal.component';


export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalServide: BsModalService) { }

  private showAlert(message: string, type: string) {
    const bsModaRef: BsModalRef = this.modalServide.show(AlertModalComponent)
    bsModaRef.content.type = type
    bsModaRef.content.message = message
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER)
  }
  showAlertSucces(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS)
  }

}
