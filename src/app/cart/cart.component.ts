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
  isDisabled:boolean=true;
  sum = 0;
  status:boolean=false;
  constructor(
    private cartService: CartService,
    ){}

  ngOnInit(){
    this.cartService.getCartItem().subscribe((response: any) => {
      this.cartProductsByInvoice = response.data.cartItem
      console.log(this.cartProductsByInvoice)
      this.sum = response.data.cartItem.reduce((next:any,prev:any)=>{return (next+prev.price*prev.quantity)},0)

      if(response.data.cartItem.length>0){
        this.isDisabled=false
      }else{
        this.isDisabled=true
      }
    })
  }
  
  hanldeRemoveCartItem=(cart:any)=>{
    this.status=true;
    this.cartService.deleteCartItem(cart.cartDetailID).subscribe(data => {alert('Xóa sản phẩm thành công')
    this.cartService.getCartItem().subscribe((response: any) => {
      this.cartProductsByInvoice = response.data.cartItem
      this.sum = response.data.cartItem.reduce((next:any,prev:any)=>{return (next+prev.price*prev.quantity)},0)
      if(response.data.cartItem.length>0){
        this.isDisabled=false
      }else{
        this.isDisabled=true
      }
    })
    this.status=false;

  })
  }

  editCart(cart: any, increaseQuantity: number) {
    //View
    console.log(cart)
    let quantity = cart.quantity + increaseQuantity;
    if(quantity > 0) {
      cart.quantity = quantity
    this.cartService.editCart(cart.cartDetailID, cart.productID, quantity).subscribe(data => console.log(data))
    
    } else {
      //Delete from Cart
      this.hanldeRemoveCartItem(cart)
      return;
    }
    
    //APIs
  }

}

