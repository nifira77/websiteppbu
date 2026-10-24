import React, { useState, useRef, useEffect } from 'react';
import { usePesantren } from '../context/PesantrenContext';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  User,
  Bot
} from 'lucide-react';

export const LiveChatWidget: React.FC = () => {
  const { data, sendChatMessage } = usePesantren();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [data.chatMessages, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const name = visitorName.trim() || 'Pengunjung Website';
    sendChatMessage(inputText.trim(), 'pengunjung', name);
    setInputText('');
  };

  const handleQuickQuestion = (question: string) => {
    const name = visitorName.trim() || 'Pengunjung Website';
    sendChatMessage(question, 'pengunjung', name);
  };

  const quickOptions = [
    'Syarat & Berkas Pendaftaran PSB 2026',
    'Rincian Biaya Pendaftaran & Bulanan',
    'Jadwal Ujian Masuk & Seleksi',
    'Aturan Sambang / Kunjungan Orang Tua'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-amber-400 cursor-pointer"
          aria-label="Buka Live Chat Layanan Santri"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-emerald-900"></span>
          </div>
          <span className="text-sm font-semibold pr-1 hidden sm:inline">
            Tanya Pengurus Pesantren
          </span>
          <span className="sm:hidden text-xs font-semibold">Chat</span>
        </button>
      )}

      {/* Live Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-900 text-white p-4 flex items-center justify-between border-b border-emerald-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 border border-amber-400/40 flex items-center justify-center text-amber-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-serif-islamic text-white">
                  Layanan Sekretariat Ponpes
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Pengurus Online & Siap Membantu</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 cursor-pointer"
              aria-label="Tutup live chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Visitor Name Banner (Optional) */}
          {!isNameSet && (
            <div className="bg-emerald-50 px-4 py-2 border-b border-emerald-100 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-900">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span>Nama Anda:</span>
              </div>
              <input
                type="text"
                placeholder="Ketik nama Anda (opsional)"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                onBlur={() => visitorName.trim() && setIsNameSet(true)}
                className="px-2 py-1 text-xs rounded border border-emerald-200 bg-white text-slate-800 focus:outline-hidden"
              />
            </div>
          )}

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/70">
            {data.chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'pengunjung' ? 'items-end' : 'items-start'
                }`}
              >
                {msg.senderName && (
                  <span className="text-[10px] text-slate-400 mb-1 px-1">
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'pengunjung'
                      ? 'bg-emerald-800 text-white rounded-br-none'
                      : msg.sender === 'admin'
                      ? 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                      : 'bg-amber-50 text-amber-900 border border-amber-200 rounded-xl text-center mx-auto text-[11px]'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      msg.sender === 'pengunjung' ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Prompt Options */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1.5 px-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Pertanyaan Cepat:</span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              {quickOptions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(q)}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 transition-colors text-left cursor-pointer border border-slate-200"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tulis pesan atau pertanyaan Anda..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-700 bg-slate-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Kirim pesan"
            >
              <Send className="w-4 h-4 text-amber-300" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
