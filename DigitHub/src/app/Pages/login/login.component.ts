import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  userGroup! : FormGroup;
  
  constructor(
    private backendApiService : BackendApiService,
    private router : Router,
    private tokenStorageService : TokenStorageService,
    private _snackBar : MatSnackBar
    ){}

  login() {
    if(this.userGroup.valid) {
      this.backendApiService.login(this.userGroup.value.email, this.userGroup.value.password).subscribe({
        next: (res) => {
          this.tokenStorageService.saveToken(res.token);
          this.tokenStorageService.saveRole(res.role);
          this.tokenStorageService.saveUserId(res.role);
          this.router.navigate(['/home']);
        },  
        error: err => {
          this._snackBar.open('Mail ou password invalide', 'OK');
          console.error('An error occurred', err);
        },  
        complete: () => console.log('logged in')  
      })
    }
  }

  ngOnInit() : void {
    this.userGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });  
  }
}
