let entries = [];

let entryForm = document.getElementById('entry-form');
let itemName = document.getElementById('item-name');
let quantity = document.getElementById('quantity');
let category = document.getElementById('category');
let type = document.getElementById('type');

let entriesBody = document.getElementById('entries-body');
let totalAdded = document.getElementById('total-added');
let totalSold = document.getElementById('total-sold');
let currentStock = document.getElementById('current-stock');

entryForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let nameValue = itemName.value;
    let quantityValue = quantity.value;
    let categoryValue = category.value;
    let typeValue = type.value;

    console.log("Form Submitted");
    console.log("Item Name:", nameValue);
    console.log("Quantity:", quantityValue);
    console.log("Category:", categoryValue);
    console.log("Type:", typeValue);
});