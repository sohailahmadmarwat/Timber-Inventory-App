import React, { useState } from 'react';
import { Trash2, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';

export function DeleteRecordView({ system, onDeleteRecord, records = [] }) {
  const [timberID, setTimberID] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleDelete = (e) => {
    e.preventDefault();
    setFeedback(null);

    if (system.isEmpty()) {
      setFeedback({
        type: 'error',
        message: 'No records to delete.',
      });
      return;
    }

    if (!timberID) {
      setFeedback({
        type: 'error',
        message: 'Please enter a TimberID.',
      });
      return;
    }

    const res = onDeleteRecord(timberID);
    if (res.success) {
      setFeedback({
        type: 'success',
        message: res.message,
      });
      setTimberID('');
    } else {
      setFeedback({
        type: 'error',
        message: res.message,
      });
    }
  };

  const targetRecord = records.find(r => r.timberID === parseInt(timberID, 10));

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400">
            <Trash2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">[6] Delete Record</h2>
            <p className="text-xs text-slate-400">
              Unlink and permanently remove a timber batch node by Timber ID.
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

        <form onSubmit={handleDelete} className="space-y-4 pt-2 border-t border-slate-800">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
              Enter TimberID to delete: <span className="text-rose-400">*</span>
            </label>
            <input
              type="number"
              value={timberID}
              onChange={(e) => {
                setTimberID(e.target.value);
                setFeedback(null);
              }}
              placeholder="e.g. 101"
              required
              min="1"
              className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
            />
          </div>

          {targetRecord && (
            <div className="p-3.5 bg-rose-950/30 border border-rose-800/40 rounded-xl flex items-center gap-3 text-xs text-rose-300">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>
                Found: <strong>{targetRecord.kind}</strong> (Zone {targetRecord.zone}, {targetRecord.quantity} units, ${targetRecord.price})
              </span>
            </div>
          )}

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Delete Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
