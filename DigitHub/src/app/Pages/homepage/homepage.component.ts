import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { Product } from '../../model/product.model';
import { Category } from '../../model/category.model';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit{

  products : Product[] | undefined;
  displayedProducts : Product[] | undefined;
  categories : Category[] | undefined;
  isLoggedIn : boolean = false;
  isAdmin : boolean = false;
  nbOfItems : number = 0;

  constructor(
    private backendApi : BackendApiService,
    private tokenStorageService : TokenStorageService
  ){}

  deleteCategory(id? : number) : void {
    this.backendApi
    .deleteCategory(id!)
    .subscribe({
      next: () => window.location.reload(),
      error: err => console.error('An error occurred', err),  
      complete: () => console.log('category deleted')
    });
  }

  addProductToCart(product : Product) : void {
    this.tokenStorageService.saveProductInCart(product);
    this.nbOfItems = JSON.parse(this.tokenStorageService.getProductInCart()).length
  }

  setAllProducts() : void {
    this.displayedProducts = this.products;
  }
  
  filterProduct($category : Category) : void {
    this.displayedProducts = this.products?.filter((product) => product.category_fk == $category.category_id)
  }

  deleteProduct(id? : number) : void {
    this.backendApi
    .deleteProduct(id!)
    .subscribe({
      next: () => window.location.reload(),
      error: err => console.error('An error occurred', err),  
      complete: () => console.log('product deleted')
    });
  }

  ngOnInit() : void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.isAdmin = this.tokenStorageService.getRole() == 3;
    this.backendApi
    .getProducts()
    .subscribe({
      next: res => {
        this.products = res;
        this.displayedProducts = res;
      },  
      error: err => console.error('An error occurred', err),  
      complete: () => console.log('All products retrieved')  
    });
  
    this.backendApi
    .getCategories()
    .subscribe({
      next: res => {
        this.categories = res;
      },  
      error: err => console.error('An error occurred', err),  
      complete: () => console.log('All categories retrieved')  
    });
  }
}
