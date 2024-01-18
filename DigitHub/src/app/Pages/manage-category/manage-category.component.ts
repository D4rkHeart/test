import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category.model';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent {
  fileName = '';
  image: any = '';
  newImage : boolean = false;
  category! : Category;
  categoryGroup! : FormGroup;
  file! : File;

  constructor(
    private backendApiService : BackendApiService,
    private router : Router,
    private route: ActivatedRoute,
    ) {}

  saveCategory() : void {
   if(this.category != null) {
    this.updateCategory();
   }else {
    this.addCategory();
   }
  }

  addCategory() : void {
    if(this.categoryGroup.valid) {
      const category = new Category(
      this.categoryGroup.value.name,
      )
    
      this.backendApiService
      .addCategory(category)
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: err => console.error('An error occurred', err),  
        complete: () => console.log('category added')  
      })
    } 
  }

  updateCategory() : void {
    if(this.categoryGroup.valid) {
      this.category.name = this.categoryGroup.value.name;

      this.backendApiService
      .setCategory(this.category)
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: err => console.error('An error occurred', err),  
        complete: () => console.log('category updated')  
      })
    }
  }

  ngOnInit() : void {
    this.categoryGroup = new FormGroup({
      name: new FormControl('', [Validators.required])
    });

    const categoryId = this.route.snapshot.paramMap.get('id')
    if(categoryId != null) {
      this.backendApiService
      .getCategory(Number(categoryId))
      .subscribe({
        next: (res) => {
          this.category = res;
          
          this.categoryGroup.setValue({
            name: res.name,
          });
        },
        error: (err) => console.log('Something went wrong', err),
        complete: () => {
          console.log('category retrieved')
        }
      });
    }
  }
}
