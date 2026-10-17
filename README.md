# Inventory Tracker

A simple stock tracker for a perfume business. It records stock added and stock sold, and works out the current stock level automatically. Built with plain HTML, CSS and JavaScript.

## Features

- Add stock (restock) and sales entries with an item name, category and quantity
- View all entries in a table
- Remove entries
- Totals for stock added, stock sold and current stock, updated automatically
- Filter entries by all, added or sold
- Data is saved in cookies, so it is still there after refreshing the page

## Technologies Used

- HTML for the page structure
- CSS for styling and a responsive layout
- JavaScript for the tracking logic
- Cookies for saving data
- Git and GitHub for version control, GitHub Pages for deployment

## How to Run

1. Clone the repository:
   `git clone https://github.com/yvonnenyambura/Inventory-Tracker.git`
2. Open the project folder.
3. Open `index.html` in a browser. If cookies don't save when opening the file directly, run it with the Live Server extension in VS Code instead.

## How to Use

1. Enter the item name and quantity, choose a category and a type (added or sold), then click **Add Item**.
2. The entry appears in the Inventory Log and the totals update.
3. Use the **All**, **Added** and **Sold** buttons to filter the log.
4. Click **Delete** to remove an entry.

## Known Limitations

- Cookies hold about 4KB of data, so only a few dozen entries can be saved.
- Data is stored in the browser, so it is not shared between devices.
