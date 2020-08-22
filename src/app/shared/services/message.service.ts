import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
import Swal from 'sweetalert2';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    public translateService: TranslationService
  ) { }

  success(message: string) {
    alertify.success(message);
  }

  warning(message: string) {
    alertify.error(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  confirm(text: string, callBackConfirm: any, title = "", callBackCancel = null, confirmButtonText = "yes", cancelButtonText = "not", confirmButtonColor = "#3085d6", cancelButtonColor = "#d33") {
    Swal.fire({
      title: title != "" ? this.translateService.getTranslate('title.' + title) : "",
      text: this.translateService.getTranslate('message.' + text),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
      cancelButtonText: this.translateService.getTranslate('button.' + cancelButtonText),
      confirmButtonText: this.translateService.getTranslate('button.' + confirmButtonText)
    }).then((result) => {
      if (result.value) {
        callBackConfirm();
      } else {
        if (callBackCancel !== null) {
          callBackCancel();
        }
      }
    })
  }

  confirmReturn200(message: string, title = "") {
    Swal.fire(
      title != "" ? this.translateService.getTranslate('message.' + title) : "",
      this.translateService.getTranslate('message.' + message),
      'success'
    )
  }
}
