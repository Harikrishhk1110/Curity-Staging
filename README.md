# 🏭 Curity Inventory Management System

A professional Progressive Web Application (PWA) for managing inventory operations including lids count, packaging materials requests, and inventory transfers.

## 📋 Features

### 1. **Lids Count Management** 📦
- Track inventory of various lid types (PG2093, PG2082, etc.)
- Calculate partial quantities and full skids
- Auto-calculate total quantities with multipliers
- Persistent data storage with auto-save
- Export reports to text file
- Number formatting with thousand separators

### 2. **Packaging Materials Request (MTR)** 📋
- Generate unique Material Transfer Request (MTR) numbers
- Auto-formatted MTR with date and sequential counter
- Look up item descriptions from database
- Add/remove rows dynamically
- Track quantity and comments per item
- Export MTR reports
- Data persistence between sessions

### 3. **Inventory Transfer Request (ITR)** 🚚
- Generate unique Inventory Transfer Request (ITR) numbers
- Transfer items between warehouse locations
- Track source and destination warehouses
- Record transfer reason and quantity
- Validate transfers before processing
- Require requestor and approver names
- Export detailed transfer reports
- Comprehensive validation system

## 🎯 Key Improvements

✅ **Bug Fixes**
- Fixed `calculate()` function in lids.js
- Corrected Service Worker syntax errors
- Improved error handling throughout

✅ **New Features**
- Fully functional Inventory Transfer tab
- Data persistence for all modules
- Input validation and error checking
- Keyboard shortcuts (Ctrl+S to export)
- Report export functionality
- Responsive mobile design
- Dark theme support

✅ **UI/UX Enhancements**
- Modern, clean interface
- Better button styling with hover effects
- Smooth animations and transitions
- Mobile-responsive design
- Improved accessibility
- Better visual hierarchy

## 📱 Responsive Design

The application works seamlessly on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🔒 Data Management

All data is stored locally in browser storage:
- **Lids Data**: Partial layers and full skids counts
- **Materials Data**: MTR numbers and item requests
- **Inventory Data**: ITR numbers and transfer details

Data persists between sessions and can be cleared manually.

## 📥 Export Functionality

Each module can export its data to a formatted text report:
- Lids Count Report
- Material Transfer Request (MTR)
- Inventory Transfer Request (ITR)

**Keyboard Shortcut**: `Ctrl+S` or `Cmd+S` to export current tab

## 🌐 PWA Features

- **Offline Support**: Works without internet connection
- **Installable**: Add to home screen on mobile and desktop
- **Service Worker**: Automatic caching and offline fallback
- **Fast Load Times**: Cached resources load instantly
- **App-like Experience**: Runs as standalone application

## 📁 Project Structure

```
curity-inventory-system/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Responsive styling
├── js/
│   ├── app.js             # Core app logic
│   ├── lids.js            # Lids management
│   ├── materials.js       # MTR management
│   ├── inventory.js       # ITR management
│   └── database.js        # Data references
├── assets/
│   └── logo.png          # App icon/logo
├── service-worker.js      # PWA offline support
├── manifest.json          # PWA configuration
└── README.md             # This file
```

## 🚀 Usage

### Getting Started

1. Open the application in your browser
2. The app will automatically register the Service Worker
3. You can install it as a PWA (see your browser menu)

### Lids Count

1. Navigate to "Curity" tab
2. Enter partial layers and full skids
3. System auto-calculates totals
4. Data saves automatically
5. Click "Export Report" to download

### Materials Request

1. Navigate to "Packaging Materials" tab
2. Click "Generate MTR" to create request number
3. Add items by entering BBW Item No
4. System looks up descriptions automatically
5. Enter quantity and comments
6. Click "Export MTR" to download

### Inventory Transfer

1. Navigate to "Inventory Transfer" tab
2. Click "Generate ITR" to create transfer request
3. Enter requestor and approver names
4. Add transfer lines with source/destination
5. Click "Validate" to check for errors
6. Click "Export ITR" to download

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` / `Cmd+S` | Export current tab report |

## 🔧 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern responsive styling
- **JavaScript**: Pure vanilla JS (no frameworks)
- **Service Worker**: Offline capabilities
- **LocalStorage**: Data persistence
- **PWA**: Progressive Web App features

## 📋 Browser Support

- Chrome 40+
- Firefox 35+
- Safari 11+
- Edge 15+
- Mobile browsers (iOS Safari, Chrome Android)

## 🛠️ Future Enhancements

- Database backend integration
- User authentication
- Role-based access control
- Real-time synchronization
- Advanced analytics
- Print-optimized layouts
- Multi-language support
- Cloud backup
- Team collaboration features

## 📝 License

This project is proprietary to Curity Manufacturing.

## 👤 Author

Developed as a comprehensive inventory management solution.

## 📞 Support

For issues or feature requests, please contact the development team.

---

**Last Updated**: June 2025
**Version**: 2.0.0