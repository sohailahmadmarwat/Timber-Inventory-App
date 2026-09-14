import React, { useState } from 'react';
import { ShoppingCart, CheckCircle2, AlertCircle, DollarSign } from 'lucide-react';
import { RecordCard } from './RecordCard';

export function SalesUpdateView({ system, onSaleComplete, records = [] }) {
  const [timberID, setTimberID] = useState('');
  const [quantity, setQuantity] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [updatedRecord, setUpdatedRecord] = useState(null);

  const handleSale = (e) => {
    e.preventDefault();
    setFeedback(null);
    setUpdatedRecord(null);

    if (system.isEmpty()) {
      setFeedback({
        type: 'error',
        message: 'No records found.',
      });
      return;
    }

    if (!timberID || !quantity) {
      setFeedback({
        type: 'error',
        message: 'Please provide both Timber ID and quantity to sell.',
      });
      return;
    }

    const res = onSaleComplete(timberID, quantity);
    if (res.success) {
      setFeedback({
        type: 'success',
        message: res.message,
      });
      setUpdatedRecord(res.updatedRecord);
      setQuantity('');
    } else {
      setFeedback({
        type: 'error',
        message: res.message,
      });
    }
  };

  const selectedRecord = records.find(r => r.timberID === parseInt(timberID, 10));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-xl text-violet-400">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">[5] Sales Update Report</h2>
            <p className="text-xs text-slate-400">
              Deduct sold quantity and automatically mark timber status as "Sold" when out of stock.
            </p>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-4 mb-6 rounded-xl flex items-center gap-3 text-sm font-mono ${
              feedback.type === 'success'
                ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-300'
                : 'bg-rose-950/70 border border-rose-800 text-rose-300'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSale} className="space-y-4 pt-2 border-t border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Enter TimberID to sell: <span className="text-violet-400">*</span>
              </label>
              <input
                type="number"
                value={timberID}
                onChange={(e) => {
                  setTimberID(e.target.value);
                  setFeedback(null);
                  setUpdatedRecord(null);
                }}
                placeholder="e.g. 101"
                required
                min="1"
                className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
              />
              {selectedRecord && (
                <p className="mt-1.5 text-xs text-slate-400">
                  Current Stock: <strong className="text-amber-400">{selectedRecord.quantity}</strong> units | {selectedRecord.kind} (Zone {selectedRecord.zone})
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                Enter quantity to sell: <span className="text-violet-400">*</span>
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 25"
                required
                min="1"
                className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-lg shadow-lg shadow-violet-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <DollarSign className="w-4 h-4" />
              Process Sale
            </button>
          </div>
        </form>
      </div>

      {updatedRecord && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Updated record:</span>
          </div>
          <div className="max-w-md">
            <RecordCard record={updatedRecord} />
          </div>
        </div>
      )}
    </div>
  );
}
