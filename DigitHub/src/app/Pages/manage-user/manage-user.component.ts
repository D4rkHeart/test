import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendApiService } from '../../services/backend-api.service';
import { User } from '../../model/user.model';
import { DatePipe } from '@angular/common';
import Validation from '../../utils/passwordValidation';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit{
  userGroup! : FormGroup;
  userAlreadyexistLabel : string = '';
  hidePassword : boolean = true;
  user! : User;

  constructor(
    private router : Router,
    private backendAPIService : BackendApiService,
    public datepipe: DatePipe,
    private route : ActivatedRoute
  ){}

  saveUser() : void{
    if(this.user) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  updateUser() : void {
    if(this.userGroup.valid){
      this.user.first_name = this.userGroup.value.first_name,
      this.user.last_name = this.userGroup.value.last_name,
      this.user.birthdate = this.datepipe.transform(this.userGroup.value.birthdate, 'yyyy-MM-dd') || ''

      this.backendAPIService
      .setUser(this.user)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: err => {
          if(err.status==409) {
            this.userAlreadyexistLabel = 'Un utilisateur a déjà été crée avec cet email'
          }
        },  
        complete: () => console.log('User updated')  
      });
    }
  }

  addUser() : void {
    if(this.userGroup.valid){
      /* create new user */
      const user = new User(
        this.userGroup.value.first_name,
        this.userGroup.value.last_name,
        this.userGroup.value.mail,
        this.userGroup.value.password,
        this.datepipe.transform(this.userGroup.value.birthdate, 'yyyy-MM-dd') || '',1);

      this.backendAPIService
      .addUser(user)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: err => {
          if(err.status==409) {
            this.userAlreadyexistLabel = 'Un utilisateur a déjà été crée avec cet email'
          }
        },  
        complete: () => console.log('User created')  
      });
    }
  }

  ngOnInit() : void {
    this.userGroup = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
    });
    this.userGroup.setValidators(Validation.match('password', 'confirmPassword'))

    const userId = this.route.snapshot.paramMap.get('id')
    if(userId != null) {
      this.backendAPIService
      .getUser(Number(userId))
      .subscribe({
        next: (res) => {
          this.user = res;
          
          this.userGroup.controls['password'].clearValidators();
          this.userGroup.controls['confirmPassword'].clearValidators();

          this.userGroup.setValue({
            first_name: res.first_name,
            last_name: res.last_name,
            mail: res.mail,
            password: '123',
            confirmPassword: '123',
            birthdate: res.birthdate
          });
        },
        error: (err) => console.log('Something went wrong', err),
        complete: () => {
          console.log('product retrieved')
        }
      });
    }
  }
}
