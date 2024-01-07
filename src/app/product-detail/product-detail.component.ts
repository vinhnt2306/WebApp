import { Component,Input } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/models/cart';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  @Input()  product!: Product;

  productDetail : Product = new Product;

  carts : Cart[] = [];
  constructor(private route: ActivatedRoute,private productService: ProductService,private cartService: CartService) {}

  ngOnInit(): void {
    //Lấy id từ route parameters
    this.route.queryParams.subscribe((params : any) => {
      this.productService.getProductDetailById(params.productId).subscribe(
        (data) => {
          this.productDetail = data.data;
          console.log(data)
        },
        (error) => {
          console.error('Error fetching product details:', error);
          //Xử lý lỗi theo ý bạn
        }
      );
    })
  }
  //sử lý tăng giảm số lượng giỏ hàng
  quantity = 1;
  decreaseQuantity() {
  if (this.quantity > 1) {
      this.quantity--;
    }
  }
  increaseQuantity() {
    this.quantity++;
  }
  addToCartProductDetail(productId : string , quantity : number,LoginType:boolean) {
    this.cartService.addToCart(productId,quantity,LoginType).subscribe(data => console.log(data))
    console.log(productId,quantity)
    alert('thêm sản phẩm thành công')
  }
}
