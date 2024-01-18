import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { ThemeService } from '../../services/theme.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() nbOfItems = 0;
  
  isLoggedIn : boolean = false;
  isDarkMode! : boolean;

  constructor(
    private tokenStorageService : TokenStorageService,
    private themeService : ThemeService,
    private router : Router,
    private _snackBar: MatSnackBar
  ){}

  toggleDarkMode() : void {
    this.isDarkMode
     ? this.themeService.update('lightTheme')
     : this.themeService.update('darkTheme');
    this.isDarkMode = this.themeService.isDarkMode()
  }

  updateNbproductInCart() : void {
    const productInCart = this.tokenStorageService.getProductInCart();
    this.nbOfItems = productInCart ? JSON.parse(productInCart).length : 0;
  }

  goToCart() : void {
    if(this.nbOfItems>0){
      this.router.navigate(['/cart'])
    } else {
        this._snackBar.open('Le panier est vide', 'OK');
      }
  }

  ngOnChanges() : void {
    this.updateNbproductInCart();
  }

  ngOnInit() : void {
    this.updateNbproductInCart()
    this.isDarkMode = this.themeService.isDarkMode();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
}
