import { Component, Input } from '@angular/core';
import { AddressService } from '../service/address.service';
import { Observable } from 'rxjs';
import { CartService } from '../service/cart.service';
import { GetlistpaymentService } from '../service/getlistpayment.service';
import { VoucherService } from '../service/voucher.service';
import { OderService } from '../service/oder.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  sum = 0;
  //tỉnh
  provinces: any = [];
  //huyện
  districts: any = [];
  //xã
  wards : any = [];

  addRess : any[] = [];//Địa chỉ khách hàng

  cartProductsByPayment : any[] = [];//sản phẩm trong giỏ hàng CartItem

  selectedProvinceId : any; // Lưu ID của tỉnh đã chọn

  selectedDistrictsId : any; // Lưu ID của huyện đã chọn

  selectedWardId : any; // Lưu ID của xã đã chọn

  getListPayment : any[] = [];//khai báo listpayment

  getListVouncher : any[] = [];//lấy ra list vouncher

  isDefaultAddress:any;//check trạng thái của địa chỉ


  constructor(
    private addressService : AddressService,
    private cartService: CartService,
    private getListPaymentService : GetlistpaymentService,
    private vouncherService : VoucherService,
    private oderService : OderService
  ) {}

  ngOnInit(): void {
    //get ra địa chỉ khách hàng
    this.addressService.getAddress().subscribe((responese : any) =>{
      this.addRess = responese.data.listAddress
    })
    //get ra thành phố
    this.getProvinces();
    //get ra sản phẩm trong giỏ hàng CartItem
    this.cartService.getCartItem().subscribe((response: any) => {
      this.cartProductsByPayment = response.data.cartItem
      //Tính số lượng * đơn giá
      this.sum = response.data.cartItem.reduce((next:any,prev:any)=>{return (next+prev.price*prev.quantity)},0)
    })
    //gọi list payment(hình thức thanh toán)
    this.getListPaymentService.getListPayment().subscribe((response : any) =>{
      this.getListPayment = response.data.getLstPaymentMethod
    });
    //gọi list vouncher
    this.vouncherService.getListVouncher().subscribe((response : any) =>{
      this.getListVouncher = response.data.lstVoucher
    });

  }

  getProvinces(): void {
    this.addressService.getListProvince().subscribe(
      (data: any) => {
        this.provinces = data.data;
      },
      (error) => {
        console.error('Error fetching provinces:', error);
      }
    );
  }
  // Gọi khi chọn một tỉnh cụ thể
  onProvinceChange(): void {
    // this.getDistrictsByProvinceId(parseInt("267"));
    this.getDistrictsByProvinceId(parseInt(this.selectedProvinceId.ProvinceID));
  }
  // Gọi khi chọn một quận/huyền cụ thể
  onDistrictsChange(): void {
    // this.getDistrictsByProvinceId(parseInt("267"));
    this.getWardByDistrictsId(parseInt(this.selectedDistrictsId.DistrictID));
  }

  getDistrictsByProvinceId(provinceId : number) : void{
    this.addressService.getListDistrictByProvinceId(provinceId).subscribe(
      (data : any) => {
        console.log(data)
        this.districts = data.data;
      },
      (error) => {
        console.error('Error fetching districts:', error);
      });
  }
  getWardByDistrictsId(districtId : number) : void{
    this.addressService.getListWardByDistrictId(districtId).subscribe(
      (data : any) => {

        this.wards = data.data;

        console.log(this.wards)
      },
      (error) => {
        console.error('Error fetching districts:', error);
      });
  }

  ConfirmOder(){
    let cartId = this.cartProductsByPayment.map((response : any) =>
        response.cartDetailID
    )

    let payload = {
      CartDetailID :cartId,
      PaymentMenthodID : this.getListPayment[0].id,
      AddressDeliveryId : this.addRess[0].id
    }
    this.oderService.createOder(payload.CartDetailID,this.getListPayment[0].id,this.addRess[2].id).subscribe(data =>this.cartProductsByPayment=[])
  }

  onSubmitAddress(){
    let payload={
      provinceName:this.selectedProvinceId.ProvinceName,
      provinceId:this.selectedProvinceId.ProvinceID,
      districName:this.selectedDistrictsId.DistrictName,
      districId:this.selectedDistrictsId.DistrictID,
      wardName:this.selectedWardId.WardName,
      wardId:Number(this.selectedWardId.WardCode),
      status:this.isDefaultAddress=="true"?true:false
    }
    console.log("payload",payload);
    this.addressService.createAddress(payload).subscribe((res)=>{
      alert('Them dia chi thanh cong')
    })
  }

}



