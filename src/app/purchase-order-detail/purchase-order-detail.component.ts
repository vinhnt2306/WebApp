import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/models/order';
import { OderService } from '../service/oder.service';
@Component({
    selector: 'app-purchase-order-detail',
    templateUrl: './purchase-order-detail.component.html',
    styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent {
    activeTab: string = 'tab1';
    sum = 0;
    constructor(private router: Router, public orderServices: OderService, private route: ActivatedRoute) { }
    orderDetail: any;
    lstOrder: Order[] = [];
    ngOnInit(): void {
        //Lấy id từ route parameters
        this.route.queryParams.subscribe((params: any) => {
            this.orderServices.getOrderDetail(params.orderId).subscribe(
                (data) => {
                    this.orderDetail = data;
                    console.log(data)
                    this.sum = data.products.reduce((next: any, prev: any) => { return (next + prev.price * prev.quantity) }, 0)
                },
                (error) => {
                    console.error('Error fetching product details:', error);
                    //Xử lý lỗi theo ý bạn
                }
            );
        })
    }
    changeTab(tab: string) {
        this.activeTab = tab;
        this.router.navigate(['/purchase-order', tab]);
    }
}
