import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { Cart } from 'src/app/model/cart.model';
import { Product } from 'src/app/model/product.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  displayedColumns: string[] = ['image','description', 'remove', 'quantity', 'add', 'delete', 'price'];
  products : Product[] = []
  cartGroup! : FormGroup
  dataSource = new ProductDataSource(this.products);
  nbOfItems : number = 0;

  constructor(
    private tokenStorage : TokenStorageService,
    private backendApiService : BackendApiService,
    private _snackBar : MatSnackBar,
    private route : Router
    ){}

  addOneProduct(product : Product) : void {
    product.quantity! += 1;
    this.nbOfItems += 1;
    this.tokenStorage.saveProductInCart(product);
  }

  removeOneProduct(product : Product) : void {
    if(this.nbOfItems >=0 && product.quantity! > 0) {
      product.quantity! -= 1
      this.nbOfItems -= 1;
      this.tokenStorage.deleteProductInList(product);
    }
  }

  getTotalPrice() : number {
    let totalPrice : number = 0;
    this.products.forEach((product : Product) => totalPrice += (product.price * product.quantity!));
    return totalPrice;
  }

  getTotalQuantity() : number {
    let totalQuantity : number = 0;
    this.products.forEach((product : Product) => totalQuantity += product.quantity!);
    return totalQuantity;
  }

  payCart() : void {
      if(this.products.length<=0){
        this._snackBar.open('La commande est vide', 'OK');
      }else{
        if(this.tokenStorage.getUserId() == '') {
          this._snackBar.open('Vous devez vous logger', 'OK');
        }else {
          this.products.forEach((product: Product) => {
            let cart : Cart = new Cart(Number(this.tokenStorage.getUserId()), product.product_id!, product.quantity!)
            this.backendApiService
            .addCart(cart)
            .subscribe({
              next: () => this.route.navigate(['/payment']),
              error: (err) => console.log('Something went wrong: ', err),
              complete: () => console.log('cart added')
            });
          });
        }
      }
  }

  removeProduct(product : Product) : void {
    this.tokenStorage.deleteAllSameProductInList(product);

    const index = this.products.findIndex(x => x.product_id! === product.product_id);
    if(index != -1){
      this.products.splice(index, 1);
    }
    this.dataSource.setData(this.products)
  }

  ngOnInit(): void {
    const products = JSON.parse(this.tokenStorage.getProductInCart())
    this.nbOfItems =products.length;

    products.forEach((product: Product) => {
      let productIndex = this.products.findIndex((x : Product) => x.product_id === product.product_id);

      if(productIndex! > -1) {
        this.products[productIndex]!.quantity = Number(this.products[productIndex]!.quantity) + 1;
      } else {
        product.quantity = 1;
        this.products.push(product);
      }
    });
  }
}

class ProductDataSource extends DataSource<Product> {
  private _dataStream = new ReplaySubject<Product[]>();

  constructor(initialData: Product[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Product[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: Product[]) {
    this._dataStream.next(data);
  }
}