import React, { useState } from 'react';
import { Trees, Search, Info, Grid, List } from 'lucide-react';
import { RecordCard, RecordTable } from './RecordCard';

export function DisplayKindView({ system }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const commonSpecies = ['Cheener', 'Deodar', 'Teak', 'Pine', 'Oak', 'Walnut', 'Cedar', 'Mahogany'];

  const handleSearch = (term = searchTerm) => {
    if (!term.trim()) return;
    setSearchTerm(term);
    const res = system.displayKind(term);
    setResult(res);
    setHasSearched(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Trees className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">[3] Display Record by Kind</h2>
            <p className="text-xs text-slate-400">
              Case-insensitive species lookup (e.g. Cheener, Deodar, Teak).
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-slate-800"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter Kind to search (e.g. Cheener, Deodar)..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <Search className="w-4 h-4" />
            Search Kind
          </button>
        </form>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-xs text-slate-400">Quick Filters:</span>
          {commonSpecies.map((species) => (
            <button
              key={species}
              type="button"
              onClick={() => handleSearch(species)}
              className="px-2.5 py-1 text-xs rounded-md bg-slate-950 border border-slate-800 hover:border-emerald-600/60 text-slate-300 transition-colors cursor-pointer"
            >
              {species}
            </button>
          ))}
        </div>
      </div>

      {hasSearched && result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-sm font-medium text-slate-300">
              {result.found ? (
                <span>Found <strong className="text-emerald-400">{result.records.length}</strong> record(s) for kind: <strong className="text-slate-100">"{searchTerm}"</strong></span>
              ) : (
                <span className="text-amber-400 font-mono">{result.message}</span>
              )}
            </p>
            {result.found && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg border ${viewMode === 'grid' ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg border ${viewMode === 'table' ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {!result.found ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-10 text-center space-y-3">
              <Info className="w-10 h-10 text-slate-500 mx-auto" />
              <p className="text-slate-300 font-mono text-sm">{result.message}</p>
              <p className="text-xs text-slate-500">Ensure the spelling is correct or check the full inventory list.</p>
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
