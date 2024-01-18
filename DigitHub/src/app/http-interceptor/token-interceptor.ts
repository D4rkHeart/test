import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BackendApiService } from "../services/backend-api.service";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private backendApiService : BackendApiService,
    private tokenStorage : TokenStorageService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const token = this.tokenStorage.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if(token != ''){
      request = request.clone({
        headers: request.headers
        .set('x-access-token', token)
      });
    }
    // send cloned request with header to the next handler.
      return next.handle(request);
  }
}