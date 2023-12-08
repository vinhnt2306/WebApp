import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartProductsByInvoice: any[] = [];

  sum = 0;

  constructor(
    private cartService: CartService,
    ){}

  ngOnInit(){
    this.cartService.getCartItem().subscribe((response: any) => {
      this.cartProductsByInvoice = response.data.cartItem
      console.log(this.cartProductsByInvoice)
      this.sum = response.data.cartItem.reduce((next:any,prev:any)=>{return (next+prev.price*prev.quantity)},0)
    })
  }

  editCart(cart: any, increaseQuantity: number) {
    //View
    console.log(cart)
    let quantity = cart.quantity + increaseQuantity;
    if(quantity > 0) {
      cart.quantity = quantity
    } else {
      //Delete from Cart
      alert('Không thể cập nhật sản phẩm có số lượng = 0')
    }
    //API
    this.cartService.editCart(cart.cartDetailID, cart.productID, quantity).subscribe(data => console.log(data))
  }

}

