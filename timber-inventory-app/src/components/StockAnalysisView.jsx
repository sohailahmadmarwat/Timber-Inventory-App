import React, { useState } from 'react';
import { AlertTriangle, TrendingDown, CheckCircle, Grid, List } from 'lucide-react';
import { RecordCard, RecordTable } from './RecordCard';

export function StockAnalysisView({ system }) {
  const [viewMode, setViewMode] = useState('grid');
  const analysisResult = system.analysis();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">[4] Analysis of Records Level</h2>
              <p className="text-xs text-slate-400 font-mono">
                {analysisResult.header}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-800/60">
              Threshold: &lt; 100 units
            </div>
            {analysisResult.found && (
              <>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg border ${viewMode === 'grid' ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg border ${viewMode === 'table' ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {!analysisResult.found ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200">Stock Levels Healthy</h3>
          <p className="text-slate-400 font-mono text-sm">{analysisResult.message}</p>
          <p className="text-xs text-slate-500">All inventory batches currently hold 100 or more units in stock.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-amber-950/40 border border-amber-700/50 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-5 h-5 text-amber-400 shrink-0" />
              <p className="text-sm text-amber-200">
                Found <strong className="text-amber-400 font-bold">{analysisResult.records.length}</strong> timber batch(es) with low quantity (&lt; 100 units).
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400/80 uppercase">Low Stock</span>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisResult.records.map((rec) => (
                <RecordCard key={rec.timberID} record={rec} />
              ))}
            </div>
          ) : (
            <RecordTable records={analysisResult.records} />
          )}
        </div>
      )}
    </div>
  );
}
