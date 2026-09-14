import React, { useState } from 'react';
import { Edit3, CheckCircle2, AlertCircle } from 'lucide-react';
import { RecordCard } from './RecordCard';

export function UpdateRecordView({ system, onUpdateRecord, records = [] }) {
  const [timberID, setTimberID] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStatus, setNewStatus] = useState('InStock');
  const [feedback, setFeedback] = useState(null);
  const [updatedRecord, setUpdatedRecord] = useState(null);

  const statusOptions = ['InStock', 'Sold', 'Reserved'];

  const handleIDSearch = (idVal) => {
    setTimberID(idVal);
    const rec = records.find(r => r.timberID === parseInt(idVal, 10));
    if (rec) {
      setNewQuantity(rec.quantity.toString());
      setNewPrice(rec.price.toString());
      setNewStatus(rec.status);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setFeedback(null);
    setUpdatedRecord(null);

    if (system.isEmpty()) {
      setFeedback({
        type: 'error',
        message: 'No records to update.',
      });
      return;
    }

    if (!timberID || newQuantity === '' || newPrice === '' || !newStatus) {
      setFeedback({
        type: 'error',
        message: 'Please fill in all fields (TimberID, New Quantity, New Price, New Status).',
      });
      return;
    }

    const res = onUpdateRecord(timberID, {
      newQuantity: parseInt(newQuantity, 10),
      newPrice: parseInt(newPrice, 10),
      newStatus: newStatus,
    });

    if (res.success) {
      setFeedback({
        type: 'success',
        message: res.message,
      });
      setUpdatedRecord(res.record);
    } else {
      setFeedback({
        type: 'error',
        message: res.message,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl text-blue-400">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">[7] Update Record</h2>
            <p className="text-xs text-slate-400">
              Modify quantity, price, and status for an existing timber inventory batch.
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

        <form onSubmit={handleUpdate} className="space-y-4 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
              Enter TimberID to update: <span className="text-blue-400">*</span>
            </label>
            <input
              type="number"
              value={timberID}
              onChange={(e) => handleIDSearch(e.target.value)}
              placeholder="e.g. 101"
              required
              min="1"
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
            />
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-4">
            <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Enter New Details:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  New Quantity: <span className="text-blue-400">*</span>
                </label>
                <input
                  type="number"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  placeholder="e.g. 200"
                  required
                  min="0"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  New Price ($): <span className="text-blue-400">*</span>
                </label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="e.g. 950"
                  required
                  min="0"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  New Status: <span className="text-blue-400">*</span>
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 outline-none transition-colors"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              Update Record
            </button>
          </div>
        </form>
      </div>

      {updatedRecord && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Updated record details:</span>
          </div>
          <div className="max-w-md">
            <RecordCard record={updatedRecord} />
          </div>
        </div>
      )}
    </div>
  );
}
