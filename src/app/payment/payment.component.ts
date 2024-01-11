import { Component, Input } from '@angular/core';
import { AddressService } from '../service/address.service';
import { CartService } from '../service/cart.service';
import { GetlistpaymentService } from '../service/getlistpayment.service';
import { VoucherService } from '../service/voucher.service';
import { OderService } from '../service/oder.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  sum = 0;
  //tỉnh
  provinces: any = [];
  //huyện
  districts: any = [];
  //xã
  wards: any = [];

  addRess: any[] = []; //Địa chỉ khách hàng

  addRessChoose: any[] = []; // chọn Địa chỉ khách hàng

  vounCher: any[] = [];

  vounCherChonse: any[] = [];//chọn vouncher khách hàng

  cartProductsByPayment: any[] = []; //sản phẩm trong giỏ hàng CartItem

  selectedProvinceId: any; // Lưu ID của tỉnh đã chọn

  selectedDistrictsId: any; // Lưu ID của huyện đã chọn

  selectedWardId: any; // Lưu ID của xã đã chọn

  getListPayment: any[] = []; //khai báo listpayment

  getListVouncher: any[] = []; //lấy ra list vouncher

  isDefaultAddress: any; //check trạng thái của địa chỉ

  orderResponse: any; //dữ liệu trả về khi create order

  confirmResponse: any[] = []; //dữ liệu trả về khi confirm oder

  idPayment: any;

  receiverName: any;
  receiverPhone: any;
  tongtien: number = 0;
  tongtienhang: number = 0;
  freeship: number = 0;
  discount: number = 0;
  tienship: number = 0;
  selectedRadio: any = '';
  selectedFreeShip: any = '';
  lastClicked: any = null;
  isFreeShipSelected: any;
  isDiscountSelected: any;
  addRessList:any
  selectedRadioData: any; 
  selectedFreeShipData: any;
  constructor(
    private addressService: AddressService,
    private cartService: CartService,
    private getListPaymentService: GetlistpaymentService,
    private vouncherService: VoucherService,
    private oderService: OderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //get ra địa chỉ khách hàng
    var addChooes: any = [];
    var lstCart: any = [];
    this.addressService.getAddress().subscribe((responese: any) => {
      this.addRessChoose = [responese.data.listAddress[0]];
      this.addRess = responese.data.listAddress;
      addChooes = [responese.data.listAddress];
      this.addRessList = responese.data.listAddress[0].status;
      console.log(this.addRessList = responese.data.listAddress[0].status)
    });

    //get ra thành phố
    this.getProvinces();
    //get ra sản phẩm trong giỏ hàng CartItem
    this.cartService.getCartItem().subscribe((response: any) => {
      this.cartProductsByPayment = response.data.cartItem;
      lstCart = response.data.cartItem;
      console.log(lstCart)
      //Tính số lượng * đơn giá
      this.sum = response.data.cartItem.reduce((next: any, prev: any) => {
        return next + prev.price * prev.quantity;
      }, 0);
    });
    //gọi list payment(hình thức thanh toán)
    this.getListPaymentService.getListPayment().subscribe((response: any) => {
      this.getListPayment = response.data.getLstPaymentMethod;
    });
    //gọi list vouncher
    this.vouncherService.getListVouncher().subscribe((response: any) => {
      this.getListVouncher = response.data.lstVoucher;
    });

    setTimeout(() => {
      if (addChooes.length > 0 && lstCart.length > 0) {
        this.ConfirmOder();
      }
    }, 5000);
  }

  onchangeRadio(value: any) {
    this.selectedRadio = value.value;
    if (this.isDiscountSelected && this.selectedFreeShip === value.target.value) {
      this.selectedRadio = "";
      this.isDiscountSelected = false;
    } else {
      this.selectedRadio = value.target.value;
      this.isDiscountSelected = true;
    }
  }
  onchangeFreeShip(value: any) {
    if (this.isFreeShipSelected && this.selectedFreeShip === value.target.value) {
      this.selectedFreeShip = "";
      this.isFreeShipSelected = false;
    } else {
      this.selectedFreeShip = value.target.value;
      this.isFreeShipSelected = true;
    }
  }
  


  handleClick(clickedValue: any) {
    this.selectedRadio = clickedValue
    this.selectedRadioData = this.getListVouncher.find(x => x.id == this.selectedRadio)
  }

  handleClickFreeShip(clickedValue: any) {
    // if (this.selectedFreeShip == clickedValue) {
    //   this.selectedFreeShip = ''; // Hủy chọn nếu đã click lần thứ hai
    // }
    this.selectedFreeShip = clickedValue;
    this.selectedFreeShipData = this.getListVouncher.find(x => x.id == this.selectedFreeShip)
  }

  handleApdung() {
    if (this.selectedFreeShip) {
      this.ConfirmOder();
    }
  }
  onChooseAdress(address: any): void {
    this.addRessChoose = [address];
    this.ConfirmOder();
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
  getDistrictsByProvinceId(provinceId: number): void {
    this.addressService.getListDistrictByProvinceId(provinceId).subscribe(
      (data: any) => {
        this.districts = data.data;
      },
      (error) => {
        console.error('Error fetching districts:', error);
      }
    );
  }
  getWardByDistrictsId(districtId: number): void {
    this.addressService.getListWardByDistrictId(districtId).subscribe(
      (data: any) => {
        this.wards = data.data;
      },
      (error) => {
        console.error('Error fetching districts:', error);
      }
    );
  }
  caculatorEndTime = (date: any) => {
    const result = moment
      .duration(
        moment(date, "YYYY/MM/DD HH:mm").diff(
          moment(new Date(), "YYYY/MM/DD HH:mm")
        )
      )
      .asHours();
    const time = moment.duration(
      moment(date, "YYYY/MM/DD HH:mm").diff(
        moment(new Date(), "YYYY/MM/DD HH:mm")
      )
    );

    let days = Math.floor(result / 24);
    let remainingHours = result % 24;
    let remainingMinutes = Math.floor((result % 1) * 60);
    let result2 = "";

    if (days > 0) {
      result2 += days + " ngày ";
    }

    if (remainingHours > 0) {
      result2 += Math.round(remainingHours) + " giờ ";
    }

    if (remainingMinutes > 0 || (days === 0 && remainingHours === 0)) {
      result2 += Math.round(remainingMinutes) + " phút ";
    }

    if (result2 === "") {
      result2 = "0 phút";
    }

    return `Còn ${result2}`;
  };
  ConfirmOder() {
    let cartId = this.cartProductsByPayment.map(
      (response: any) => response.cartDetailID
    );
    let voucher = []
    if (this.selectedFreeShip) {
      voucher.push(this.selectedFreeShip.toString())
    }
    if (this.selectedRadio) {
      voucher.push(this.selectedRadio.toString())
    }
    let payload: any = {
      CartDetailID: cartId,
      voucherID: voucher.length > 0 ? voucher : [""],
      PaymentMenthodID: this.getListPayment[0].id,
      AddressDeliveryId: this.idPayment
        ? this.idPayment
        : this.addRessChoose[0].id,
      
    };
    if (voucher.length == 0) {
       payload.voucherID = null;
    }
    this.oderService
      .createOder(
        payload.CartDetailID,
        this.getListPayment[0].id,
        payload.AddressDeliveryId,
        payload.voucherID
      )
      .subscribe((data) => {
        this.orderResponse = data.data;
        if (data.data) {
          this.tongtienhang = data.data.totalAmount ? data.data.totalAmount : 0;
          this.tienship = data.data.amountShip ? data.data.amountShip : 0;
          this.freeship = this.selectedFreeShip ? this.getListVouncher.find(x => x.id == this.selectedFreeShip).discount : 0;
          this.discount = this.selectedRadio ? this.getListVouncher.find(x => x.id == this.selectedRadio).discount : 0;
          this.tongtien = this.tongtienhang + this.tienship - this.freeship - this.discount;
        }else{
          alert(data.messages[0].messageText)
        }
      });
  }

  onConfirmOrder() {
    if (this.addRessChoose.length == 0) {
      alert('Vui lòng thêm mới đại chỉ');
      return;
    }
    let cartId = this.cartProductsByPayment.map(
      (response: any) => response.cartDetailID
    );
    let voucher = []
    if (this.selectedFreeShip) {
      voucher.push(this.selectedFreeShip.toString())
    }
    if (this.selectedRadio) {
      voucher.push(this.selectedRadio.toString())
    }
    let payload: any = {
      token: JSON.parse(localStorage.getItem('currentUser') ?? '').data.token,
      description: 'không comment',
      cartDetailId: cartId,
      totalAmountDiscount: 0,
      amountShip: this.orderResponse.amountShip,
      voucherID: voucher.length > 0 ? voucher : [""],
      totalAmount: this.orderResponse.totalAmount,
      addressDelivery: this.addRessChoose[0].id,
      addressDeliveryId: this.addRessChoose[0].id,
      paymentMethodId: this.idPayment
        ? this.idPayment
        : this.addRessChoose[0].id,
    };
    if (voucher.length == 0) {
      delete payload.voucherID;
    }
    this.oderService.confirmOrder(payload).subscribe((res) => {
      this.cartProductsByPayment = [];
      this.confirmResponse = res.data;
      alert('Đặt hàng thành công');
    });
    this.router.navigate(['profile/purchase-order']);
  }

  onSubmitAddress() {
    let payload = {
      receiverName: this.receiverName,
      receiverPhone: this.receiverPhone,
      provinceName: this.selectedProvinceId.ProvinceName,
      provinceId: this.selectedProvinceId.ProvinceID,
      districName: this.selectedDistrictsId.DistrictName,
      districId: this.selectedDistrictsId.DistrictID,
      wardName: this.selectedWardId.WardName,
      wardId: Number(this.selectedWardId.WardCode),
      status: this.isDefaultAddress == 'true' ? true : false,
    };
    this.addressService.createAddress(payload).subscribe((res) => {
      alert('Them dia chi thanh cong');
      this.addressService.getAddress().subscribe((responese: any) => {
        this.addRessChoose = [responese.data.listAddress[0]];
        this.addRess = responese.data.listAddress;
      });
    });
  }
}
