import { Component,Input } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { Cart } from 'src/models/cart';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
@Input()  product!: Product;
 products : Product[] = [];

  carts : Cart[] = [];

  productDetail : Product = new Product;

  constructor(private productService:ProductService,
              private cartService: CartService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.productService.getAllProduct().subscribe((response: any) => {
      this.products = response.data.lstProduct
      console.log(this.products)
  });
  }
  addToCartProduct(productId : string , quantity : number) {
    this.cartService.addToCart(productId,quantity).subscribe(data => console.log(data))
    console.log(productId,quantity)
    alert('thêm sản phẩm vào giỏ hàng thành công')
  }
}
