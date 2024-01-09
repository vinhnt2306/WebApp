import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/models/order';
import { OderService } from '../service/oder.service';
@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.css'],
})
export class PurchaseOrderDetailComponent {
  activeTab: string = 'tab1';
  sum = 0;
  title = '';
  constructor(
    private router: Router,
    public orderServices: OderService,
    private route: ActivatedRoute
  ) { }
  idparams = 0;
  orderDetail: any;
  lstOrder: Order[] = [];
  dataLog: any = [];
  ngOnInit(): void {
    //Lấy id từ route parameters
    this.route.queryParams.subscribe((params: any) => {
      this.idparams = params.orderId;
      this.orderServices.getOrderDetail(params.orderId).subscribe(
        (data) => {
          if (data) {
            this.orderDetail = data;
            console.log(data);
            this.sum = data.products.reduce((next: any, prev: any) => {
              return next + prev.price * prev.quantity;
            }, 0);
            if (data.status == 0) {
              this.title = 'Đơn hàng đang đợi người bán duyệt';
            } else if (data.status == 1) {
              this.title = 'Đơn hàng đã được duyệt và đang đợi giao hàng';
            } else if (data.status == 2) {
              this.title = 'Đơn hàng đã bị hủy bởi người bán';
            } else if (data.status == 3) {
              this.title = 'Đơn hàng đang được giao';
            } else if (data.status == 4) {
              this.title = 'Đơn hàng đang được giao tới bạn';
            } else if (data.status == 6) {
              this.title = 'Bạn đã hủy đơn hàng';
            } else if (data.status == 7) {
              this.title =
                'Đơn hàng giao không thành công do bạn từ chối nhận hàng';
            } else {
              this.title = 'Đơn hàng đã hoàn thành';
            }
          }
          console.log(data);
          console.log(this.orderDetail)
        },
        (error) => {
          console.error('Error fetching product details:', error);
          //Xử lý lỗi theo ý bạn
        }

      );
    });
    this.route.queryParams.subscribe((params: any) => {
      this.idparams = params.orderId;
      this.orderServices.getOrderLog(params.orderId).subscribe(
        (data) => {
          if (data) {
            this.dataLog = data;
          }
        },
        (error) => {
          console.error('Error fetching product details:', error);
          //Xử lý lỗi theo ý bạn
        }
      );
    });
  }
  changeTab(tab: string) {
    this.activeTab = tab;
    this.router.navigate(['/purchase-order', tab]);
  }

  handleUpdateTrangThai(status: number) {
    let payload = {
      status: status,
      uId: this.idparams,
      idBoss: 'dsdsd',
    };
    this.orderServices
      .updateStatus(String(this.idparams), status, 'odks')
      .subscribe((data) => {
        this.route.queryParams.subscribe((params: any) => {
          this.idparams = params.orderId;
          this.orderServices.getOrderDetail(params.orderId).subscribe(
            (data) => {
              if (data) {
                this.orderDetail = data;
                console.log(data);
                this.sum = data.products.reduce((next: any, prev: any) => {
                  return next + prev.price * prev.quantity;
                }, 0);
                if (data.status == 0) {
                  this.title = 'Đơn hàng đang đợi người bán duyệt';
                } else if (data.status == 1) {
                  this.title = 'Đơn hàng đã được duyệt và đang đợi giao hàng';
                } else if (data.status == 2) {
                  this.title = 'Đơn hàng đã bị hủy bởi người bán';
                } else if (data.status == 3) {
                  this.title = 'Đơn hàng đang được giao';
                } else if (data.status == 4) {
                  this.title = 'Đơn hàng đang được giao tới bạn';
                } else if (data.status == 6) {
                  this.title = 'Bạn đã hủy đơn hàng';
                } else if (data.status == 7) {
                  this.title =
                    'Đơn hàng giao không thành công do bạn từ chối nhận hàng';
                } else {
                  this.title = 'Đơn hàng đã hoàn thành';
                }
              }
            },
            (error) => {
              console.error('Error fetching product details:', error);
              //Xử lý lỗi theo ý bạn
            }
          );
        });
      });
  }
}
