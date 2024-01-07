import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/models/order';
import { OderService } from '../service/oder.service';
@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent {
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
