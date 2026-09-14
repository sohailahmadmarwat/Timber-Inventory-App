import React, { useState, useRef } from 'react';
import { Database, Download, Upload, CheckCircle2, AlertCircle, FileText, Copy, Check, Sparkles } from 'lucide-react';

export function BackupRestoreView({ system, onRestoreData }) {
  const [activeTab, setActiveTab] = useState('backup');
  const [feedback, setFeedback] = useState(null);
  const [copied, setCopied] = useState(false);
  const [rawText, setRawText] = useState('');
  const fileInputRef = useRef(null);

  const handleBackup = () => {
    setFeedback(null);
    const res = system.backupData();
    if (!res.success) {
      setFeedback({ type: 'error', message: res.message });
      return;
    }

    const blob = new Blob([res.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = res.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setFeedback({
      type: 'success',
      message: res.message,
      content: res.content,
    });
  };

  const handleCopyContent = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const res = onRestoreData(content);
      if (res.success) {
        setFeedback({
          type: 'success',
          message: res.message,
          count: res.count,
        });
      } else {
        setFeedback({
          type: 'error',
          message: res.message,
        });
      }
    };
    reader.readAsText(file);
  };

  const handleManualRestore = () => {
    setFeedback(null);
    if (!rawText.trim()) {
      setFeedback({ type: 'error', message: 'No backup file found!' });
      return;
    }

    const res = onRestoreData(rawText);
    if (res.success) {
      setFeedback({
        type: 'success',
        message: res.message,
        count: res.count,
      });
      setRawText('');
    } else {
      setFeedback({
        type: 'error',
        message: res.message,
      });
    }
  };

  const loadSampleDataset = () => {
    const sampleCSV = `A,101,Cheener,450.5,InStock,12.5,140,850,12/08/2026
A,102,Deodar,520.0,InStock,15.0,75,1200,05/09/2026
B,201,Teak,600.2,InStock,10.2,220,1500,20/07/2026
B,202,Pine,320.0,InStock,8.5,45,450,10/09/2026
C,301,Walnut,780.0,Reserved,14.0,90,1900,18/06/2026
C,302,Deodar,480.0,InStock,11.0,160,1150,02/09/2026
D,401,Oak,650.0,InStock,13.5,30,1350,15/08/2026
D,402,Cheener,410.0,Sold,9.0,0,780,28/05/2026`;

    const res = onRestoreData(sampleCSV);
    setFeedback({
      type: 'success',
      message: res.message + ` (${res.count} records loaded)`,
      count: res.count,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">[9] Backup & Restore Data</h2>
              <p className="text-xs text-slate-400">
                Manage data persistence using the official <code className="text-amber-400 font-mono">timberdata.txt</code> format.
              </p>
            </div>
          </div>

          <button
            onClick={loadSampleDataset}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold rounded-lg border border-teal-800/60 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Load Sample Dataset
          </button>
        </div>

        <div className="flex gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => {
              setActiveTab('backup');
              setFeedback(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            [1] Backup Data
          </button>
          <button
            onClick={() => {
              setActiveTab('restore');
              setFeedback(null);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'restore'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            [2] Restore Data
          </button>
        </div>

        {feedback && (
          <div
            className={`my-5 p-4 rounded-xl flex items-center gap-3 text-sm font-mono ${
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

        {activeTab === 'backup' && (
          <div className="mt-6 space-y-5">
            <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-400" />
                Export to timberdata.txt
              </h3>
              <p className="text-xs text-slate-400">
                Exports all nodes currently in the linked list into comma-separated rows:
                <br />
                <code className="text-teal-300 font-mono text-[11px] block mt-1">
                  zone,timberID,kind,weight,status,height,quantity,price,cutDate
                </code>
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleBackup}
                  className="px-6 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Backup & Download timberdata.txt
                </button>
              </div>
            </div>

            {feedback?.content && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Exported File Preview (timberdata.txt):</span>
                  <button
                    onClick={() => handleCopyContent(feedback.content)}
                    className="flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 overflow-x-auto max-h-48">
                  {feedback.content}
                </pre>
              </div>
            )}
          </div>
        )}

        {activeTab === 'restore' && (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <Upload className="w-4 h-4 text-teal-400" />
                    Option A: Upload timberdata.txt File
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select a local backup text file from your computer.
                  </p>
                </div>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".txt,.csv"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 text-teal-400" />
                    Select & Restore timberdata.txt
                  </button>
                </div>
              </div>

              <div className="p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-400" />
                    Option B: Paste Backup Text
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Paste raw text content formatted as comma-separated rows.
                  </p>
                </div>

                <textarea
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="A,101,Cheener,450.5,InStock,12.5,140,850,12/08/2026..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-teal-500 rounded-lg p-2.5 text-xs text-slate-100 font-mono outline-none resize-none"
                />

                <button
                  type="button"
                  onClick={handleManualRestore}
                  className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Restore from Pasted Text
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
