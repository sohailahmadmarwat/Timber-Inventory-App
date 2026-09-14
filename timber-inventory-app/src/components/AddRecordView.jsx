import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export function AddRecordView({ onAddRecord, existingRecords = [] }) {
  const [formData, setFormData] = useState({
    zone: 'A',
    timberID: '',
    kind: '',
    weight: '',
    status: 'InStock',
    height: '',
    quantity: '',
    price: '',
    cutDate: new Date().toLocaleDateString('en-GB'),
  });

  const [message, setMessage] = useState(null);
  const [addAnotherPrompt, setAddAnotherPrompt] = useState(false);

  const predefinedZones = ['A', 'B', 'C', 'D'];
  const commonKinds = ['Cheener', 'Deodar', 'Teak', 'Pine', 'Oak', 'Walnut', 'Cedar', 'Mahogany'];
  const statusOptions = ['InStock', 'Sold', 'Reserved'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.zone || !formData.timberID || !formData.kind || !formData.weight || !formData.height || !formData.quantity || !formData.price || !formData.cutDate) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    const tid = parseInt(formData.timberID, 10);
    if (isNaN(tid) || tid <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid Timber ID.' });
      return;
    }

    if (existingRecords.some(r => r.timberID === tid)) {
      setMessage({ type: 'error', text: `Timber ID #${tid} already exists. Please choose a unique ID.` });
      return;
    }

    const newRecord = onAddRecord({
      zone: formData.zone.charAt(0).toUpperCase(),
      timberID: tid,
      kind: formData.kind,
      weight: parseFloat(formData.weight),
      status: formData.status,
      height: parseFloat(formData.height),
      quantity: parseInt(formData.quantity, 10),
      price: parseInt(formData.price, 10),
      cutDate: formData.cutDate,
    });

    setMessage({
      type: 'success',
      text: `Timber record #${formData.timberID} (${formData.kind}) added successfully!`,
    });
    setAddAnotherPrompt(true);
  };

  const handleResetForNext = () => {
    setFormData({
      zone: formData.zone,
      timberID: '',
      kind: '',
      weight: '',
      status: 'InStock',
      height: '',
      quantity: '',
      price: '',
      cutDate: new Date().toLocaleDateString('en-GB'),
    });
    setAddAnotherPrompt(false);
    setMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">[1] Add a New Timber Record</h2>
            <p className="text-xs text-slate-400">
              Enter the timber details to insert into the inventory linked list.
            </p>
          </div>
        </div>

        {message && (
          <div
            className={`mt-4 p-4 rounded-xl flex items-center gap-3 text-sm ${
              message.type === 'success'
                ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-300'
                : 'bg-rose-950/70 border border-rose-800 text-rose-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {addAnotherPrompt ? (
          <div className="mt-6 p-5 bg-slate-950 border border-amber-500/40 rounded-xl space-y-4">
            <p className="text-sm font-semibold text-amber-300">
              Do you want to add another record? (y/n)
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleResetForNext}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Yes, Add Another Record (y)
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Zone (A/B/C/D) <span className="text-amber-400">*</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {predefinedZones.map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, zone: z }))}
                      className={`py-2 rounded-lg text-sm font-bold border transition-all cursor-pointer ${
                        formData.zone === z
                          ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      Zone {z}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Timber ID <span className="text-amber-400">*</span>
                </label>
                <input
                  type="number"
                  name="timberID"
                  value={formData.timberID}
                  onChange={handleChange}
                  placeholder="e.g. 101"
                  required
                  min="1"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Kind (Cheener, Deodar...etc) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  name="kind"
                  list="common-kinds"
                  value={formData.kind}
                  onChange={handleChange}
                  placeholder="e.g. Cheener / Deodar"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                />
                <datalist id="common-kinds">
                  {commonKinds.map((k) => (
                    <option key={k} value={k} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Weight (in KGs) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="e.g. 450.5"
                  required
                  min="0"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Status (InStock/Sold/Reserved) <span className="text-amber-400">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 outline-none transition-colors"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Height (in meters) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="e.g. 12.5"
                  required
                  min="0"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Quantity <span className="text-amber-400">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 150"
                  required
                  min="0"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Price (in $) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 850"
                  required
                  min="0"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Cut Date (D/M/Y) <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  name="cutDate"
                  value={formData.cutDate}
                  onChange={handleChange}
                  placeholder="e.g. 14/09/2026"
                  required
                  className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Add Record to Inventory
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
