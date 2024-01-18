import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-payment-loader',
  templateUrl: './payment-loader.component.html',
  styleUrls: ['./payment-loader.component.scss']
})
export class PaymentLoaderComponent implements OnInit{
  products : Product[] = [];

  @ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef

  constructor(
    private tokenStorage : TokenStorageService,
    private router : Router
  ){}
  totalAmount() : number {
    let totalAmount : number = 0;
    this.products.forEach((product : Product) => {
      totalAmount+= Number(product.price)
    })
    return totalAmount
  }

  ngOnInit() :void {
    this.products = JSON.parse(this.tokenStorage.getProductInCart())
    window.paypal.Buttons({
      style: {
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.totalAmount().toString(),
                currency_code: 'CHF'
              }
            }
          ]
        })
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          if(details.status === 'COMPLETED'){
            this.tokenStorage.saveTransactionId(details.id);
            this.tokenStorage.deleteProductList()
            this.router.navigate(['confirm']);
          }
        })
      },
      onError: (error: any) => {
        console.log(error);
      }
    }).render(this.paymentRef.nativeElement);
  }
}
