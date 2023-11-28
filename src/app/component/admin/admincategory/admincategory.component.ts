import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-admincategory',
  templateUrl: './admincategory.component.html',
  styleUrls: ['./admincategory.component.css']
})
export class AdmincategoryComponent implements OnInit {
  INITIAL_CATEGORY: Category = { id: 0, title: "" };
  categories: Category[] = [];
  error: string = "";
  categoryModel: Category = this.INITIAL_CATEGORY;

  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getcategories().subscribe({
      next: (response: any) => {
        console.log(response);
        let categoriesDetails: Category[] = response.data;
        this.categories = categoriesDetails;
      },

      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },

    });

  }

  onDelete(id: number): void {
    this.categoryService.deletecategory(id).subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },

    });

  }
  onSubmit(form: any) {
    this.categoryService.postcategory(form.value).subscribe({
    next: (response: any) => {
        this.categories = response.data;
        this.categoryModel = this.INITIAL_CATEGORY;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
}