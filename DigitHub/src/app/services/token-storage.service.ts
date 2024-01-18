import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Product } from '../model/product.model';

const TOKEN_KEY = 'auth-token';
const ROLE_KEY = 'auth-role';
const CODE_KEY ='auth-code';
const MAIL_KEY ='auth-mail';
const USER_ID = 'user-id'
const PRODUCT_IN_CART='product-in-cart';
const TRANSACTION_KEY='transaction-id'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signout() : void {
    window.sessionStorage.clear();
  }

  public saveToken(token : string) : void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveCode(code : string) : void {
    window.sessionStorage.removeItem(CODE_KEY);
    window.sessionStorage.setItem(CODE_KEY, code);
  }

  public saveMail(mail : string) : void {
    window.sessionStorage.removeItem(MAIL_KEY);
    window.sessionStorage.setItem(MAIL_KEY, mail);
  }
  public saveUserId(id : number) : void {
    window.sessionStorage.removeItem(USER_ID);
    window.sessionStorage.setItem(USER_ID, id.toString());
  }

  public saveProductInCart(product : Product) : void {
    const productInCart = this.getProductInCart()
    let productArray = productInCart === '' ? [] : JSON.parse(productInCart)
    productArray.push(product)
    window.sessionStorage.setItem(PRODUCT_IN_CART, JSON.stringify(productArray));
  }

  public saveRole(user : User) : void {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(user));
  }

  public saveTransactionId(Id : string) : void {
    window.sessionStorage.removeItem(TRANSACTION_KEY);
    window.sessionStorage.setItem(TRANSACTION_KEY, Id);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) || '';
  }
  
  public getCode() : string {
    return sessionStorage.getItem(CODE_KEY) || '';
  }

  public getMail() : string {
    return sessionStorage.getItem(MAIL_KEY) || '';
  }

  public getUserId() : string {
    return sessionStorage.getItem(USER_ID) || '';
  }
  public getProductInCart() : string {
    return sessionStorage.getItem(PRODUCT_IN_CART) || '';
  }

  public getRole(): any {
    return sessionStorage.getItem(ROLE_KEY);
  }

  public getTransactionId(): any {
    return sessionStorage.getItem(TRANSACTION_KEY);
  }

  public deleteCode() : void {
    window.sessionStorage.removeItem(CODE_KEY);
  }

  public deleteMail() : void {
    window.sessionStorage.removeItem(MAIL_KEY);
  }

  public deleteUserId() : void {
    window.sessionStorage.removeItem(USER_ID);
  }

  public deleteProductInList(product: Product) : void {
    let productArray = JSON.parse(this.getProductInCart())
    const index = productArray.findIndex((x: Product) => x.product_id === product.product_id)
    if(index != -1){
      productArray.splice(index, 1);
    }
    window.sessionStorage.setItem(PRODUCT_IN_CART, JSON.stringify(productArray));
  }

  public deleteAllSameProductInList(product: Product) : void {
    let index = 0
    let productArray = JSON.parse(this.getProductInCart())

    do {
      index = productArray.findIndex((x: Product) => x.product_id === product.product_id)
      if(index != -1){
        productArray.splice(index, 1);
      }
      window.sessionStorage.setItem(PRODUCT_IN_CART, JSON.stringify(productArray));
    } while(index > -1)
  
  }

  public deleteProductList() : void {
    window.sessionStorage.removeItem(PRODUCT_IN_CART);
  }

  public deleteTransactionId() : void {
    window.sessionStorage.removeItem(TRANSACTION_KEY);
  }
}
