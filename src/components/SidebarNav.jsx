import React from 'react';
import { 
  PlusCircle, 
  MapPin, 
  Trees, 
  AlertTriangle, 
  ShoppingCart, 
  Trash2, 
  Edit3, 
  FileText, 
  Database, 
  LogOut,
  Warehouse
} from 'lucide-react';

export const MENU_ITEMS = [
  { id: 1, name: 'Add a new Timber Record', short: 'Add Record', icon: PlusCircle, color: 'text-amber-400', activeBg: 'bg-amber-500/10 border-amber-500/40 text-amber-300' },
  { id: 2, name: 'Display Records by Zone', short: 'By Zone', icon: MapPin, color: 'text-cyan-400', activeBg: 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300' },
  { id: 3, name: 'Display Record by Kind', short: 'By Kind', icon: Trees, color: 'text-emerald-400', activeBg: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' },
  { id: 4, name: 'Analysis of Records Level', short: 'Stock Analysis', icon: AlertTriangle, color: 'text-yellow-400', activeBg: 'bg-yellow-500/10 border-yellow-500/40 text-yellow-300' },
  { id: 5, name: 'Sales Update Report', short: 'Sales Update', icon: ShoppingCart, color: 'text-violet-400', activeBg: 'bg-violet-500/10 border-violet-500/40 text-violet-300' },
  { id: 6, name: 'Delete Record', short: 'Delete Record', icon: Trash2, color: 'text-rose-400', activeBg: 'bg-rose-500/10 border-rose-500/40 text-rose-300' },
  { id: 7, name: 'Update Record', short: 'Update Record', icon: Edit3, color: 'text-blue-400', activeBg: 'bg-blue-500/10 border-blue-500/40 text-blue-300' },
  { id: 8, name: 'Generate Inventory Report', short: 'Inventory Report', icon: FileText, color: 'text-amber-400', activeBg: 'bg-amber-500/10 border-amber-500/40 text-amber-300' },
  { id: 9, name: 'Backup & Restore Data', short: 'Backup & Restore', icon: Database, color: 'text-teal-400', activeBg: 'bg-teal-500/10 border-teal-500/40 text-teal-300' },
];

export function SidebarNav({ activeChoice, onSelectChoice, onExit, recordCount = 0 }) {
  return (
    <aside className="w-full lg:w-72 bg-slate-900/90 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
      <div>
        <div className="pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-600/30">
              <Warehouse className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-slate-100 tracking-tight leading-tight">
                TIMBER STORE
              </h1>
              <p className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                Inventory Control System
              </p>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800/80 flex items-center justify-between">
            <span>Inventory List</span>
            <span className="font-bold text-amber-400">{recordCount} records</span>
          </div>
        </div>

        <nav className="mt-5 space-y-1.5">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
            Main Operations
          </p>
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeChoice === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectChoice(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                  isActive
                    ? `${item.activeBg} font-bold shadow-md`
                    : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className={`w-5 font-mono text-[11px] ${isActive ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                  [{item.id}]
                </span>
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? item.color : 'text-slate-400'}`} />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 mt-6 border-t border-slate-800">
        <button
          onClick={onExit}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 border border-transparent hover:border-rose-900/50 transition-all cursor-pointer"
        >
          <span className="w-5 font-mono text-[11px] text-slate-400">[10]</span>
          <LogOut className="w-4 h-4 shrink-0" />
          <span>Exit Program</span>
        </button>
      </div>
    </aside>
  );
}
