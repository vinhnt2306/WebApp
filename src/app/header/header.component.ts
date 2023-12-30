import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userName: string | undefined;
  userData: any;
  isLoggedIn = false;
  constructor(private router: Router,
    private authService: AuthenticationService
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
  }

  logout(): void {
    this.authService.logout();
  }
}
