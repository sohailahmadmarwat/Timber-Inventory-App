# 🌲 TIMBER STORE - Inventory Control System

A visual, responsive, and modern web application converted directly from a core **Java Console Data Structures & Algorithms (DSA) project**. Built with **React 19**, **Tailwind CSS v4**, and **Vite**, this application preserves **100% logic and algorithmic parity** with the original Java singly-linked list implementation while delivering an intuitive, enterprise-grade GUI.

---

## 🌟 Key Features & Operations

The application maps every single operation from the original Java console application into rich interactive visual components:

| Operation | Java Method | Description |
| :--- | :--- | :--- |
| **`[1] Add Record`** | `addRecord()` | Interactive form to insert new timber batches with validation across all 9 attributes (`zone`, `timberID`, `kind`, `weight`, `status`, `height`, `quantity`, `price`, `cutDate`). |
| **`[2] By Zone`** | `displayZone()` | Filter and inspect timber inventory by warehouse sector (`Zone A`, `Zone B`, `Zone C`, `Zone D`). |
| **`[3] By Kind`** | `displayKind()` | Case-insensitive species search (e.g., *Cheener*, *Deodar*, *Teak*, *Pine*, *Oak*, *Walnut*) with quick-filter pills. |
| **`[4] Stock Analysis`** | `analysis()` | Automatic low-stock alert filtering all timber batches with `quantity < 100` units. |
| **`[5] Sales Update`** | `salesUpdate()` | Point-of-Sale deduction with stock quantity validation; automatically sets status to `"Sold"` when quantity reaches `0`. |
| **`[6] Delete Record`** | `deleteRecord()` | Removes and unlinks node pointers from the singly-linked list by `TimberID`. |
| **`[7] Update Record`** | `updateRecord()` | Edit `New Quantity`, `New Price`, and `New Status` for existing batches. |
| **`[8] Inventory Report`** | `inventoryReport()` | Comprehensive summary report calculating exact **Total Quantity** and **Total Valuation ($)** with print/export support. |
| **`[9] Backup & Restore`** | `backupData()` / `restoreData()` | Dual file persistence system: download and restore using the official comma-separated `timberdata.txt` standard. |
| **`[10] Exit Program`** | Exit Loop | Graceful session termination screen with one-click instant restart. |
| **Live Java Console Stream** | `System.out.println()` | Expandable real-time terminal drawer displaying the exact console stream and prompts. |

---

## 🏗️ Architecture & Data Structure

The application strictly preserves the original **Singly-Linked List** data structure from Java:

```text
[ Head: TimberNode ] -> [ TimberNode ] -> [ TimberNode ] -> [ Tail: TimberNode ] -> null
```

### Timber Record Attributes:
- **`zone`** (`char`): Warehouse Zone Sector (`A`, `B`, `C`, `D`)
- **`timberID`** (`int`): Unique Integer Identifier
- **`kind`** (`String`): Timber Species Name (*Cheener*, *Deodar*, *Teak*, etc.)
- **`weight`** (`float`): Weight in kilograms (KGs)
- **`status`** (`String`): Current inventory state (`InStock`, `Sold`, `Reserved`)
- **`height`** (`float`): Length/Height in meters (m)
- **`quantity`** (`int`): Number of units available
- **`price`** (`int`): Price per unit in USD ($)
- **`cutDate`** (`String`): Logging date formatted as `D/M/Y`

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 19
- **Styling:** Tailwind CSS v4 (Dark Theme & Responsive Grid)
- **Build Tool:** Vite 8
- **Icons:** Lucide React
- **Language:** JavaScript (ES6+ Modules)

---

## 🚀 Step-by-Step Setup & Installation Guide

### Prerequisites
Make sure you have **Node.js** (v18 or higher) installed on your system.
Check your version by running:
```bash
node -v
npm -v
```

---

### 1. Clone the Repository
```bash
git clone https://github.com/sohailahmadmarwat/Timber-Inventory-App.git
cd Timber-Inventory-App
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

After running the command, open your browser and navigate to:
```
http://localhost:5173
```

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 📁 Project Directory Structure

```text
Timber-Inventory-App/
├── public/                     # Static public assets & icons
├── src/
│   ├── assets/                 # App assets & media
│   ├── components/             # Visual UI Components
│   │   ├── AddRecordView.jsx          # [1] Add Timber Record Form
│   │   ├── DisplayZoneView.jsx        # [2] Zone Filter & Display
│   │   ├── DisplayKindView.jsx        # [3] Species Search
│   │   ├── StockAnalysisView.jsx      # [4] Low Quantity Analysis (<100)
│   │   ├── SalesUpdateView.jsx        # [5] Sales Stock Deduction
│   │   ├── DeleteRecordView.jsx       # [6] Delete Node from List
│   │   ├── UpdateRecordView.jsx       # [7] Modify Quantity/Price/Status
│   │   ├── InventoryReportView.jsx    # [8] Full Inventory Valuation Report
│   │   ├── BackupRestoreView.jsx      # [9] timberdata.txt File Export/Import
│   │   ├── RecordCard.jsx             # Visual Card & Table Row Renderer
│   │   ├── SidebarNav.jsx             # Operations Navigation Sidebar
│   │   └── TerminalConsoleDrawer.jsx  # Live Java Console Output Drawer
│   ├── models/
│   │   └── InventoryControlSystem.js  # Core Singly-Linked List Logic
│   ├── App.jsx                 # Master Application Component
│   ├── index.css               # Tailwind CSS imports & global theme
│   └── main.jsx                # React DOM root entry point
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── vite.config.js              # Vite configuration with Tailwind CSS plugin
└── README.md                   # Project documentation
```

---

## 💾 Data Persistence Format (`timberdata.txt`)

When using **[9] Backup Data**, records are exported in standard comma-separated format matching the Java file parser:

```csv
zone,timberID,kind,weight,status,height,quantity,price,cutDate
A,101,Cheener,450.5,InStock,12.5,140,850,12/08/2026
A,102,Deodar,520.0,InStock,15.0,75,1200,05/09/2026
B,201,Teak,600.2,InStock,10.2,220,1500,20/07/2026
```

You can reload or restore this data at any time via **[9] Restore Data** using either file upload or direct text paste.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

