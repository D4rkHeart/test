import { Component, OnInit } from '@angular/core';
import { BackendApiService } from '../../services/backend-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../model/category.model';
import { Product } from '../../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  fileName = '';
  image: any = '';
  newImage : boolean = false;
  product! : Product;
  productGroup! : FormGroup;
  categories : Category[] = [];
  file! : File;

  constructor(
    private backendApiService : BackendApiService,
    private router : Router,
    private route: ActivatedRoute,
    ) {}

  saveProduct() : void {
   if(this.product != null) {
    this.updateProduct();
   }else {
    this.addProduct();
   }
  }

  addProduct() : void {
    if(this.productGroup.valid) {
      let product = new Product(
      this.productGroup.value.category,
      this.productGroup.value.name,
      this.productGroup.value.description,
      this.productGroup.value.price,
      this.fileName || ''
      )
    
      this.backendApiService
      .addProduct(product)
      .subscribe({
        next: () => {
          if(this.file) {
            this.backendApiService
            .uploadMedia(this.file)
            .subscribe({
              next: () => this.router.navigate(['/home']),
              error: err => console.error('An error occurred', err),  
              complete: () => console.log('media uploaded')  
            })
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: err => console.error('An error occurred', err),  
        complete: () => console.log('product added')  
      })
    } 
  }

  updateProduct() : void {
    if(this.productGroup.valid) {
      this.product.category_fk = this.productGroup.value.category;
      this.product.name = this.productGroup.value.name;
      this.product.description = this.productGroup.value.description;
      this.product.price = this.productGroup.value.price;
      this.product.image_path = this.fileName;

      this.backendApiService
      .setProduct(this.product)
      .subscribe({
        next: () => {
          if(this.newImage) {
          this.backendApiService
          .uploadMedia(this.file)
          .subscribe({
            next: () => this.router.navigate(['/home']),
            error: err => console.error('An error occurred', err),  
            complete: () => console.log('media uploaded')  
          })
          } else {
            this.router.navigate(['/home'])
          }
        },
        error: err => console.error('An error occurred', err),  
        complete: () => console.log('product updated')  
      })
    }
  }

  deletePicture(): void {
    this.image ='';
    this.fileName = '';
  }

  onFileSelected(event : any) {

    const newFile:File=event.target.files[0];

    if (newFile) {
      this.fileName = newFile.name;
      this.newImage = true;
      this.file = newFile;
      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.image = reader.result as any;
      }
    }
  }

  ngOnInit() : void {
    this.productGroup = new FormGroup({
      category: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required,  Validators.pattern("^(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$")]),
    });

    this.backendApiService
    .getCategories()
    .subscribe({
      next: (res) => {
        this.categories = res
      },
      error: err => console.error('An error occurred', err),  
      complete: () => console.log('All categories retrieved')  
    })

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
          
          this.fileName = res.image_path!

          this.productGroup.setValue({
            category: res.category_fk,
            name: res.name,
            description: res.description,
            price: res.price
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
