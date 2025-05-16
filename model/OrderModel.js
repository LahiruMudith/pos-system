export default class OrderModel {
    constructor(oId, cId, customerName, phoneNumber, total, items) {
        this.oId = oId;
        this.cId = cId;
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.total = total;
        this.items = items;
    }
}