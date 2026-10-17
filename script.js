let stockLog = [];

let entryForm = document.getElementById('entry-form');
let itemName = document.getElementById('item-name');
let quantity = document.getElementById('quantity');
let category = document.getElementById('category');
let type = document.getElementById('type');

let entriesBody = document.getElementById('entries-body');
let totalAdded = document.getElementById('total-added');
let totalSold = document.getElementById('total-sold');
let currentStock = document.getElementById('current-stock');

let filterAll = document.getElementById('filter-all');
let filterAdded = document.getElementById('filter-added');
let filterSold = document.getElementById('filter-sold');

let currentFilter = 'all';

function displayStockLog() {
    entriesBody.innerHTML = '';
    for (let record of stockLog) {
        if (currentFilter === 'all' || record.type === currentFilter) {
            entriesBody.innerHTML += `
    <tr>
        <td>${record.name}</td>
        <td>${record.category}</td>
        <td>${record.quantity}</td>
        <td>${record.type}</td>
        <td><button onclick="deleteEntry(${record.id})">Delete</button></td>
    </tr>
`;
        }
    }
}

function deleteEntry(id) {
    stockLog = stockLog.filter(record => record.id !== id);
    displayStockLog();
    updateTotals();
    saveStockLog();
}

function updateTotals() {
    let added = 0;
    let sold = 0;
    for (let record of stockLog) {
        if (record.type === 'added') {
            added += record.quantity;
        } else if (record.type === 'sold') {
            sold += record.quantity;
        }
    }
    totalAdded.textContent = added;
    totalSold.textContent = sold;
    currentStock.textContent = added - sold;
}

function saveStockLog() {
    document.cookie = "stockLog=" + encodeURIComponent(JSON.stringify(stockLog)) + "; max-age=31536000; path=/";
}

function getCookie(name) {
    let found = document.cookie.split('; ').find(item => item.startsWith(name + '='));
    if (found) {
        return found.split('=')[1];
    }
    return null;
}

function loadStockLog() {
    let cookieValue = getCookie('stockLog');
    if (cookieValue) {
        stockLog = JSON.parse(decodeURIComponent(cookieValue));
    }
}


entryForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let nameValue = itemName.value;
    let quantityValue = quantity.value;
    let categoryValue = category.value;
    let typeValue = type.value;

    let record = {
        id: Date.now(),
        name: nameValue,
        quantity: parseInt(quantityValue),
        category: categoryValue,
        type: typeValue
    };

    stockLog.push(record);

    displayStockLog();
    updateTotals();
    entryForm.reset();
    saveStockLog();
});


filterAll.addEventListener('click', function() {
    currentFilter = 'all';
    displayStockLog();
});

filterAdded.addEventListener('click', function() {
    currentFilter = 'added';
    displayStockLog();
});

filterSold.addEventListener('click', function() {
    currentFilter = 'sold';
    displayStockLog();
});

loadStockLog();
displayStockLog();
updateTotals();
 