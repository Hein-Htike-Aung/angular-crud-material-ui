import { ProductService } from './product.service';
import { DialogComponent, Product } from './dialog/dialog.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud-material-ui';

  products: Product[] = [];
  dataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = [
    'productName',
    'category',
    'freshness',
    'price',
    'comment',
    'date',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private service: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  } 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProducts() {
    this.service.getProducts().subscribe({
      next: (resp) => {
        this.products = resp;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.log('Error While fetching data'),
    });
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'save') {
          this.getAllProducts();
        }
      });
  }

  editProduct(product: Product) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: product,
      })
      .afterClosed()
      .subscribe((value) => {
        if (value === 'edit') {
          this.getAllProducts();
        }
      });
  }

  deleteProduct(product: Product) {
    this.service.deleteProduct(product.id).subscribe({
      next: (resp) => {
        alert('Successfully deleted');
        this.getAllProducts();
      },
      error: (error) => console.log('Error While fetching data'),
    });
  }
} 
