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

  private showAlert(message: string, type: string, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalServide.show(AlertModalComponent)
    bsModalRef.content.type = type
    bsModalRef.content.message = message

    if (dismissTimeout) {
      setTimeout(() => {
        bsModalRef.hide()
      }, dismissTimeout)
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER)
  }
  showAlertSucces(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 2000)
  }

}
