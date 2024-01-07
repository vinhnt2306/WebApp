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

  addRessChoose : any[] = [];//Địa chỉ khách hàng

  cartProductsByPayment : any[] = [];//sản phẩm trong giỏ hàng CartItem

  selectedProvinceId : any; // Lưu ID của tỉnh đã chọn

  selectedDistrictsId : any; // Lưu ID của huyện đã chọn

  selectedWardId : any; // Lưu ID của xã đã chọn

  getListPayment : any[] = [];//khai báo listpayment

  getListVouncher : any[] = [];//lấy ra list vouncher

  isDefaultAddress:any;//check trạng thái của địa chỉ

  orderResponse:any;//dữ liệu trả về khi create order

  confirmResponse:any[] = [];//dữ liệu trả về khi confirm oder

  idPayment:any;

  tongtien:number=0;
  tongtienhang:number=0;
  tienship:number=0;

  constructor(
    private addressService : AddressService,
    private cartService: CartService,
    private getListPaymentService : GetlistpaymentService,
    private vouncherService : VoucherService,
    private oderService : OderService
  ) {}

  ngOnInit(): void {
    //get ra địa chỉ khách hàng
    var addChooes:any=[]
    var lstCart:any=[]
    this.addressService.getAddress().subscribe((responese : any) =>{
      this.addRessChoose = [responese.data.listAddress[0]]
      this.addRess = responese.data.listAddress;
      addChooes=[responese.data.listAddress]
      console.log(addChooes)
    })
    //get ra thành phố
    this.getProvinces();
    //get ra sản phẩm trong giỏ hàng CartItem
    this.cartService.getCartItem().subscribe((response: any) => {
      this.cartProductsByPayment = response.data.cartItem
      lstCart = response.data.cartItem
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
    console.log(addChooes)

    setTimeout(()=>{
      if(addChooes.length>0 && lstCart.length>0){
        this.ConfirmOder();
      }
    },5000)

  }

  onChooseAdress(address:any):void{
    this.addRessChoose=[address]
    this.ConfirmOder()
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
      AddressDeliveryId : this.idPayment?this.idPayment:this.addRessChoose[0].id
    }
    this.oderService.createOder(payload.CartDetailID,this.getListPayment[0].id,payload.AddressDeliveryId).subscribe(data =>
      {this.orderResponse=data.data
        if(data.data){
          this.tongtienhang=data.data.totalAmount?data.data.totalAmount:0;
          this.tienship=data.data.amountShip?data.data.amountShip:0;
          this.tongtien=this.tongtienhang+this.tienship
        }}
      )
  }

  onConfirmOrder(){
    if(this.addRessChoose.length==0){
      alert("Vui lòng thêm mới đại chỉ")
      return;
    }
    let cartId = this.cartProductsByPayment.map((response : any) =>
    response.cartDetailID
)
    let payload= {
      token : JSON.parse(localStorage.getItem('currentUser')??"").data.token,
      description:"không comment",
      cartDetailId:cartId,
      totalAmountDiscount: 0,
      amountShip: this.orderResponse.amountShip,
      totalAmount: this.orderResponse.totalAmount,
      addressDelivery: this.addRessChoose[0].id,
      paymentMethodId: this.idPayment?this.idPayment:this.addRessChoose[0].id,
      voucherID: null,
    };
    this.oderService.confirmorder(payload).subscribe((res)=>{
      this.cartProductsByPayment=[]
      this.confirmResponse = res.data
      console.log(this.confirmResponse)
      alert("Đặt hàng thành công")

    })
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
      this.addressService.getAddress().subscribe((responese : any) =>{
        this.addRessChoose = [responese.data.listAddress[0]]
        this.addRess = responese.data.listAddress;
      })
    })
  }

}



