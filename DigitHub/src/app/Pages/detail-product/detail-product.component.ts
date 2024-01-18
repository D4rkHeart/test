import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { Product } from 'src/app/model/product.model';
import { BackendApiService } from 'src/app/services/backend-api.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  
  productGroup! : FormGroup;
  category! : Category;
  categories! : Category[];
  image: string = '';
  product! : Product;
  nbOfItems : number = 0;
  
  constructor(
    private tokenStorageService : TokenStorageService,
    private backendApiService : BackendApiService,
    private route : ActivatedRoute,
    private router : Router
    ){}

  addToCart() : void {
      this.tokenStorageService.saveProductInCart(this.product);
      this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.productGroup = new FormGroup({
      category: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required,  Validators.pattern("^(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$")]),
    });

    const productId = this.route.snapshot.paramMap.get('id')
    if(productId != null) {
      this.backendApiService
      .getProduct(Number(productId))
      .subscribe({
        next: (res) => {
          if(res.image !== undefined){
            this.image = res.image;
          }
          this.product = res;
          
          delete this.product['image']

          this.productGroup.setValue({
            category: '',
            name: res.name,
            description: res.description,
            price: res.price
          });

          this.backendApiService
          .getCategory(res.category_fk)
          .subscribe({
            next: (res) => {
              this.category = res
              console.log(this.category)
              this.productGroup.patchValue({
                category: this.category.name
              });
            },
            error: (err) => console.log('Something went wrong', err),
            complete: () => console.log('product retrieved')
          })
        },
        error: (err) => console.log('Something went wrong', err),
        complete: () => {
          console.log('product retrieved')
        }
      });
    }
  }
}
