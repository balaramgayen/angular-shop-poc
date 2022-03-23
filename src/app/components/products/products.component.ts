import { CartService } from './../../services/cart.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  public searchKey: string = '';

  constructor(private api: ApiService, private cart: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });

    this.cart.search.subscribe((val: string) => {
      this.searchKey = val;
    });
  }

  addToCart(item: any) {
    this.cart.addToCart(item);
  }
}
