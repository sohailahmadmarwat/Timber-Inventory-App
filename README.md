````markdown
# Timber Inventory Control System

A modern web-based Inventory Control System for **Muhammad Umar Timber Store**, converted from a Java console-based DSA project into a responsive visual application.

## Features

The system provides the same core operations as the original Java application:

1. **Add Record** — Add new timber inventory records.
2. **By Zone** — View inventory by warehouse zone.
3. **By Kind** — Search timber by species/type.
4. **Stock Analysis** — Identify low-stock items.
5. **Sales Update** — Update stock after sales.
6. **Delete Record** — Remove inventory records.
7. **Update Record** — Update quantity, price, and status.
8. **Inventory Report** — View inventory summary and total valuation.
9. **Backup & Restore** — Export and restore inventory data.
10. **Exit Program** — End the current session.

## Data Structure

The original project uses a **Singly Linked List** to manage timber records.

Each record contains:

- Zone
- Timber ID
- Kind
- Weight
- Status
- Height
- Quantity
- Price
- Cut Date

## Tech Stack

- **React 19**
- **Tailwind CSS v4**
- **Vite**
- **JavaScript (ES6+)**
- **Lucide React**

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/sohailahmadmarwat/Timber-Inventory-App.git
cd Timber-Inventory-App
````

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:5173
```

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
Timber-Inventory-App/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── models/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## License

This project is open source and available under the MIT License.

```
```
