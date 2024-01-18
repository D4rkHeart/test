import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-account-button',
  templateUrl: './account-button.component.html',
  styleUrls: ['./account-button.component.scss']
})
export class AccountButtonComponent implements OnInit{

  constructor(
    private tokenStorageService : TokenStorageService
  ){}
  user_id : number = Number(this.tokenStorageService.getUserId())

  ngOnInit(): void {
  }
}
