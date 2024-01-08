import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userCustomer: any = [];
  isLoggedIn = false;
  constructor(private authService: AuthenticationService, private route:Router
    ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.login(this.userCustomer.phoneNumber, this.userCustomer.password).subscribe( (data: any)  => {
      if(data.data.message == 'Tài khoản không tồn tại. Vui lòng đăng ký tài khoản mới !!! ')
      {
        return alert(data.data.message)
      } else {
        // Lưu token vào bộ nhớ cục bộ
        localStorage.setItem('currentUser', JSON.stringify(data));
        // Điều hướng người dùng sau khi đăng nhập thành công
        this.isLoggedIn=true;
        window.location.reload();
        alert('Đăng nhập thành công !')
      }
      },
      error => {
        console.log('Login error',error)
        this.isLoggedIn = false;
        // this.header.isLoggedIn=false;
      }
    );
    this.route.navigate(['/home-page'])
  }
}
