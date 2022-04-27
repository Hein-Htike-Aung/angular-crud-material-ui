import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';

export interface Product {
  id: number;
  productName: string;
  category: string;
  freshness: string;
  price: number;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];

  constructor(
    private builder: FormBuilder,
    private service: ProductService,
    private matDialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Product
  ) {}

  ngOnInit(): void {
    this.productForm = this.builder.group({
      id: 0,
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    if(this.editData) {
      this.productForm.patchValue(this.editData);
    }
  }

  save() {
    if (this.productForm.valid) {
      if (this.productForm.value.id === 0) {
        this.service.postProduct(this.productForm.value).subscribe({
          next: (resp) => {
            alert('Product added successfully');
            this.productForm.reset();
            this.matDialogRef.close('save');
          },
          error: (error) => {
            alert('Error while saving Product');
          },
        });
      } else {
        this.service.putProduct(this.productForm.value).subscribe({
          next: (resp) => {
            alert('Product updated successfully');
            this.productForm.reset();
            this.matDialogRef.close('edit');
          },
          error: (error) => {
            alert('Error while updating Product');
          },
        });
      }
    }
  }
}
