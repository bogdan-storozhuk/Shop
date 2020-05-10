import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  products = [];
  product: Product;
  pSub: Subscription;
  rSub: Subscription;
  productName:string;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe(products => {
      console.log(products)
      this.products = products;
    });
  }
  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if(this.rSub){
      this.rSub.unsubscribe();
    }
  }
  remove(id) {
    this.rSub=this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
    });
  }

}
