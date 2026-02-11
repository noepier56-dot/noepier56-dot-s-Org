
import React from 'react';
import { AppState, MainMode } from '../types';
import { 
  Download, 
  Settings, 
  Palette, 
  Layout, 
  Mail, 
  Zap, 
  Terminal,
  Database
} from 'lucide-react';

interface SidebarProps {
  state: AppState;
  updateState: (update: Partial<AppState>) => void;
  onExport: () => void;
  onConnect: () => void;
  onGenerateAI: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ state, updateState, onExport, onConnect, onGenerateAI }) => {
  return (
    <aside className="w-80 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col border-r border-slate-800 z-30 shadow-2xl h-full">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">S</div>
          <div>
            <h2 className="text-white font-bold text-lg leading-none">Sávika DevKit</h2>
            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Auth & Design Suite</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
        {/* Production Export */}
        <section>
          <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Zap size={14} /> Producción
          </h3>
          <button 
            onClick={onExport}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 group"
          >
            <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
            Exportar .html
          </button>
          <p className="text-[10px] text-slate-500 mt-2 text-center italic">Genera login_savika.html listo para usar.</p>
        </section>

        <hr className="border-slate-800" />

        {/* Navigation */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layout size={14} /> Entorno
          </h3>
          <div className="space-y-2">
            <button 
              onClick={() => updateState({ mainMode: 'app' })}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                state.mainMode === 'app' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <Settings size={18} /> App Login
            </button>
            <button 
              onClick={() => updateState({ mainMode: 'email' })}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                state.mainMode === 'email' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <Mail size={18} /> Email Templates
            </button>
          </div>
        </section>

        {/* Branding */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Palette size={14} /> Identidad Visual
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-medium text-slate-400 mb-1 uppercase">Primario</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={state.colors.primary}
                  onChange={(e) => updateState({ colors: { ...state.colors, primary: e.target.value }})}
                  className="h-9 w-9 rounded-lg cursor-pointer border-0 p-0 bg-transparent" 
                />
                <input 
                  type="text" 
                  value={state.colors.primary}
                  onChange={(e) => updateState({ colors: { ...state.colors, primary: e.target.value }})}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 text-xs text-white font-mono uppercase focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-medium text-slate-400 mb-1 uppercase">Secundario</label>
              <div className="flex gap-2">
                <input 
                  type="color" 
                  value={state.colors.secondary}
                  onChange={(e) => updateState({ colors: { ...state.colors, secondary: e.target.value }})}
                  className="h-9 w-9 rounded-lg cursor-pointer border-0 p-0 bg-transparent" 
                />
                <input 
                  type="text" 
                  value={state.colors.secondary}
                  onChange={(e) => updateState({ colors: { ...state.colors, secondary: e.target.value }})}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 text-xs text-white font-mono uppercase focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                />
              </div>
            </div>
            <button 
              onClick={onGenerateAI}
              className="w-full py-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-[10px] font-bold border border-indigo-500/30 transition-all flex items-center justify-center gap-2"
            >
              ✨ Sugerencia con IA
            </button>
          </div>
        </section>

        {/* Supabase */}
        <section>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Database size={14} /> Backend (Supabase)
          </h3>
          <div className="space-y-3">
            <input 
              type="text" 
              placeholder="Project URL"
              value={state.supabase.url}
              onChange={(e) => updateState({ supabase: { ...state.supabase, url: e.target.value }})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-[10px] text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500" 
            />
            <input 
              type="password" 
              placeholder="Anon Key" 
              value={state.supabase.key}
              onChange={(e) => updateState({ supabase: { ...state.supabase, key: e.target.value }})}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-[10px] text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500" 
            />
            <button 
              onClick={onConnect}
              className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Probar Conexión
            </button>
            {state.supabase.isConnected && (
              <div className="text-[10px] text-emerald-400 flex items-center gap-2 justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Conectado a Supabase
              </div>
            )}
          </div>
        </section>
      </div>
      
      {/* Console Log */}
      <div className="p-4 bg-black/40 border-t border-slate-800">
        <h4 className="text-[10px] font-bold text-slate-500 mb-2 flex items-center gap-2">
          <Terminal size={12} /> Consola del Sistema
        </h4>
        <div className="font-mono text-[9px] h-32 overflow-y-auto space-y-1 text-slate-400 leading-relaxed scrollbar-hide">
          {state.logs.map(log => (
            <div key={log.id} className={
              log.type === 'error' ? 'text-red-400' : 
              log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'
            }>
              <span className="opacity-50">[{log.timestamp.split('T')[1].split('.')[0]}]</span> {log.message}
            </div>
          ))}
          {state.logs.length === 0 && <div className="italic opacity-30">Esperando eventos...</div>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
