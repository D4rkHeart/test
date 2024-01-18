import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';
import { Cart } from '../model/cart.model';
import { Order } from '../model/order.model';
import { ForgottenPassword } from '../model/forgottenPassword.model';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  
  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')

  constructor(private http : HttpClient) {}
  
  login(username: string, password: string) {
    let loginHeaders = new HttpHeaders()
    .set('Authorization', 'Basic ' + btoa(username + ':' + password));
      return this.http.get<any>(environment.apiUrl + '/login', {headers : loginHeaders });
  }

  retrievePassword(mail : string) : Observable<any> {
    return this.get<any>('/retrievePassword/' + mail)
  }

  modifyPassword(forgottenPassword : ForgottenPassword) : Observable<any> {
    return this.put<any>('/modifyPassword', forgottenPassword)
  }

  uploadMedia(file : File) {
    let formData = new FormData();
    formData.append('file', file, file.name)
    return this.http.post<any>(environment.apiUrl + '/media/upload', formData);
  }

  getMedia(fileName : string) {
    return this.http.get(environment.apiUrl + '/media/' + fileName, { responseType: 'blob' });
  }

  getUsers(): Observable<User[]> {
    return this.get<User[]>('/users');
  }

  getUser(id : number): Observable<User> {
    return this.get<User>('/users/'+ String(id));
  }

  addUser(user : User) : Observable<User> {
    return this.post<User>('/users', user);
  }

  setUser(user : User) : Observable<User> {
    return this.put<User>('/users', user)
  }

  deleteUser(id : number) : Observable<String> {
    return this.delete('/users/'+ String(id))
  }

  getCategories(): Observable<Category[]> {
    return this.get<Category[]>('/categories');
  }

  getCategory(id : number): Observable<Category> {
    return this.get<Category>('/categories/'+ String(id));
  }

  addCategory(category : Category) : Observable<Category> {
    return this.post<Category>('/categories', category);
  }

  setCategory(category : Category) : Observable<Category> {
    return this.put<Category>('/categories', category)
  }

  deleteCategory(id : number) : Observable<String> {
    return this.delete('/categories/'+ String(id))
  }

  getProducts(): Observable<Product[]> {
    return this.get<Product[]>('/products')
  }

  getProduct(id : number): Observable<Product> {
    return this.get<Product>('/products/'+ String(id))
  }

  addProduct(product : Product) : Observable<Product> {
    return this.post<Product>('/products', product);
  }

  setProduct(product : Product) : Observable<Product> {
    return this.put<Product>('/products', product)
  }

  deleteProduct(id : number) : Observable<String> {
    return this.delete('/products/'+ String(id))
  }

  getCarts(): Observable<Cart[]> {
    return this.get<Cart[]>('/carts');
  }

  getCart(id : number): Observable<Cart> {
    return this.get<Cart>('/carts/'+ String(id));
  }

  addCart(cart : Cart) : Observable<Cart> {
    return this.post<Cart>('/carts', cart);
  }

  setCart(cart : Cart) : Observable<Cart> {
    return this.put<Cart>('/carts', cart)
  }

  deleteCart(id : number) : Observable<String> {
    return this.delete('/carts/'+ String(id))
  }

  getOrders(): Observable<Order[]> {
    return this.get<Order[]>('/orders');
  }

  getOrder(id : number): Observable<Order> {
    return this.get<Order>('/orders/' + String(id));
  }

  addOrder(order : Order) : Observable<Order> {
    return this.post<Order>('/orders', order);
  }

  setOrder(order : Order) : Observable<Order> {
    return this.put<Order>('/orders', order)
  }

  deleteOrder(id : number) : Observable<String> {
    return this.delete('/orders/'+ String(id))
  }

  private get<T>(url : string) {
    return this.http
    .get<T>(environment.apiUrl + url)
    .pipe(
      catchError(this.handleError)
      )
  }

  private post<T>(url: string, objectToPost : T){
    return this.http
    .post<T>(environment.apiUrl + url, objectToPost, {'headers':this.headers})
    .pipe(
      catchError(this.handleError)
    )
  }

  private put<T>(url: string, objectToPost : T){
    return this.http
    .put<T>(environment.apiUrl + url, objectToPost, {'headers':this.headers})
    .pipe(
      catchError(this.handleError)
    )
  }

  private delete(url : string){
    return this.http
    .delete<String>(environment.apiUrl + url)
    .pipe(
    catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => error);
  }
}
