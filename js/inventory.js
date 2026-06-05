let invRowCount = 1;

function initializeInventoryTable() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = "";
  invRowCount = 0;
  addInventoryRow();
  loadInventoryData();
}

function addInventoryRow() {
  const tbody = document.querySelector("#inventoryTable tbody");
  const rowIndex = invRowCount++;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <input 
        type="text"
        class="itemNo"
        data-index="${rowIndex}"
        placeholder="Item No">
    </td>
    <td>
      <input 
        type="text"
        class="description"
        data-index="${rowIndex}"
        placeholder="Description">
    </td>
    <td>
      <select class="fromLocation" data-index="${rowIndex}">
        <option value="">Select Source</option>
        ${Object.entries(warehouseLocations).map(([code, name]) => 
          `<option value="${code}">${code} - ${name}</option>`
        ).join('')}
      </select>
    </td>
    <td>
      <select class="toLocation" data-index="${rowIndex}">
        <option value="">Select Destination</option>
        ${Object.entries(warehouseLocations).map(([code, name]) => 
          `<option value="${code}">${code} - ${name}</option>`
        ).join('')}
      </select>
    </td>
    <td>
      <input 
        type="number"
        min="0"
        class="quantity"
        data-index="${rowIndex}"
        placeholder="Qty">
    </td>
    <td>
      <input 
        type="text"
        class="reason"
        data-index="${rowIndex}"
        placeholder="Reason">
    </td>
    <td>
      <button class="btn-remove" onclick="removeInventoryRow(${rowIndex})">✕</button>
    </td>
  `;

  row.dataset.rowIndex = rowIndex;
  row.addEventListener('change', () => saveInventoryData());
  row.addEventListener('input', () => saveInventoryData());

  tbody.appendChild(row);
}

function removeInventoryRow(rowIndex) {
  const row = document.querySelector(`tr[data-row-index="${rowIndex}"]`);
  if (row) {
    row.remove();
    saveInventoryData();
  }
}

function generateITR() {
  let count = localStorage.getItem("itrCount");

  if (!count) {
    count = 50;
  } else {
    count = Number(count) + 1;
  }

  localStorage.setItem("itrCount", count);

  const today = new Date();
  const itr = `CURITY-ITR${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${count}`;

  document.getElementById("itrNumber").value = itr;
  document.getElementById("itrNumber").style.fontWeight = "bold";

  saveInventoryData();
}

function saveInventoryData() {
  const tbody = document.querySelector("#inventoryTable tbody");
  const data = [];

  tbody.querySelectorAll('tr').forEach(row => {
    const itemNo = row.querySelector('.itemNo')?.value || "";
    const description = row.querySelector('.description')?.value || "";
    const fromLocation = row.querySelector('.fromLocation')?.value || "";
    const toLocation = row.querySelector('.toLocation')?.value || "";
    const quantity = row.querySelector('.quantity')?.value || "0";
    const reason = row.querySelector('.reason')?.value || "";

    if (itemNo.trim()) {
      data.push({ itemNo, description, fromLocation, toLocation, quantity, reason });
    }
  });

  const itrNumber = document.getElementById("itrNumber").value;
  const requestedBy = document.getElementById("requestedBy").value;
  const approvedBy = document.getElementById("approvedBy").value;

  localStorage.setItem('inventoryData', JSON.stringify({
    itrNumber,
    requestedBy,
    approvedBy,
    rows: data,
    savedAt: new Date().toISOString()
  }));
}

function loadInventoryData() {
  const savedData = localStorage.getItem('inventoryData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);

      if (data.itrNumber) {
        document.getElementById("itrNumber").value = data.itrNumber;
        document.getElementById("itrNumber").style.fontWeight = "bold";
      }

      if (data.requestedBy) {
        document.getElementById("requestedBy").value = data.requestedBy;
      }

      if (data.approvedBy) {
        document.getElementById("approvedBy").value = data.approvedBy;
      }

      if (data.rows && data.rows.length > 0) {
        const tbody = document.querySelector("#inventoryTable tbody");
        tbody.innerHTML = "";
        invRowCount = 0;

        data.rows.forEach(item => {
          addInventoryRow();
          const row = tbody.rows[invRowCount - 1];
          row.querySelector('.itemNo').value = item.itemNo;
          row.querySelector('.description').value = item.description;
          row.querySelector('.fromLocation').value = item.fromLocation;
          row.querySelector('.toLocation').value = item.toLocation;
          row.querySelector('.quantity').value = item.quantity;
          row.querySelector('.reason').value = item.reason;
        });
      }
    } catch (e) {
      console.error("Error loading inventory data:", e);
    }
  }
}

function exportITR() {
  const itrNumber = document.getElementById("itrNumber").value;

  if (!itrNumber) {
    alert("Please generate an ITR number first");
    return;
  }

  let report = "INVENTORY TRANSFER REQUEST (ITR)\n";
  report += `ITR Number: ${itrNumber}\n`;
  report += `Generated: ${new Date().toLocaleString()}\n`;
  report += `Requested By: ${document.getElementById("requestedBy").value}\n`;
  report += `Approved By: ${document.getElementById("approvedBy").value}\n`;
  report += "=".repeat(140) + "\n\n";

  const tbody = document.querySelector("#inventoryTable tbody");
  let totalItems = 0;

  report += `${"Item No".padEnd(15)} | ${"Description".padEnd(35)} | ${"From".padEnd(10)} | ${"To".padEnd(10)} | ${"Qty".padEnd(8)} | Reason\n`;
  report += "-".repeat(140) + "\n";

  tbody.querySelectorAll('tr').forEach(row => {
    const itemNo = row.querySelector('.itemNo').value;
    const description = row.querySelector('.description').value;
    const fromLocation = row.querySelector('.fromLocation').value;
    const toLocation = row.querySelector('.toLocation').value;
    const quantity = row.querySelector('.quantity').value;
    const reason = row.querySelector('.reason').value;

    if (itemNo.trim()) {
      totalItems += parseInt(quantity) || 0;
      const fromCode = fromLocation.split('-')[0];
      const toCode = toLocation.split('-')[0];

      report += `${itemNo.padEnd(15)} | ${description.substring(0, 35).padEnd(35)} | ${fromCode.padEnd(10)} | ${toCode.padEnd(10)} | ${(quantity || "0").padEnd(8)} | ${reason}\n`;
    }
  });

  report += "-".repeat(140) + "\n";
  report += `TOTAL ITEMS: ${totalItems}\n`;
  report += "=".repeat(140) + "\n";

  downloadReport(report, `itr-${itrNumber}.txt`);
}

function clearInventory() {
  if (confirm("Are you sure you want to clear all inventory transfer data? This cannot be undone.")) {
    initializeInventoryTable();
    document.getElementById("itrNumber").value = "";
    document.getElementById("requestedBy").value = "";
    document.getElementById("approvedBy").value = "";
    localStorage.removeItem('inventoryData');
  }
}

function validateTransfer() {
  const tbody = document.querySelector("#inventoryTable tbody");
  const errors = [];

  tbody.querySelectorAll('tr').forEach((row, index) => {
    const itemNo = row.querySelector('.itemNo').value.trim();
    const fromLocation = row.querySelector('.fromLocation').value;
    const toLocation = row.querySelector('.toLocation').value;
    const quantity = row.querySelector('.quantity').value;

    if (itemNo) {
      if (!fromLocation) {
        errors.push(`Row ${index + 1}: Source location is required`);
      }
      if (!toLocation) {
        errors.push(`Row ${index + 1}: Destination location is required`);
      }
      if (fromLocation === toLocation && fromLocation) {
        errors.push(`Row ${index + 1}: Source and destination cannot be the same`);
      }
      if (!quantity || parseInt(quantity) <= 0) {
        errors.push(`Row ${index + 1}: Valid quantity is required`);
      }
    }
  });

  if (errors.length > 0) {
    alert("Validation Errors:\n\n" + errors.join("\n"));
    return false;
  }

  return true;
}

function downloadReport(content, filename) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}