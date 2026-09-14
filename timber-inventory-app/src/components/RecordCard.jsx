import React from 'react';
import { Layers, DollarSign, Calendar, Scale, Ruler, CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

export function RecordCard({ record }) {
  const getStatusBadge = (status) => {
    const s = String(status || '').toLowerCase();
    if (s.includes('instock') || s === 'available' || s === 'in stock') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/60">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          {record.status}
        </span>
      );
    }
    if (s.includes('sold')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-950 text-rose-300 border border-rose-800/60">
          <XCircle className="w-3 h-3 text-rose-400" />
          {record.status}
        </span>
      );
    }
    if (s.includes('reserved')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950 text-amber-300 border border-amber-800/60">
          <AlertTriangle className="w-3 h-3 text-amber-400" />
          {record.status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
        <Info className="w-3 h-3 text-slate-400" />
        {record.status}
      </span>
    );
  };

  const isLowStock = record.quantity < 100;

  return (
    <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-600/50 transition-all duration-200 rounded-xl p-5 shadow-lg shadow-black/40 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between pb-3 border-b border-slate-800/80 gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-amber-950/70 border border-amber-700/40 flex items-center justify-center text-amber-400 font-bold text-lg">
              {record.zone}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 text-base">{record.kind}</h3>
                <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  ID: #{record.timberID}
                </span>
              </div>
              <p className="text-xs text-slate-400">Zone {record.zone}</p>
            </div>
          </div>
          <div>{getStatusBadge(record.status)}</div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-4 text-xs">
          <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/50">
            <Layers className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Quantity</span>
              <span className={isLowStock ? 'text-amber-400 font-bold text-sm' : 'text-slate-100 font-semibold text-sm'}>
                {record.quantity} units {isLowStock && <span className="text-[10px] text-amber-400 font-normal">(Low)</span>}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/50">
            <DollarSign className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Price</span>
              <span className="font-semibold text-emerald-300 text-sm">${record.price}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/50">
            <Scale className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Weight</span>
              <span className="font-semibold text-slate-200">{record.weight} KGs</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/50">
            <Ruler className="w-4 h-4 text-indigo-400 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-semibold">Height</span>
              <span className="font-semibold text-slate-200">{record.height} m</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Cut Date: <strong className="text-slate-300">{record.cutDate}</strong></span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Zone: {record.zone}</span>
        </div>
      </div>
    </div>
  );
}

export function RecordTable({ records }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 shadow-lg">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-950/90 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
          <tr>
            <th className="px-4 py-3.5 font-bold">Zone</th>
            <th className="px-4 py-3.5 font-bold">Timber ID</th>
            <th className="px-4 py-3.5 font-bold">Kind</th>
            <th className="px-4 py-3.5 font-bold">Weight (KGs)</th>
            <th className="px-4 py-3.5 font-bold">Status</th>
            <th className="px-4 py-3.5 font-bold">Height (m)</th>
            <th className="px-4 py-3.5 font-bold">Quantity</th>
            <th className="px-4 py-3.5 font-bold">Price ($)</th>
            <th className="px-4 py-3.5 font-bold">Cut Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {records.map((r) => {
            const isLowStock = r.quantity < 100;
            return (
              <tr key={r.timberID} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3 font-semibold text-amber-400">
                  <span className="w-6 h-6 rounded bg-amber-950/60 border border-amber-700/40 inline-flex items-center justify-center">
                    {r.zone}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono font-bold text-slate-200">#{r.timberID}</td>
                <td className="px-4 py-3 font-medium text-slate-100">{r.kind}</td>
                <td className="px-4 py-3 text-slate-300">{r.weight}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                    r.status.toLowerCase().includes('instock')
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
                      : r.status.toLowerCase().includes('sold')
                      ? 'bg-rose-950/80 text-rose-300 border-rose-800/60'
                      : 'bg-amber-950/80 text-amber-300 border-amber-800/60'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-300">{r.height}</td>
                <td className="px-4 py-3 font-semibold">
                  <span className={isLowStock ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                    {r.quantity}
                  </span>
                  {isLowStock && <span className="ml-1 text-[10px] text-amber-400 font-normal">(Low)</span>}
                </td>
                <td className="px-4 py-3 text-emerald-400 font-semibold">${r.price}</td>
                <td className="px-4 py-3 text-slate-400 font-mono">{r.cutDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
