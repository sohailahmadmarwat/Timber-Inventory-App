import React, { useState } from 'react';
import { InventoryControlSystem } from './models/InventoryControlSystem';
import { SidebarNav, MENU_ITEMS } from './components/SidebarNav';
import { AddRecordView } from './components/AddRecordView';
import { DisplayZoneView } from './components/DisplayZoneView';
import { DisplayKindView } from './components/DisplayKindView';
import { StockAnalysisView } from './components/StockAnalysisView';
import { SalesUpdateView } from './components/SalesUpdateView';
import { DeleteRecordView } from './components/DeleteRecordView';
import { UpdateRecordView } from './components/UpdateRecordView';
import { InventoryReportView } from './components/InventoryReportView';
import { BackupRestoreView } from './components/BackupRestoreView';
import { TerminalConsoleDrawer } from './components/TerminalConsoleDrawer';
import { 
  Warehouse, 
  Layers, 
  DollarSign, 
  AlertTriangle, 
  RotateCcw
} from 'lucide-react';

const INITIAL_SAMPLE_DATA = `A,101,Cheener,450.5,InStock,12.5,140,850,12/08/2026
A,102,Deodar,520.0,InStock,15.0,75,1200,05/09/2026
B,201,Teak,600.2,InStock,10.2,220,1500,20/07/2026
B,202,Pine,320.0,InStock,8.5,45,450,10/09/2026
C,301,Walnut,780.0,Reserved,14.0,90,1900,18/06/2026
C,302,Deodar,480.0,InStock,11.0,160,1150,02/09/2026
D,401,Oak,650.0,InStock,13.5,30,1350,15/08/2026
D,402,Cheener,410.0,Sold,9.0,0,780,28/05/2026`;

export default function App() {
  const [system, setSystem] = useState(() => {
    const ics = new InventoryControlSystem();
    ics.restoreData(INITIAL_SAMPLE_DATA);
    return ics;
  });

  const [activeChoice, setActiveChoice] = useState(8);
  const [records, setRecords] = useState(() => system.getAllRecords());
  const [logs, setLogs] = useState([
    { type: 'header', text: '***** TIMBER STORE *****' },
    { type: 'info', text: 'System initialized. Linked list loaded with timber records.' },
  ]);
  const [isExited, setIsExited] = useState(false);

  const addLog = (text, type = 'normal') => {
    setLogs((prev) => [...prev, { text, type, time: new Date().toLocaleTimeString() }]);
  };

  const refreshState = (updatedSystem) => {
    setSystem(updatedSystem);
    setRecords(updatedSystem.getAllRecords());
  };

  const formatRecordLog = (r) => {
    return `--------------------------------\nZone: ${r.zone}\nTimberID: ${r.timberID}\nKind: ${r.kind}\nWeight: ${r.weight}\nStatus: ${r.status}\nHeight: ${r.height}\nQuantity: ${r.quantity}\nPrice: ${r.price}\nCut Date: ${r.cutDate}`;
  };

  const handleAddRecord = (recordData) => {
    addLog(`\n--- Add Record ---`, 'header');
    addLog(`Enter Zone (A/B/C/D): ${recordData.zone}`);
    addLog(`Enter Timber ID: ${recordData.timberID}`);
    addLog(`Enter Kind(Cheener,Deodar....etc): ${recordData.kind}`);
    addLog(`Enter Weight(in KGs): ${recordData.weight}`);
    addLog(`Enter Status(InStock/Sold/Reserved): ${recordData.status}`);
    addLog(`Enter Height(in meters): ${recordData.height}`);
    addLog(`Enter Quantity: ${recordData.quantity}`);
    addLog(`Enter Price(in $): ${recordData.price}`);
    addLog(`Enter Cut Date(D/M/Y): ${recordData.cutDate}`);

    const newSys = system.clone();
    const addedNode = newSys.addRecord(recordData);
    refreshState(newSys);

    addLog(`Record #${recordData.timberID} added to linked list.`);
    return addedNode;
  };

  const handleSale = (timberID, qty) => {
    addLog(`\n--- Sales Update Report ---`, 'header');
    addLog(`Enter TimberID to sell: ${timberID}`);
    addLog(`Enter quantity to sell: ${qty}`);

    const newSys = system.clone();
    const res = newSys.salesUpdate(timberID, qty);
    if (res.success) {
      refreshState(newSys);
      addLog(res.message, 'info');
      addLog('Updated record:');
      addLog(formatRecordLog(res.updatedRecord));
    } else {
      addLog(res.message, 'error');
    }
    return res;
  };

  const handleDelete = (timberID) => {
    addLog(`\n--- Delete Record ---`, 'header');
    addLog(`Enter TimberID to delete: ${timberID}`);

    const newSys = system.clone();
    const res = newSys.deleteRecord(timberID);
    if (res.success) {
      refreshState(newSys);
      addLog(res.message, 'info');
    } else {
      addLog(res.message, 'error');
    }
    return res;
  };

  const handleUpdate = (timberID, updateData) => {
    addLog(`\n--- Update Record ---`, 'header');
    addLog(`Enter TimberID to update: ${timberID}`);
    addLog(`Enter new details:`);
    addLog(`New Quantity: ${updateData.newQuantity}`);
    addLog(`New Price: ${updateData.newPrice}`);
    addLog(`New Status: ${updateData.newStatus}`);

    const newSys = system.clone();
    const res = newSys.updateRecord(timberID, updateData);
    if (res.success) {
      refreshState(newSys);
      addLog(res.message, 'info');
    } else {
      addLog(res.message, 'error');
    }
    return res;
  };

  const handleRestore = (content) => {
    addLog(`\n--- Restore Data ---`, 'header');
    const newSys = new InventoryControlSystem();
    const res = newSys.restoreData(content);
    if (res.success) {
      refreshState(newSys);
      addLog(res.message, 'info');
    } else {
      addLog(res.message, 'error');
    }
    return res;
  };

  const handleExit = () => {
    addLog(`\n[10] Exiting Program...`, 'warn');
    setIsExited(true);
  };

  const handleRestart = () => {
    setIsExited(false);
    setActiveChoice(8);
    addLog(`\n***** TIMBER STORE *****`, 'header');
    addLog(`Program restarted. Welcome back!`);
  };

  const totalStock = records.reduce((acc, r) => acc + r.quantity, 0);
  const totalValue = records.reduce((acc, r) => acc + r.price, 0);
  const lowStockCount = records.filter((r) => r.quantity < 100).length;

  if (isExited) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-100">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 font-bold">
            <Warehouse className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-100">TIMBER STORE</h2>
            <p className="text-sm text-slate-400 mt-2 font-mono">Exiting Program...</p>
          </div>
          <p className="text-xs text-slate-500">
            Session ended. All operations and memory state have terminated cleanly.
          </p>
          <button
            onClick={handleRestart}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Restart Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <header className="bg-slate-900/95 border-b border-slate-800 px-6 py-3.5 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 shadow-md">
              <Warehouse className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-slate-100 tracking-tight">
                TIMBER STORE
              </h1>
              <p className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                Inventory Control System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Total Units:</span>
              <strong className="text-slate-100 font-mono">{totalStock}</strong>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">Total Value:</span>
              <strong className="text-emerald-400 font-mono">${totalValue}</strong>
            </div>

            {lowStockCount > 0 && (
              <div 
                onClick={() => setActiveChoice(4)}
                className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/60 flex items-center gap-2 text-xs text-amber-300 cursor-pointer hover:bg-amber-950 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span>Low Stock: <strong>{lowStockCount}</strong></span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        <SidebarNav
          activeChoice={activeChoice}
          onSelectChoice={(id) => {
            setActiveChoice(id);
            addLog(`\nMenu Option [${id}] Selected: ${MENU_ITEMS.find(m => m.id === id)?.name}`);
          }}
          onExit={handleExit}
          recordCount={records.length}
        />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {activeChoice === 1 && (
            <AddRecordView 
              onAddRecord={handleAddRecord} 
              existingRecords={records} 
            />
          )}

          {activeChoice === 2 && (
            <DisplayZoneView 
              system={system} 
            />
          )}

          {activeChoice === 3 && (
            <DisplayKindView 
              system={system} 
            />
          )}

          {activeChoice === 4 && (
            <StockAnalysisView 
              system={system} 
            />
          )}

          {activeChoice === 5 && (
            <SalesUpdateView 
              system={system} 
              onSaleComplete={handleSale}
              records={records}
            />
          )}

          {activeChoice === 6 && (
            <DeleteRecordView 
              system={system} 
              onDeleteRecord={handleDelete}
              records={records}
            />
          )}

          {activeChoice === 7 && (
            <UpdateRecordView 
              system={system} 
              onUpdateRecord={handleUpdate}
              records={records}
            />
          )}

          {activeChoice === 8 && (
            <InventoryReportView 
              system={system} 
            />
          )}

          {activeChoice === 9 && (
            <BackupRestoreView 
              system={system} 
              onRestoreData={handleRestore}
            />
          )}
        </main>
      </div>

      <TerminalConsoleDrawer 
        logs={logs} 
        onClearLogs={() => setLogs([{ type: 'info', text: 'Console buffer cleared.' }])} 
      />
    </div>
  );
}
