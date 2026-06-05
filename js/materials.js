let mtrRowCount = 1;

function initializeMaterialsTable() {
  const tbody = document.querySelector("#requestTable tbody");
  tbody.innerHTML = "";
  mtrRowCount = 0;
  addMaterialRow();
  loadMaterialsData();
}

function addMaterialRow() {
  const tbody = document.querySelector("#requestTable tbody");
  const rowIndex = mtrRowCount++;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>
      <input 
        type="text"
        class="itemNo"
        data-index="${rowIndex}"
        placeholder="Enter Item No"
        onblur="lookupDescription(${rowIndex})">
    </td>
    <td class="description" data-index="${rowIndex}">-</td>
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
        class="comments"
        data-index="${rowIndex}"
        placeholder="Comments">
    </td>
    <td>
      <button class="btn-remove" onclick="removeMaterialRow(${rowIndex})">✕</button>
    </td>
  `;

  row.dataset.rowIndex = rowIndex;
  tbody.appendChild(row);
}

function removeMaterialRow(rowIndex) {
  const row = document.querySelector(`tr[data-row-index="${rowIndex}"]`);
  if (row) {
    row.remove();
    saveMaterialsData();
  }
}

function lookupDescription(rowIndex) {
  const row = document.querySelector(`tr[data-row-index="${rowIndex}"]`);
  if (!row) return;

  const itemNo = row.querySelector('.itemNo').value.trim();
  const descCell = row.querySelector('.description');

  if (itemNo === "") {
    descCell.innerText = "-";
  } else if (itemDatabase[itemNo]) {
    descCell.innerText = itemDatabase[itemNo];
  } else {
    descCell.innerText = "⚠ Item Not Found";
    descCell.style.color = "#cc0000";
  }

  saveMaterialsData();
}

function generateMTR() {
  let count = localStorage.getItem("mtrCount");

  if (!count) {
    count = 20;
  } else {
    count = Number(count) + 1;
  }

  localStorage.setItem("mtrCount", count);

  const today = new Date();
  const mtr = `CURITY${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${count}`;

  document.getElementById("mtrNumber").value = mtr;
  document.getElementById("mtrNumber").style.fontWeight = "bold";
  
  saveMaterialsData();
}

function saveMaterialsData() {
  const tbody = document.querySelector("#requestTable tbody");
  const data = [];

  tbody.querySelectorAll('tr').forEach(row => {
    const itemNo = row.querySelector('.itemNo')?.value || "";
    const description = row.querySelector('.description')?.innerText || "";
    const quantity = row.querySelector('.quantity')?.value || "0";
    const comments = row.querySelector('.comments')?.value || "";

    if (itemNo.trim()) {
      data.push({ itemNo, description, quantity, comments });
    }
  });

  const mtrNumber = document.getElementById("mtrNumber").value;

  localStorage.setItem('materialsData', JSON.stringify({
    mtrNumber,
    rows: data,
    savedAt: new Date().toISOString()
  }));
}

function loadMaterialsData() {
  const savedData = localStorage.getItem('materialsData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);

      if (data.mtrNumber) {
        document.getElementById("mtrNumber").value = data.mtrNumber;
        document.getElementById("mtrNumber").style.fontWeight = "bold";
      }

      if (data.rows && data.rows.length > 0) {
        const tbody = document.querySelector("#requestTable tbody");
        tbody.innerHTML = "";
        mtrRowCount = 0;

        data.rows.forEach(item => {
          addMaterialRow();
          const row = tbody.rows[mtrRowCount - 1];
          row.querySelector('.itemNo').value = item.itemNo;
          row.querySelector('.description').innerText = item.description;
          row.querySelector('.quantity').value = item.quantity;
          row.querySelector('.comments').value = item.comments;
        });
      }
    } catch (e) {
      console.error("Error loading materials data:", e);
    }
  }
}

function exportMTR() {
  const mtrNumber = document.getElementById("mtrNumber").value;

  if (!mtrNumber) {
    alert("Please generate an MTR number first");
    return;
  }

  let report = "PACKAGING MATERIALS REQUEST (MTR)\n";
  report += `MTR Number: ${mtrNumber}\n`;
  report += `Generated: ${new Date().toLocaleString()}\n`;
  report += "=".repeat(120) + "\n\n";

  const tbody = document.querySelector("#requestTable tbody");
  let totalItems = 0;

  report += `${"Item No".padEnd(20)} | ${"Description".padEnd(60)} | ${"Quantity".padEnd(10)} | Comments\n`;
  report += "-".repeat(120) + "\n";

  tbody.querySelectorAll('tr').forEach(row => {
    const itemNo = row.querySelector('.itemNo').value;
    const description = row.querySelector('.description').innerText;
    const quantity = row.querySelector('.quantity').value;
    const comments = row.querySelector('.comments').value;

    if (itemNo.trim()) {
      totalItems += parseInt(quantity) || 0;
      report += `${itemNo.padEnd(20)} | ${description.substring(0, 60).padEnd(60)} | ${(quantity || "0").padEnd(10)} | ${comments}\n`;
    }
  });

  report += "-".repeat(120) + "\n";
  report += `TOTAL ITEMS: ${totalItems}\n`;
  report += "=".repeat(120) + "\n";

  downloadReport(report, `mtr-${mtrNumber}.txt`);
}

function clearMaterials() {
  if (confirm("Are you sure you want to clear all materials data? This cannot be undone.")) {
    initializeMaterialsTable();
    document.getElementById("mtrNumber").value = "";
    localStorage.removeItem('materialsData');
  }
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