import {customer_db, item_db} from "../db/db.js";
import CustomerModel from "../model/customerModel.js";
import ItemModel from "../model/itemModel.js";

let customer = new CustomerModel('C001', 'Lahiru', 'Muditha', '0777777777', 'Colombo');
customer_db.push(customer);

let item = new ItemModel('I001', 'Laptop', 100, 10);
item_db.push(item);
let item1 = new ItemModel('I002', 'Phone', 100, 20);
item_db.push(item1);
let item2 = new ItemModel('I003', 'Printer', 100, 30);
item_db.push(item2);


var cart = [];
var total = 0;

$('#btnSearchCustomer').on('click', function(event) {
    event.preventDefault();
    let cudtomerId = $('#customerId').val();
    let isNewCustomer = true;
    customer_db.forEach(function (customer){
        if (customer.cId === cudtomerId){
            isNewCustomer = false;
            $('#table-body').empty();
            $('#firstName').val(customer.firstName);
            $('#lastName').val(customer.lastName);
            $('#phoneNumber').val(customer.phoneNumber);
            $('#address').val(customer.address);
        }
    })
    if (isNewCustomer){
        Swal.fire({
            title: "Can't findCustomer ",
            icon: "warning",
            timer: 1000,
            // position: "bottom-end",
            showConfirmButton: false,
            // backdrop: false
        });
    }
});

$('#btnSearchItem').on('click', function(event) {
    event.preventDefault();
    let itemId = $('#itemId').val();

    item_db.forEach(function (item){
        if (item.iId === itemId){
            if (item.qty === 0) {
                Swal.fire({
                    title: "This Product Out of stock",
                    icon: "error",
                    timer: 1000
                });
                return;
            }

            $('#itemName').val(item.itemName);
            $('#qty').val(item.qty);
            $('#price').val(item.price);
        }
    })
});

$('#btnAddToCart').on('click', function (event){
    event.preventDefault();

    // if ($('#firstName').val() === "") {
    //     Swal.fire({
    //         title: "Please select a customer",
    //         icon: "error",
    //         timer: 1000
    //     });
    //     return;
    // }
    if ($('#itemName').val() === "") {
        Swal.fire({
            title: "Please select a item",
            icon: "error",
            timer: 1000
        });
        return;
    }
    if ($('#orderQty').val() === "") {
        Swal.fire({
            title: "Please fill the order quantity",
            icon: "error",
            timer: 1000
        });
        return;
    }

    let itemId = $('#itemId').val();
    let itemName = $('#itemName').val();
    let qty = $('#qty').val();
    let price = $('#price').val();
    let orderQty = $('#orderQty').val();

    let isValidItem = true;
    item_db.forEach(function (item){
        if (item.iId === itemId){
            if (orderQty > item.qty ){
                Swal.fire({
                    title: "Not enough stock",
                    icon: "error",
                    timer: 1000
                });
                isValidItem = false;
            }else {
                item.qty = Number(item.qty) - Number(orderQty);
            }
        }
    });

    if (!isValidItem){
        return;
    }

    let item = {itemId, itemName,qty, price, orderQty};
    let isNewItem = true;
    cart.forEach(function (cart){
        if (cart.itemId === itemId){
            cart.orderQty = Number(orderQty) + Number(cart.orderQty);
            isNewItem = false;
        }
    });
    if (isNewItem){
        cart.push(item);
    }
    console.log(cart);

    $('#table-body').empty();
    total = 0;
    cart.forEach(function (cart){
        let itemData = `<tr>
                            <td>${cart.itemId}</td>
                            <td>${cart.itemName}</td>
                            <td>${cart.qty}</td>
                            <td>${cart.price}</td>
                            <td>${cart.orderQty}</td>
                            <td><button type="button" class="btn btn-danger">Delete</button></td>
                        </tr>`

        $('#table-body').append(itemData);

        total = Number(total) + ((Number(cart.price) * Number(cart.orderQty)));
    });
    $('#lblTotal').text(`TOTAL : ${total} /=`);

});