import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent {

  constructor(
    private tokenStorageService : TokenStorageService,
    private router : Router
    ){}

 logout() {
    this.tokenStorageService.signout();
    if(this.router.url === '/home'){
      window.location.reload();
    }
    else {
      this.router.navigate(['/home']);
    }
 }
}
