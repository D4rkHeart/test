import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(
    private http : HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http
    .get<User[]>(environment.apiUrl + '/users')
    .pipe(
      catchError(this.handleError)
      )
  }

  setUser(user : User) : Observable<User> {
    return this.http
    .post<User>(environment.apiUrl + '/users', user, {'headers':this.headers})
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
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
