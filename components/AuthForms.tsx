import React from 'react';
import { AppView } from '../types';
import { Mail, Lock, User, Users, Shield, Key, Fingerprint, LogIn, UserPlus, RefreshCw } from 'lucide-react';

interface AuthFormsProps {
  view: AppView;
  colors: { primary: string; secondary: string };
  onNavigate: (view: AppView) => void;
}

const AuthForms: React.FC<AuthFormsProps> = ({ view, colors, onNavigate }) => {
  const gradText = { 
    backgroundImage: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: colors.secondary 
  };
  
  const gradBg = { 
    backgroundImage: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)` 
  };

  const badgeIcon = () => {
    const props = { size: 32, style: { color: colors.primary } };
    switch(view) {
      case 'login': return <LogIn {...props} />;
      case 'register': return <UserPlus {...props} />;
      case 'forgot': return <RefreshCw {...props} />;
      case 'update': return <Lock {...props} />;
    }
  };

  const inputStyle = "w-full pl-12 pr-5 py-3.5 rounded-xl bg-slate-50 border border-transparent text-slate-900 text-sm font-medium placeholder-slate-400 hover:bg-white hover:border-slate-300 hover:shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 outline-none";
  const iconStyle = { position: 'absolute' as const, left: '16px', top: '50%', transform: 'translateY(-50%)', color: colors.primary, opacity: 0.6, pointerEvents: 'none' as const };

  const logo = (
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-sm border border-slate-50 bg-gradient-to-br from-slate-50 to-slate-100">
      <span className="text-3xl font-extrabold tracking-tighter" style={gradText}>SK</span>
    </div>
  );

  return (
    <div className="w-full max-w-[420px] relative mt-16 mb-8 mx-auto">
      {/* Floating Badge */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 z-30">
        {badgeIcon()}
      </div>

      <div className="bg-white rounded-[2rem] shadow-2xl shadow-indigo-900/10 border border-slate-100 relative z-10 overflow-visible">
        {/* Color Bar */}
        <div className="h-2 w-full rounded-t-[2rem]" style={gradBg}></div>

        <div className="p-8 pt-16">
          {view === 'login' && (
            <>
              <div className="text-center mb-8">
                {logo}
                <h2 className="text-2xl font-bold text-slate-800">¡Hola de nuevo!</h2>
                <p className="text-slate-400 text-sm mt-2">Ingresa tus credenciales para continuar.</p>
              </div>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Mail style={iconStyle} size={20} />
                  <input type="email" required className={inputStyle} placeholder="ejemplo@educacion.ec" />
                </div>
                <div className="relative">
                  <Lock style={iconStyle} size={20} />
                  <input type="password" required className={inputStyle} placeholder="••••••••" />
                </div>
                <div className="flex justify-end mt-2">
                  <button onClick={() => onNavigate('forgot')} className="text-xs font-semibold hover:opacity-80 transition-opacity" style={gradText}>
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <button type="submit" className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]" style={gradBg}>
                  Iniciar Sesión
                </button>
              </form>
              <p className="mt-8 text-center text-sm text-slate-400">
                ¿Nuevo aquí? <button onClick={() => onNavigate('register')} className="font-bold text-slate-700 hover:text-indigo-600 transition-colors">Crear cuenta</button>
              </p>
            </>
          )}

          {view === 'register' && (
            <>
              <div className="text-center mb-6">
                {logo}
                <h2 className="text-2xl font-bold text-slate-800">Únete a Sávika</h2>
                <p className="text-slate-400 text-sm mt-2">Asistente inteligente para educadores.</p>
              </div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User style={iconStyle} size={20} />
                    <input type="text" required className={inputStyle} placeholder="Nombre" />
                  </div>
                  <div className="relative">
                    <Users style={iconStyle} size={20} />
                    <input type="text" required className={inputStyle} placeholder="Apellido" />
                  </div>
                </div>
                <div className="relative">
                  <Mail style={iconStyle} size={20} />
                  <input type="email" required className={inputStyle} placeholder="Correo Electrónico" />
                </div>
                <div className="relative">
                  <Lock style={iconStyle} size={20} />
                  <input type="password" required className={inputStyle} placeholder="Contraseña" />
                </div>
                <div className="relative">
                  <Shield style={iconStyle} size={20} />
                  <input type="password" required className={inputStyle} placeholder="Confirma contraseña" />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]" style={gradBg}>
                  Crear Cuenta
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-slate-400">
                ¿Ya tienes cuenta? <button onClick={() => onNavigate('login')} className="font-bold text-slate-700 hover:text-indigo-600 transition-colors">Inicia sesión</button>
              </p>
            </>
          )}

          {view === 'forgot' && (
            <>
              <div className="text-center mb-8">
                {logo}
                <h2 className="text-2xl font-bold text-slate-800">Recuperar Acceso</h2>
                <p className="text-slate-400 text-sm mt-2">Te enviaremos un enlace de restablecimiento.</p>
              </div>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Mail style={iconStyle} size={20} />
                  <input type="email" required className={inputStyle} placeholder="Tu correo registrado" />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]" style={gradBg}>
                  Enviar Enlace
                </button>
              </form>
              <div className="mt-8 text-center">
                <button onClick={() => onNavigate('login')} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Volver al inicio</button>
              </div>
            </>
          )}

          {view === 'update' && (
            <>
              <div className="text-center mb-8">
                {logo}
                <h2 className="text-2xl font-bold text-slate-800">Nueva Contraseña</h2>
                <p className="text-slate-400 text-sm mt-2">Asegura tu cuenta con una clave robusta.</p>
              </div>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Key style={iconStyle} size={20} />
                  <input type="password" required className={inputStyle} placeholder="Nueva contraseña" />
                </div>
                <div className="relative">
                  <Fingerprint style={iconStyle} size={20} />
                  <input type="password" required className={inputStyle} placeholder="Confirma contraseña" />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]" style={gradBg}>
                  Actualizar Contraseña
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForms;