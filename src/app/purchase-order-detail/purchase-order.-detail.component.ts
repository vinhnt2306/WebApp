import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/models/order';
import { OderService } from '../service/oder.service';
@Component({
    selector: 'app-purchase-order-detail',
    templateUrl: './purchase-order-detail.component.html',
    styleUrls: ['./purchase-order-detail.component.css']
})
export class PurchaseOrderDetailComponent {
    activeTab: string = 'tab1';

    constructor(private router: Router, public orderServices: OderService) { }
    order: Order = new Order();
    lstOrder: Order[] = [];
    ngOnInit() {
        this.orderServices.getListOrder().subscribe((response: any) => {
            this.lstOrder = response.data
            console.log(this.lstOrder)
        })
    }
    changeTab(tab: string) {
        this.activeTab = tab;
        this.router.navigate(['/purchase-order', tab]);
    }
}
