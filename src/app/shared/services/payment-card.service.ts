import { Injectable, EventEmitter } from '@angular/core';
import { PaymentCard } from '../models/paymentCard.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentCardService {
  public change: EventEmitter<PaymentCard> = new EventEmitter();
  constructor() { }

  emitChangeEvent(paymentCard: PaymentCard): void {
    this.change.emit(paymentCard);
  }

  getChangeEmitter() {
    return this.change;
  }
}
