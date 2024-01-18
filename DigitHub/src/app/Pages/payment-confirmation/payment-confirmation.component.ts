import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss']
})
export class PaymentConfirmationComponent implements OnInit{

  transactionId! : string;

  constructor(private tokenStorage : TokenStorageService){}

  ngOnInit(): void {
    this.transactionId = this.tokenStorage.getTransactionId();
  }
}
