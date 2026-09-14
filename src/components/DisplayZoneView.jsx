import React, { useState } from 'react';
import { MapPin, Info, Grid, List } from 'lucide-react';
import { RecordCard, RecordTable } from './RecordCard';

export function DisplayZoneView({ system }) {
  const [selectedZone, setSelectedZone] = useState('A');
  const [hasSearched, setHasSearched] = useState(false);
  const [result, setResult] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const zones = ['A', 'B', 'C', 'D'];

  const handleSearch = (zoneToSearch = selectedZone) => {
    setSelectedZone(zoneToSearch);
    const res = system.displayZone(zoneToSearch);
    setResult(res);
    setHasSearched(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">[2] Display Records by Zone</h2>
            <p className="text-xs text-slate-400">
              Filter timber stock stored in specific warehouse zones.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-300 uppercase">Enter Zone:</span>
            <div className="flex gap-2">
              {zones.map((z) => (
                <button
                  key={z}
                  onClick={() => handleSearch(z)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                    selectedZone === z && hasSearched
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  Zone {z}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg border ${viewMode === 'grid' ? 'bg-slate-800 border-slate-700 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
              title="Card Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg border ${viewMode === 'table' ? 'bg-slate-800 border-slate-700 text-cyan-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {hasSearched && result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-medium text-slate-300">
              {result.found ? (
                <span>Found <strong className="text-cyan-400">{result.records.length}</strong> record(s) in <strong className="text-slate-100">Zone {selectedZone}</strong></span>
              ) : (
                <span className="text-amber-400 font-mono">{result.message}</span>
              )}
            </p>
          </div>

          {!result.found ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-10 text-center space-y-3">
              <Info className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-slate-300 font-mono text-sm">{result.message}</p>
              <p className="text-xs text-slate-500">No timber currently logged under this zone sector.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {result.records.map((rec) => (
                <RecordCard key={rec.timberID} record={rec} />
              ))}
            </div>
          ) : (
            <RecordTable records={result.records} />
          )}
        </div>
      )}
    </div>
  );
}
