import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendApiService } from '../../services/backend-api.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { ForgottenPassword } from '../../model/forgottenPassword.model';
import Validation from '../../utils/passwordValidation';

@Component({
  selector: 'app-modify-password',
  templateUrl: './modify-password.component.html',
  styleUrls: ['./modify-password.component.scss']
})
export class ModifyPasswordComponent {
  modifyPasswordGroup! : FormGroup
  codesDontMatchLabel! : string
  hidePassword : boolean = true;

  constructor(
    private backendApiService : BackendApiService,
    private tokenStorageService : TokenStorageService,
    private router : Router
  ){}

  modifyPassword(){
    let forgottenPassword = new ForgottenPassword(this.tokenStorageService.getMail(), this.modifyPasswordGroup.value.password);
    if(this.modifyPasswordGroup.valid){
      if(this.modifyPasswordGroup.value.code != this.tokenStorageService.getCode()){
        this.codesDontMatchLabel = 'Le code n\' est pas le bon. Vérifier vos mails' 
      }else{
        this.backendApiService
        .modifyPassword(forgottenPassword)
        .subscribe({
          next: () => {
            this.router.navigate(['/home'])
          },  
          error: err => {
            console.error('An error occurred', err);
          },  
          complete: () => console.log('password updated')  
        })
      }
    }
  }

  ngOnInit() : void {
    this.modifyPasswordGroup = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      code : new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])
    });
    this.modifyPasswordGroup.setValidators(Validation.match('password', 'confirmPassword'))
  }
}
