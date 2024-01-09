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

  addToCartProduct(productId: string, quantity: number) {
  this.cartService.addToCart(productId, quantity, false)
    .subscribe(
      data => {
        console.log(data);
        if(data.status == "200"){
            alert('thêm sản phẩm vào giỏ hàng thành công');
        }else{
          alert('Sản phẩm không đủ số lượng để thêm vui lòng liên hệ cửa hàng.');
        }
      },
      error => {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
        alert('Sản phẩm đã hết hàng.');
      }
    );
  console.log(productId, quantity);
}
}
