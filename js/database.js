// Item Database for Materials Request
const itemDatabase = {
  "CC1033-473": "6072820 Singha Original Thai Beer 473ml Standard Can",
  "CC1048": "Ace Hill Mexican Lager 355ml",
  "CC1079CAN": "Partake Pale Ale 355ml Standard CA Can",
  "CC1098CAN": "Partake IPA 355ml Standard CA Can",
  "CC1099CAN": "Partake Blonde 355ml Standard CA Can",
  "CC1001": "Standard Beer Can 355ml",
  "CC1002": "Premium Beer Can 500ml",
  "CC1003": "Slim Beer Can 250ml"
};

// Warehouse Database for Inventory Transfer
const warehouseLocations = {
  "WH-01": "Main Warehouse - Toronto",
  "WH-02": "Secondary Warehouse - Mississauga",
  "WH-03": "Distribution Center - Ontario",
  "WH-04": "Cold Storage - Hamilton"
};

// Helper function to get item description
function getItemDescription(itemNo) {
  return itemDatabase[itemNo] || "Item not found";
}

// Helper function to get warehouse info
function getWarehouseInfo(warehouseCode) {
  return warehouseLocations[warehouseCode] || null;
}

// Helper function to format numbers with thousand separators
function formatNumber(num) {
  return parseInt(num).toLocaleString('en-US');
}

// Helper function to format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}