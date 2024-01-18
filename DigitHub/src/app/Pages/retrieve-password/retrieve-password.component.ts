import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendApiService } from '../../services/backend-api.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-retrieve-password',
  templateUrl: './retrieve-password.component.html',
  styleUrls: ['./retrieve-password.component.scss']
})
export class RetrievePasswordComponent implements OnInit{
  mailGroup! : FormGroup;
  noUserFound! : string;

  constructor(
    private backendApiService : BackendApiService,
    private tokenStorageService : TokenStorageService,
    private router : Router
  ){}

  retrievePassword(){
    if(this.mailGroup.valid){
      this.backendApiService
      .retrievePassword(this.mailGroup.value.email)
      .subscribe({
        next: (res) => {
          this.tokenStorageService.saveCode(res.code)
          this.tokenStorageService.saveMail(this.mailGroup.value.email)
          this.router.navigate(['/modify-password'])
        },  
        error: err => {
          this.noUserFound = 'Aucun utilisateur n\'a été trouvé avec cet email'
          console.error('An error occured', err);
        },  
        complete: () => console.log('Code send')  
      })
    }
  }

  ngOnInit() : void {
    this.mailGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });  
  }
}
