import React, { useState, useEffect, useMemo } from 'react';
import { 
  AppState, 
  AppView, 
  EmailView, 
  LogEntry 
} from './types';
import Sidebar from './components/Sidebar';
import AuthForms from './components/AuthForms';
import EmailTemplates, { generateEmailHTML } from './components/EmailTemplates';
import { Eye, Code, CheckCircle, Info, Copy } from 'lucide-react';

// --- Code Generation for Auth Views ---
const generateAuthHTML = (view: AppView, colors: { primary: string; secondary: string }) => {
  const { primary, secondary } = colors;
  
  // CSS styles for inline usage to match the visual preview exactly
  const gradText = `background: linear-gradient(135deg, ${primary} 0%, ${secondary} 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; color: ${secondary};`;
  const gradBg = `background: linear-gradient(90deg, ${primary} 0%, ${secondary} 100%);`;
  const iconStyle = `position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: ${primary}; opacity: 0.6; pointer-events: none;`;
  const inputClass = "w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 border border-transparent text-slate-900 text-sm font-medium placeholder-slate-400 hover:bg-white hover:border-slate-300 hover:shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 outline-none";

  const getIconName = (v: AppView) => {
    switch(v) {
      case 'login': return 'log-in';
      case 'register': return 'user-plus';
      case 'forgot': return 'refresh-cw';
      case 'update': return 'key';
      default: return 'circle';
    }
  };

  // Improved Logo HTML with Solid Frame
  const logoHTML = `
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 shadow-xl border-4 border-white bg-white relative group overflow-hidden">
                    <!-- Strong colored frame -->
                    <div class="absolute inset-0 rounded-xl border-[3px]" style="border-color: ${primary}; background-color: ${primary}08;"></div>
                    <span class="text-4xl font-extrabold tracking-tighter relative z-10" style="${gradText}">SK</span>
                </div>
                <h2 class="text-2xl font-bold text-slate-800">{{TITLE}}</h2>
                <p class="text-slate-400 text-sm mt-2">{{SUBTITLE}}</p>
            </div>`;

  let innerContent = '';

  if (view === 'login') {
    innerContent = `
            ${logoHTML.replace('{{TITLE}}', '¡Hola de nuevo!').replace('{{SUBTITLE}}', 'Ingresa tus credenciales para continuar.')}
            <form class="space-y-5">
                <div class="relative group">
                    <i data-lucide="mail" width="20" height="20" style="${iconStyle}"></i>
                    <input type="email" required class="${inputClass}" placeholder="ejemplo@educacion.ec" />
                </div>
                <div class="relative group">
                    <i data-lucide="lock" width="20" height="20" style="${iconStyle}"></i>
                    <input type="password" required class="${inputClass}" placeholder="••••••••" />
                </div>
                <div class="flex justify-end mt-2">
                    <button type="button" class="text-xs font-semibold hover:opacity-80 transition-opacity" style="${gradText}">
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
                <button type="submit" class="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-indigo-500/25" style="${gradBg}">
                    Iniciar Sesión
                </button>
            </form>
            <p class="mt-8 text-center text-sm text-slate-400">
                ¿Nuevo aquí? <button class="font-bold text-slate-700 hover:text-indigo-600 transition-colors">Crear cuenta</button>
            </p>`;
  } else if (view === 'register') {
    innerContent = `
            ${logoHTML.replace('{{TITLE}}', 'Únete a Sávika').replace('{{SUBTITLE}}', 'Asistente inteligente para educadores.')}
            <form class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div class="relative group">
                    <i data-lucide="user" width="20" height="20" style="${iconStyle}"></i>
                    <input type="text" required class="${inputClass}" placeholder="Nombre" />
                  </div>
                  <div class="relative group">
                    <i data-lucide="users" width="20" height="20" style="${iconStyle}"></i>
                    <input type="text" required class="${inputClass}" placeholder="Apellido" />
                  </div>
                </div>
                <div class="relative group">
                  <i data-lucide="mail" width="20" height="20" style="${iconStyle}"></i>
                  <input type="email" required class="${inputClass}" placeholder="Correo Electrónico" />
                </div>
                <div class="relative group">
                  <i data-lucide="lock" width="20" height="20" style="${iconStyle}"></i>
                  <input type="password" required class="${inputClass}" placeholder="Contraseña" />
                </div>
                <div class="relative group">
                  <i data-lucide="shield" width="20" height="20" style="${iconStyle}"></i>
                  <input type="password" required class="${inputClass}" placeholder="Confirma contraseña" />
                </div>
                <button type="submit" class="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-indigo-500/25" style="${gradBg}">
                  Crear Cuenta
                </button>
            </form>
            <p class="mt-6 text-center text-sm text-slate-400">
                ¿Ya tienes cuenta? <button class="font-bold text-slate-700 hover:text-indigo-600 transition-colors">Inicia sesión</button>
            </p>`;
  } else if (view === 'forgot') {
    innerContent = `
            ${logoHTML.replace('{{TITLE}}', 'Recuperar Acceso').replace('{{SUBTITLE}}', 'Te enviaremos un enlace de restablecimiento.')}
            <form class="space-y-5">
                <div class="relative group">
                  <i data-lucide="mail" width="20" height="20" style="${iconStyle}"></i>
                  <input type="email" required class="${inputClass}" placeholder="Tu correo registrado" />
                </div>
                <button type="submit" class="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-indigo-500/25" style="${gradBg}">
                  Enviar Enlace
                </button>
            </form>
            <div class="mt-8 text-center">
                <button class="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Volver al inicio</button>
            </div>`;
  } else if (view === 'update') {
    innerContent = `
            ${logoHTML.replace('{{TITLE}}', 'Nueva Contraseña').replace('{{SUBTITLE}}', 'Asegura tu cuenta con una clave robusta.')}
            <form class="space-y-5">
                <div class="relative group">
                  <i data-lucide="key" width="20" height="20" style="${iconStyle}"></i>
                  <input type="password" required class="${inputClass}" placeholder="Nueva contraseña" />
                </div>
                <div class="relative group">
                  <i data-lucide="fingerprint" width="20" height="20" style="${iconStyle}"></i>
                  <input type="password" required class="${inputClass}" placeholder="Confirma contraseña" />
                </div>
                <button type="submit" class="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] hover:shadow-indigo-500/25" style="${gradBg}">
                  Actualizar Contraseña
                </button>
            </form>`;
  }

  return `<div class="auth-container">
  <div class="w-full max-w-[420px] relative mx-auto mt-16 mb-8 animate-enter">
      <!-- Floating Badge -->
      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-30 transition-transform hover:scale-110 duration-300">
          <i data-lucide="${getIconName(view)}" width="32" height="32" style="color: ${primary}"></i>
      </div>

      <div class="bg-white rounded-[2rem] shadow-2xl shadow-indigo-900/10 border border-slate-100 relative z-10 overflow-visible">
          <!-- Color Bar -->
          <div class="h-2 w-full rounded-t-[2rem]" style="${gradBg}"></div>

          <div class="p-8 pt-16">
  ${innerContent}
          </div>
      </div>
  </div>
</div>`;
};

// --- Code Formatting Utility ---
const formatCode = (html: string) => {
  let formatted = '';
  let indentLevel = 0;
  
  // Remove existing whitespace between tags to start clean
  const clean = html.replace(/>\s+</g, '><').trim();
  
  // Split by tags but keep delimiters
  const tokens = clean.split(/(<[^>]+>)/g).filter(Boolean);
  
  const voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', '!DOCTYPE', 'i'];

  tokens.forEach((token) => {
    // 1. Closing tag: </tag>
    if (token.match(/^<\//)) {
      indentLevel = Math.max(0, indentLevel - 1);
      formatted += '  '.repeat(indentLevel) + token + '\n';
    } 
    // 2. Opening Tag: <tag> (but check if it's void or self-closing)
    else if (token.match(/^<.+>$/) && !token.startsWith('<!--')) {
      formatted += '  '.repeat(indentLevel) + token + '\n';
      
      const tagName = token.match(/^<([a-zA-Z0-9-]+)/)?.[1];
      const isVoid = tagName && voidTags.includes(tagName);
      const isSelfClosing = token.includes('/>');
      
      if (!isVoid && !isSelfClosing && !token.startsWith('<!')) {
        indentLevel++;
      }
    } 
    // 3. Comments or Text Content
    else {
      const trimmed = token.trim();
      if (trimmed) {
        formatted += '  '.repeat(indentLevel) + trimmed + '\n';
      }
    }
  });
  
  return formatted.trim();
};

// --- Lexer-based Syntax Highlighter ---
const CodeHighlighter = ({ code }: { code: string }) => {
  // We tokenize the string into typed segments to avoid nested HTML replace issues
  const lines = useMemo(() => code.split('\n'), [code]);

  return (
    <div className="font-mono text-[13px] leading-6" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
      {lines.map((line, i) => (
        <div key={i} className="table-row group">
          <span className="table-cell text-right pr-4 text-[#6e7681] select-none w-10 border-r border-[#30363d] mr-4 opacity-50 group-hover:opacity-100 group-hover:text-[#c9d1d9] transition-opacity">{i + 1}</span>
          <span className="table-cell whitespace-pre pl-4"><LineTokenizer line={line} /></span>
        </div>
      ))}
    </div>
  );
};

const LineTokenizer = ({ line }: { line: string }) => {
  // Regex to split line into significant tokens
  // Captures: 
  // 1. Comment <!-- ... -->
  // 2. Template Var {{ ... }}
  // 3. Tag Open < or </
  // 4. Tag Close > or />
  // 5. String "..."
  // 6. Equals =
  // 7. Whitespace
  // 8. Brand Keywords (Sávika, Savika, SK)
  // 9. Word (tag name, attr name, text)
  const regex = /(<!--[\s\S]*?-->)|(\{\{[\s\S]*?\}\})|(<\/?)|(\/?>)|(".*?")|(=)|(\s+)|(Sávika|Savika|SK)|([^<\s=>"{}]+)/g;
  
  const tokens = [];
  let match;
  
  // State machine context
  let inTag = false;

  while ((match = regex.exec(line)) !== null) {
    const [full, comment, templateVar, tagOpen, tagClose, string, equals, space, brand, word] = match;
    
    if (comment) {
      tokens.push(<span key={match.index} className="text-[#6a9955] italic">{comment}</span>);
    } else if (templateVar) {
      // Highlight Supabase/Go template variables in a distinct color (VS Code pink/purple for control flow)
      tokens.push(<span key={match.index} className="text-[#c586c0] font-bold">{templateVar}</span>);
    } else if (tagOpen) {
      inTag = true;
      tokens.push(<span key={match.index} className="text-[#808080]">{tagOpen}</span>);
    } else if (tagClose) {
      inTag = false;
      tokens.push(<span key={match.index} className="text-[#808080]">{tagClose}</span>);
    } else if (string) {
      tokens.push(<span key={match.index} className="text-[#ce9178]">{string}</span>);
    } else if (equals) {
      tokens.push(<span key={match.index} className="text-[#d4d4d4]">=</span>);
    } else if (space) {
      tokens.push(<span key={match.index}>{space}</span>);
    } else if (brand) {
        // Highlight brand keywords
        tokens.push(<span key={match.index} className="text-[#ffd700] font-bold underline decoration-wavy decoration-[#ffd700]/30">{brand}</span>);
    } else if (word) {
      // Determine color based on context
      let color = "text-[#d4d4d4]"; // Default text
      
      if (inTag) {
        // Simple heuristic: if previous token was < or </, this is a TAG NAME
        // We look at the tokens array we are building. 
        // We need to skip spaces in the check.
        let lastSignificant = null;
        for (let i = tokens.length - 1; i >= 0; i--) {
           // @ts-ignore
           if (tokens[i].props.children !== ' ') {
              lastSignificant = tokens[i];
              break;
           }
        }
        
        // @ts-ignore
        const lastContent = lastSignificant?.props?.children;

        if (lastContent === '<' || lastContent === '</') {
          color = "text-[#569cd6]"; // Tag Name Blue
        } else {
          color = "text-[#9cdcfe]"; // Attribute Name Light Blue
        }
      }
      
      tokens.push(<span key={match.index} className={color}>{word}</span>);
    }
  }

  return <>{tokens}</>;
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    mainMode: 'app',
    appView: 'login',
    emailView: 'confirm',
    displayMode: 'preview',
    colors: {
      primary: '#a855f7',
      secondary: '#3b82f6',
    },
    supabase: {
      url: '',
      key: '',
      isConnected: false,
    },
    logs: []
  });

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      message,
      type
    };
    setState(prev => ({ ...prev, logs: [newLog, ...prev.logs].slice(0, 20) }));
  };

  const updateState = (update: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...update }));
  };

  const handleConnect = () => {
    if (!state.supabase.url || !state.supabase.key) {
      addLog("Faltan credenciales de Supabase", "error");
      return;
    }
    addLog("Conectando con Supabase...", "info");
    setTimeout(() => {
      addLog("Conexión exitosa con el backend", "success");
      updateState({ supabase: { ...state.supabase, isConnected: true } });
    }, 1000);
  };

  const handleExport = () => {
    addLog("Compilando sistema completo para producción...", "info");
    
    const { primary, secondary } = state.colors;

    const exportContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sávika IA - Autenticación</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: ${primary};
            --secondary: ${secondary};
            --grad: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
        }
        body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-color: #f8fafc;
        }
        .grad-text {
            background: var(--grad);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .grad-bg {
            background: var(--grad);
        }
        .auth-view { display: none; }
        .auth-view.active { display: block; animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px) scale(0.98); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        .input-icon { color: var(--primary); opacity: 0.6; pointer-events: none; }
        .glass-panel {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-6 py-20 bg-slate-50 relative overflow-x-hidden">
    <!-- Background Decor -->
    <div class="fixed inset-0 pointer-events-none opacity-40 -z-10">
        <div class="absolute -top-20 -right-20 w-[600px] h-[600px] bg-purple-200/50 rounded-full blur-[120px] animate-[fadeIn_2s_ease-out]"></div>
        <div class="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-blue-200/50 rounded-full blur-[120px] animate-[fadeIn_2s_ease-out_0.5s_backwards]"></div>
    </div>

    <div class="w-full max-w-[420px] relative mt-16 mb-8">
        
        <!-- LOGIN VIEW -->
        <div id="view-login" class="auth-view active">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-xl border border-slate-100 z-30 transition-transform hover:scale-110 duration-300">
                <i data-lucide="log-in" class="w-8 h-8" style="color: var(--primary)"></i>
            </div>
            <div class="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden relative z-10 glass-panel">
                <div class="h-2 w-full grad-bg"></div>
                <div class="p-8 pt-16">
                    <div class="text-center mb-8">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 bg-white border-4 border-white shadow-xl relative overflow-hidden">
                            <!-- Strong colored frame (matches email template) -->
                            <div class="absolute inset-0 border-[3px] rounded-xl" style="border-color: var(--primary); background-color: ${primary}08;"></div>
                            <span class="font-extrabold text-4xl grad-text relative z-10">SK</span>
                        </div>
                        <h2 class="text-2xl font-bold text-slate-800">¡Hola de nuevo!</h2>
                        <p class="text-slate-400 text-sm mt-2">Ingresa tus credenciales para continuar.</p>
                    </div>
                    <form onsubmit="event.preventDefault(); alert('Lógica de login conectada');" class="space-y-5">
                        <div class="relative group">
                            <i data-lucide="mail" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 input-icon group-hover:opacity-100 transition-opacity"></i>
                            <input type="email" placeholder="ejemplo@educacion.ec" required class="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 transition-all outline-none">
                        </div>
                        <div class="relative group">
                            <i data-lucide="lock" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 input-icon group-hover:opacity-100 transition-opacity"></i>
                            <input type="password" placeholder="••••••••" required class="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 transition-all outline-none">
                        </div>
                        <div class="flex justify-end">
                            <button type="button" onclick="showView('forgot')" class="text-xs font-bold grad-text hover:opacity-80">¿Olvidaste tu contraseña?</button>
                        </div>
                        <button type="submit" class="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl transition-all grad-bg hover:scale-[1.02] hover:shadow-indigo-500/25">Iniciar Sesión</button>
                    </form>
                    <p class="mt-8 text-center text-sm text-slate-400">¿Nuevo aquí? <button onclick="showView('register')" class="font-bold text-slate-700 hover:text-indigo-600">Crear cuenta</button></p>
                </div>
            </div>
        </div>

        <!-- REGISTER VIEW -->
        <div id="view-register" class="auth-view">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-xl border border-slate-100 z-30 transition-transform hover:scale-110 duration-300">
                <i data-lucide="user-plus" class="w-8 h-8" style="color: var(--primary)"></i>
            </div>
            <div class="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden relative z-10 glass-panel">
                <div class="h-2 w-full grad-bg"></div>
                <div class="p-8 pt-16">
                    <div class="text-center mb-6">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 bg-white border-4 border-white shadow-xl relative overflow-hidden">
                            <!-- Strong colored frame -->
                            <div class="absolute inset-0 border-[3px] rounded-xl" style="border-color: var(--primary); background-color: ${primary}08;"></div>
                            <span class="font-extrabold text-4xl grad-text relative z-10">SK</span>
                        </div>
                        <h2 class="text-2xl font-bold text-slate-800">Únete a Sávika</h2>
                        <p class="text-slate-400 text-sm mt-2">Asistente inteligente para educadores.</p>
                    </div>
                    <form onsubmit="event.preventDefault();" class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="relative group">
                                <i data-lucide="user" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 input-icon group-hover:opacity-100 transition-opacity"></i>
                                <input type="text" placeholder="Nombre" class="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 outline-none text-sm">
                            </div>
                            <div class="relative group">
                                <i data-lucide="users" class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 input-icon group-hover:opacity-100 transition-opacity"></i>
                                <input type="text" placeholder="Apellido" class="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 outline-none text-sm">
                            </div>
                        </div>
                        <div class="relative group">
                            <i data-lucide="mail" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 input-icon group-hover:opacity-100 transition-opacity"></i>
                            <input type="email" placeholder="Correo Electrónico" class="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 outline-none">
                        </div>
                        <div class="relative group">
                            <i data-lucide="lock" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 input-icon group-hover:opacity-100 transition-opacity"></i>
                            <input type="password" placeholder="Contraseña" class="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 outline-none">
                        </div>
                        <div class="relative group">
                            <i data-lucide="shield" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 input-icon group-hover:opacity-100 transition-opacity"></i>
                            <input type="password" placeholder="Confirmar" class="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 outline-none">
                        </div>
                        <button type="submit" class="w-full py-4 rounded-xl text-white font-bold text-sm grad-bg shadow-lg hover:scale-[1.02] hover:shadow-indigo-500/25 transition-all">Crear Cuenta</button>
                    </form>
                    <p class="mt-6 text-center text-sm text-slate-400">¿Ya tienes cuenta? <button onclick="showView('login')" class="font-bold text-slate-700 hover:text-indigo-600">Inicia sesión</button></p>
                </div>
            </div>
        </div>

        <!-- FORGOT VIEW -->
        <div id="view-forgot" class="auth-view">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-xl border border-slate-100 z-30 transition-transform hover:scale-110 duration-300">
                <i data-lucide="refresh-cw" class="w-8 h-8" style="color: var(--primary)"></i>
            </div>
            <div class="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden relative z-10 glass-panel">
                <div class="h-2 w-full grad-bg"></div>
                <div class="p-8 pt-16">
                    <div class="text-center mb-8">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 bg-white border-4 border-white shadow-xl relative overflow-hidden">
                            <!-- Strong colored frame -->
                            <div class="absolute inset-0 border-[3px] rounded-xl" style="border-color: var(--primary); background-color: ${primary}08;"></div>
                            <span class="font-extrabold text-4xl grad-text relative z-10">SK</span>
                        </div>
                        <h2 class="text-2xl font-bold text-slate-800">Recuperar Acceso</h2>
                        <p class="text-slate-400 text-sm mt-2">Enviaremos un enlace a tu correo.</p>
                    </div>
                    <form onsubmit="event.preventDefault();" class="space-y-6">
                        <div class="relative group">
                            <i data-lucide="mail" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 input-icon group-hover:opacity-100 transition-opacity"></i>
                            <input type="email" placeholder="Tu correo registrado" class="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-50 outline-none">
                        </div>
                        <button type="submit" class="w-full py-4 rounded-xl text-white font-bold text-sm grad-bg shadow-lg hover:scale-[1.02] hover:shadow-indigo-500/25 transition-all">Enviar Enlace</button>
                    </form>
                    <button onclick="showView('login')" class="w-full mt-6 text-center text-sm font-bold text-slate-400 hover:text-slate-600">Volver al inicio</button>
                </div>
            </div>
        </div>

        <!-- UPDATE VIEW -->
        <div id="view-update" class="auth-view">
            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-xl border border-slate-100 z-30 transition-transform hover:scale-110 duration-300">
                <i data-lucide="key" class="w-8 h-8" style="color: var(--primary)"></i>
            </div>
            <div class="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden relative z-10 glass-panel">
                <div class="h-2 w-full grad-bg"></div>
                <div class="p-8 pt-16">
                    <div class="text-center mb-8">
                        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-4 bg-white border-4 border-white shadow-xl relative overflow-hidden">
                            <!-- Strong colored frame -->
                            <div class="absolute inset-0 border-[3px] rounded-xl" style="border-color: var(--primary); background-color: ${primary}08;"></div>
                            <span class="font-extrabold text-4xl grad-text relative z-10">SK</span>
                        </div>
                        <h2 class="text-2xl font-bold text-slate-800">Nueva Contraseña</h2>
                        <p class="text-slate-400 text-sm mt-2">Define una clave segura.</p>
                    </div>
                    <form onsubmit="event.preventDefault();" class="space-y-5">
                        <div class="relative group">
                            <i data-lucide="key" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 input-icon group-hover:opacity-100 transition-opacity"></i>
                            <input type="password" placeholder="Nueva contraseña" class="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 outline-none">
                        </div>
                        <div class="relative group">
                            <i data-lucide="fingerprint" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 input-icon group-hover:opacity-100 transition-opacity"></i>
                            <input type="password" placeholder="Confirmar contraseña" class="w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 outline-none">
                        </div>
                        <button type="submit" class="w-full py-4 rounded-xl text-white font-bold text-sm grad-bg shadow-lg hover:scale-[1.02] hover:shadow-indigo-500/25 transition-all">Actualizar Contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        lucide.createIcons();
        function showView(viewId) {
            document.querySelectorAll('.auth-view').forEach(view => {
                view.classList.remove('active');
            });
            const target = document.getElementById('view-' + viewId);
            if (target) target.classList.add('active');
        }
    </script>
</body>
</html>`;
    
    const blob = new Blob([exportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'login_savika.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    addLog("Archivo login_savika.html descargado con éxito", "success");
  };

  const rawCode = state.mainMode === 'app' 
    ? generateAuthHTML(state.appView, state.colors)
    : generateEmailHTML(state.emailView, state.colors);
    
  // Format code on the fly
  const formattedCode = useMemo(() => formatCode(rawCode), [rawCode]);

  useEffect(() => {
    addLog("Sistema Sávika DevKit inicializado", "success");
  }, []);

  return (
    <div className="flex h-screen w-full bg-slate-100">
      <Sidebar 
        state={state} 
        updateState={updateState} 
        onExport={handleExport}
        onConnect={handleConnect}
      />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-purple-200/50 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-blue-200/50 rounded-full blur-[120px]"></div>
        </div>

        {/* Toolbar */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur px-6 flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-slate-200 overflow-x-auto scrollbar-hide">
            {state.mainMode === 'app' ? (
              (['login', 'register', 'forgot', 'update'] as AppView[]).map(v => (
                <button 
                  key={v}
                  onClick={() => updateState({ appView: v })}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    state.appView === v ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50'
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))
            ) : (
              (['confirm', 'reset', 'changed'] as EmailView[]).map(v => (
                <button 
                  key={v}
                  onClick={() => updateState({ emailView: v })}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    state.emailView === v ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50'
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))
            )}
          </div>
          
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => updateState({ displayMode: 'preview' })}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold flex items-center gap-2 transition-all ${
                state.displayMode === 'preview' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50'
              }`}
            >
              <Eye size={14} /> Vista
            </button>
            <button 
              onClick={() => updateState({ displayMode: 'code' })}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold flex items-center gap-2 transition-all ${
                state.displayMode === 'code' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-white/50'
              }`}
            >
              <Code size={14} /> Código
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden flex flex-col">
          {state.displayMode === 'preview' ? (
            <div className="w-full h-full overflow-y-auto">
              <div className="min-h-full w-full flex items-center justify-center p-8 py-20 animate-in fade-in zoom-in duration-300">
                {state.mainMode === 'app' ? (
                  <AuthForms 
                    view={state.appView} 
                    colors={state.colors} 
                    onNavigate={(v) => updateState({ appView: v })} 
                  />
                ) : (
                  <EmailTemplates view={state.emailView} colors={state.colors} />
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-[#1e1e1e] flex flex-col">
              {/* Editor Header */}
              <div className="bg-[#252526] px-4 py-3 border-b border-[#333] flex justify-between items-center text-[11px] font-medium text-gray-400 select-none">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle size={12} /> production_output.html
                    </span>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-500">utf-8</span>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-500">{formattedCode.split('\n').length} lines</span>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(formattedCode);
                    addLog("Código copiado al portapapeles", "success");
                  }}
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 px-3 py-1.5 rounded-md"
                >
                  <Copy size={12} /> Copiar
                </button>
              </div>
              {/* Code Viewer */}
              <div className="flex-1 overflow-auto p-6 bg-[#1e1e1e] custom-scrollbar">
                <CodeHighlighter code={formattedCode} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Info Badge */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-full px-4 py-2 shadow-xl flex items-center gap-2 text-[10px] font-bold text-slate-500">
          <Info size={12} className="text-indigo-500" />
          Powered by Sávika AI Engine v3.1
        </div>
      </div>
    </div>
  );
};

export default App;