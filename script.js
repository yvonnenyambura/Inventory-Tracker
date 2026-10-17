// All records live in this array
let stockLog = [];

// Form and its inputs
let entryForm = document.getElementById('entry-form');
let itemName = document.getElementById('item-name');
let quantity = document.getElementById('quantity');
let category = document.getElementById('category');
let type = document.getElementById('type');

// Places on the page where results are shown
let entriesBody = document.getElementById('entries-body');
let totalAdded = document.getElementById('total-added');
let totalSold = document.getElementById('total-sold');
let currentStock = document.getElementById('current-stock');

// Filter buttons
let filterAll = document.getElementById('filter-all');
let filterAdded = document.getElementById('filter-added');
let filterSold = document.getElementById('filter-sold');

// Which records the table shows
let currentFilter = 'all';

// Turns stored category values into readable names
let categoryNames = {
    'eau-de-parfum': 'Eau de Parfum',
    'eau-de-toilette': 'Eau de Toilette',
    'body-mist': 'Body Mist',
    'body-oil': 'Body Oil'
};

// Show only records that match the current filter
function displayStockLog() {
    entriesBody.innerHTML = '';
    for (let record of stockLog) {
        if (currentFilter === 'all' || record.type === currentFilter) {
            entriesBody.innerHTML += `
    <tr>
        <td>${record.name}</td>
        <td>${categoryNames[record.category]}</td>
        <td>${record.quantity}</td>
        <td><span class="badge ${record.type}">${record.type}</span></td>
        <td><button onclick="deleteEntry(${record.id})" aria-label="Delete entry"><i class="fa-regular fa-trash-can"></i></button></td>
    </tr>
`;
        }
    }
}
// Removes the record, then refreshes the page and cookie
function deleteEntry(id) {
    stockLog = stockLog.filter(record => record.id !== id);
    displayStockLog();
    updateTotals();
    saveStockLog();
}

// Adds up all records and updates the totals on the page
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

// Saves the list in a cookie as text
function saveStockLog() {
    document.cookie = "stockLog=" + encodeURIComponent(JSON.stringify(stockLog)) + "; max-age=31536000; path=/";
}

// Returns the value of the named cookie
function getCookie(name) {
    let found = document.cookie.split('; ').find(item => item.startsWith(name + '='));
    if (found) {
        return found.split('=')[1];
    }
    return null;
}

// Turns the saved cookie text back into the stockLog array
function loadStockLog() {
    let cookieValue = getCookie('stockLog');
    if (cookieValue) {
        stockLog = JSON.parse(decodeURIComponent(cookieValue));
    }
}

// On submit: build a record from the form, store it, update the page and save
entryForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let nameValue = itemName.value;
    let quantityValue = quantity.value;
    let categoryValue = category.value;
    let typeValue = type.value;

    let record = {
        id: Date.now(), // unique id based on timestamp
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

// Filter buttons: set the filter, then redraw the table
filterAll.addEventListener('click', function() {
    currentFilter = 'all';
    displayStockLog();
    setActiveFilter(filterAll);
});

filterAdded.addEventListener('click', function() {
    currentFilter = 'added';
    displayStockLog();
    setActiveFilter(filterAdded);
});

filterSold.addEventListener('click', function() {
    currentFilter = 'sold';
    displayStockLog();
    setActiveFilter(filterSold);
});

// Highlights the clicked filter button and clears the others
function setActiveFilter(clickedButton) {
    filterAll.classList.remove('active');
    filterAdded.classList.remove('active');
    filterSold.classList.remove('active');
    clickedButton.classList.add('active');
}

// On page load: restore saved records, then draw the table and totals
loadStockLog();
displayStockLog();
updateTotals();
 