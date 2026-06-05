// Tab Management
function showTab(tabId) {
  document
    .querySelectorAll('.tab')
    .forEach(t => t.classList.remove('active'));

  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Initialize tab data when switching
  if (tabId === 'curity') {
    initializeLidsTable();
  } else if (tabId === 'materials') {
    initializeMaterialsTable();
  } else if (tabId === 'inventory') {
    initializeInventoryTable();
  }
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(registration => {
      console.log('Service Worker registered successfully:', registration);
    })
    .catch(error => {
      console.log('Service Worker registration failed:', error);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeLidsTable();
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl+S or Cmd+S to save/export
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      const activeTab = document.querySelector('.tab.active');
      if (activeTab.id === 'curity') {
        exportLidsReport();
      } else if (activeTab.id === 'materials') {
        exportMTR();
      } else if (activeTab.id === 'inventory') {
        exportITR();
      }
    }
  });
});

// Utility function to show notifications
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
    color: white;
    border-radius: 4px;
    z-index: 1000;
    animation: slideIn 0.3s ease-in-out;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Prevent unsaved changes
window.addEventListener('beforeunload', function(e) {
  const hasUnsavedData = localStorage.getItem('lidsData') || 
                         localStorage.getItem('materialsData') || 
                         localStorage.getItem('inventoryData');
  
  if (hasUnsavedData) {
    e.preventDefault();
    e.returnValue = '';
  }
});

// Global error handler
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
  showNotification('An error occurred. Please refresh the page.', 'error');
});