import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MessageService } from '../../services/message.service';
import { TranslationService } from '../../services/translation.service';
import { PaymentCard } from '../../models/paymentCard.model';
import { StorageService } from '../../services/storage.service';
import { PaymentCardService } from '../../services/payment-card.service';

@Component({
  selector: 'ngx-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss']
})
export class ModalCardComponent implements OnInit {
  public data: PaymentCard;
  constructor(
    protected ref: NbDialogRef<ModalCardComponent>,
    private translateService: TranslationService,
    public messageService: MessageService,
    public paymentCardService: PaymentCardService
  ) { }

  ngOnInit() {
    this.data = new PaymentCard();
  }

  do(f: any) {
    if (f.form.status === 'INVALID') {
      const message = this.translateService.getTranslate('message.requiredFieldNotCompleted');
      this.messageService.error(message);
      return;
    }
    /* VALIDAR TARGETA AQUI */
    const cardNumber = "" + this.data.cardNumber + "";
    const posEnd = cardNumber.length - 1;
    this.data.ultimateCardDigit = cardNumber.substr(posEnd - 4, cardNumber.length).trim();
    this.paymentCardService.emitChangeEvent(this.data);
    this.data = new PaymentCard();
    this.cancel();
  }

  cancel() {
    this.ref.close();
  }

}
