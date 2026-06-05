const lids = [
  {
    item: "PG2093",
    desc: "Diageo Silver Plain 202 Can End Lid",
    multiplier: 16,
    fullSkid: 278400
  },
  {
    item: "PG2082",
    desc: "Plain Silver Lid",
    multiplier: 22,
    fullSkid: 382200
  },
  {
    item: "PG2084",
    desc: "10ST Silver Lid",
    multiplier: 22,
    fullSkid: 382200
  },
  {
    item: "PG2088",
    desc: "Black Tab Lid",
    multiplier: 22,
    fullSkid: 382200
  },
  {
    item: "PG2089",
    desc: "Geloso Lid",
    multiplier: 22,
    fullSkid: 382200
  },
  {
    item: "PG2085",
    desc: "Gold Lid",
    multiplier: 22,
    fullSkid: 382200
  },
  {
    item: "PG2083",
    desc: "5ST Lid",
    multiplier: 22,
    fullSkid: 382200
  },
  {
    item: "PG2097",
    desc: "Carbliss Lid",
    multiplier: 22,
    fullSkid: 289536
  },
  {
    item: "PG2096",
    desc: "Poppi Lid",
    multiplier: 22,
    fullSkid: 382200
  },
  {
    item: "PG2095",
    desc: "Monster Lid",
    multiplier: 22,
    fullSkid: 382200
  }
];

function initializeLidsTable() {
  const tbody = document.querySelector("#lidsTable tbody");
  tbody.innerHTML = "";

  lids.forEach((lid, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${lid.item}</td>
      <td>${lid.desc}</td>
      <td>
        <input
          type="number"
          min="0"
          class="partialLayers"
          data-index="${index}"
          oninput="calculateRow(${index})">
      </td>
      <td id="partial${index}">0</td>
      <td>
        <input
          type="number"
          min="0"
          value="0"
          class="fullSkids"
          data-index="${index}"
          oninput="calculateRow(${index})">
      </td>
      <td id="total${index}">0</td>
    `;

    tbody.appendChild(row);
  });

  loadLidsData();
}

function calculateRow(index) {
  if (index < 0 || index >= lids.length) {
    console.error("Invalid index:", index);
    return;
  }

  const tbody = document.querySelector("#lidsTable tbody");
  const row = tbody.rows[index];

  if (!row) return;

  const partialLayers = Number(row.cells[2].querySelector('input').value) || 0;
  const fullSkids = Number(row.cells[4].querySelector('input').value) || 0;

  // Validate non-negative values
  if (partialLayers < 0 || fullSkids < 0) {
    alert("Please enter positive numbers only");
    return;
  }

  const partialQty = partialLayers * lids[index].multiplier * 600;
  const total = partialQty + (fullSkids * lids[index].fullSkid);

  document.getElementById(`partial${index}`).innerText = partialQty.toLocaleString();
  document.getElementById(`total${index}`).innerText = total.toLocaleString();

  // Auto-save
  saveLidsData();
}

function saveLidsData() {
  const data = lids.map((lid, index) => {
    const row = document.querySelector("#lidsTable tbody").rows[index];
    return {
      item: lid.item,
      partialLayers: row.cells[2].querySelector('input').value || "0",
      fullSkids: row.cells[4].querySelector('input').value || "0"
    };
  });
  localStorage.setItem('lidsData', JSON.stringify(data));
}

function loadLidsData() {
  const savedData = localStorage.getItem('lidsData');
  if (savedData) {
    try {
      const data = JSON.parse(savedData);
      data.forEach((item, index) => {
        const row = document.querySelector("#lidsTable tbody").rows[index];
        if (row) {
          row.cells[2].querySelector('input').value = item.partialLayers;
          row.cells[4].querySelector('input').value = item.fullSkids;
          calculateRow(index);
        }
      });
    } catch (e) {
      console.error("Error loading saved data:", e);
    }
  }
}

function exportLidsReport() {
  let report = "CURITY LIDS COUNT REPORT\n";
  report += `Generated: ${new Date().toLocaleString()}\n`;
  report += "=".repeat(100) + "\n\n";

  const tbody = document.querySelector("#lidsTable tbody");
  let grandTotal = 0;

  lids.forEach((lid, index) => {
    const row = tbody.rows[index];
    const total = document.getElementById(`total${index}`).innerText;
    const totalNum = parseInt(total.replace(/,/g, ""));
    grandTotal += totalNum;

    report += `${lid.item} - ${lid.desc}\n`;
    report += `  Partial Layers: ${row.cells[2].querySelector('input').value}\n`;
    report += `  Full Skids: ${row.cells[4].querySelector('input').value}\n`;
    report += `  Total: ${total}\n\n`;
  });

  report += "=".repeat(100) + "\n";
  report += `GRAND TOTAL: ${grandTotal.toLocaleString()}\n`;

  downloadReport(report, 'lids-report.txt');
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