import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartProduct: any[] = []; // Giả sử bạn có dữ liệu cartItem trong biến cartProduct
  totalQuantity: number = 0;
  userName: string | undefined;
  userData: any;
  isLoggedIn = false;
  constructor(private router: Router,
    private authService: AuthenticationService,
    private cartService: CartService
   ) {}

  ngOnInit(){
      //check đăng nhập
      if(localStorage.getItem('currentUser')){
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
      }
      //hiển thị user
      // Lấy dữ liệu từ localStorage
      const currentUserData = localStorage.getItem('currentUser');
      // Kiểm tra xem dữ liệu có tồn tại hay không
      if (currentUserData) {
        const currentUser = JSON.parse(currentUserData);
        this.userName = currentUser.data.userName;
        // Thực hiện các xử lý với dữ liệu người dùng
      }
      this.userData = JSON.parse(localStorage.getItem('currentUser')!);
      //đăng nhập
      
      this.cartService.getCartItem().subscribe((response: any) => {
        this.cartProduct = response.data.cartItem;
        this.calculateTotalQuantity();
        console.log('Total Quantity:', this.totalQuantity);
      })
  }
  calculateTotalQuantity(): void {
    this.totalQuantity = 0;

    if (this.cartProduct && this.cartProduct.length > 0) {
      // Duyệt qua từng sản phẩm trong cartProduct và cộng dồn số lượng
      this.cartProduct.forEach((item: any) => {
        this.totalQuantity += item.quantity;
      });
    }
  }


  //logout
  logout(): void {
    this.authService.logout();
  }
}
