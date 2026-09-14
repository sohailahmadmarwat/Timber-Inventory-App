import React, { useState } from 'react';
import { FileText, Printer, Grid, List, Layers, DollarSign, Package, AlertCircle } from 'lucide-react';
import { RecordCard, RecordTable } from './RecordCard';

export function InventoryReportView({ system }) {
  const [viewMode, setViewMode] = useState('table');
  const report = system.inventoryReport();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">[8] Generate Inventory Report</h2>
              <p className="text-xs text-slate-400 font-mono">
                {report.header || '----- Inventory Report -----'}
              </p>
            </div>
          </div>

          {report.available && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-400" />
                Print Report
              </button>
              <div className="flex items-center gap-1 border border-slate-800 bg-slate-950 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'}`}
                  title="Table View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {report.available ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
              <div className="p-3 rounded-lg bg-blue-950/60 border border-blue-800/40 text-blue-400">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Total Batches</p>
                <p className="text-xl font-bold text-slate-100">{report.records.length} Records</p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
              <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-800/40 text-amber-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-mono">Total Quantity</p>
                <p className="text-xl font-bold text-amber-400">{report.totalQty} units</p>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5">
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold font-mono">Total Price</p>
                <p className="text-xl font-bold text-emerald-400">${report.totalPrice}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {!report.available ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <AlertCircle className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">No Records Available</h3>
          <p className="text-slate-400 font-mono text-sm">{report.message}</p>
          <p className="text-xs text-slate-500">Add new timber records or restore from backup to populate the report.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
            <span>Listing all active linked list nodes</span>
            <span>Total Value: ${report.totalPrice}</span>
          </div>

          {viewMode === 'table' ? (
            <RecordTable records={report.records} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {report.records.map((rec) => (
                <RecordCard key={rec.timberID} record={rec} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
