export class Order {
    "id": string
    "code": string
    "description": string
    "status": number
    "nameCustomer": null | string
    "paymentMethodName": null | string
    "amountShip": number
    "amountDiscount": null | string
    "totalAmount": number
    "products": any
}