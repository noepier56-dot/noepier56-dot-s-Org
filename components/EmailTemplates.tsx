
import React from 'react';
import { EmailView } from '../types';

interface EmailTemplatesProps {
  view: EmailView;
  colors: { primary: string; secondary: string };
}

export const generateEmailHTML = (view: EmailView, colors: { primary: string; secondary: string }) => {
  const p = colors.primary;
  const s = colors.secondary;
  
  // Design Tokens
  const grad = `linear-gradient(135deg, ${p} 0%, ${s} 100%)`;
  const bgHighlight = `${p}10`; 
  
  // Branding Highlight Logic
  const brandSpan = `<span style="color: ${p}; background-color: ${bgHighlight}; padding: 2px 6px; border-radius: 6px; font-weight: 700; border: 1px solid ${p}20;">Sávika IA</span>`;

  // Custom Icon Generator (To ensure strict palette adherence)
  const renderIcon = (char: string) => `
    <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 16px;">
      <tr>
        <td width="48" height="48" align="center" valign="middle" bgcolor="${p}" style="border-radius: 50%; background: ${grad}; color: #ffffff; font-size: 24px; font-weight: bold; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          ${char}
        </td>
      </tr>
    </table>
  `;

  let title = "";
  let preheader = "";
  let body = "";
  let btnText = "";
  let link = "";
  let iconHTML = "";

  if (view === 'confirm') {
    title = "Verifica tu Correo";
    preheader = "Confirma tu cuenta para acceder a Sávika IA";
    iconHTML = renderIcon("★"); // Star for welcome
    body = `
      <div style="font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 12px;">¡Bienvenido al futuro!</div>
      <div style="font-size: 15px; color: #64748b; line-height: 1.6;">
        Gracias por unirte a ${brandSpan}. Estamos listos para potenciar tus herramientas educativas. Para asegurar la seguridad de tu cuenta, por favor verifica que este es tu correo electrónico.
      </div>
    `;
    btnText = "Verificar Ahora";
    link = "{{ .ConfirmationURL }}";

  } else if (view === 'reset') {
    title = "Recuperar Acceso";
    preheader = "Instrucciones para restablecer tu contraseña";
    iconHTML = renderIcon("?"); // Question mark/Key concept
    body = `
      <div style="font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 12px;">¿Olvidaste tu clave?</div>
      <div style="font-size: 15px; color: #64748b; line-height: 1.6;">
        Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en ${brandSpan}. Si no fuiste tú, puedes ignorar este correo con seguridad.
      </div>
    `;
    btnText = "Restablecer Contraseña";
    link = "{{ .ConfirmationURL }}";

  } else if (view === 'changed') {
    title = "Contraseña Actualizada";
    preheader = "Tu cuenta está segura";
    iconHTML = renderIcon("✓"); // Checkmark for success
    body = `
      <div style="font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 12px;">Todo listo</div>
      <div style="font-size: 15px; color: #64748b; line-height: 1.6;">
        Te informamos que la contraseña de tu cuenta en ${brandSpan} ha sido modificada exitosamente. Ahora tienes acceso completo a todas las funcionalidades.
      </div>
    `;
    btnText = "Ir al Panel";
    link = "{{ .SiteURL }}";
  }

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>${title}</title>
  <style type="text/css">
    body { width: 100% !important; height: 100% !important; margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #f1f5f9; padding: 40px 0; }
    .main-table { background-color: #ffffff; margin: 0 auto; width: 100%; max-width: 500px; border-radius: 24px; box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08); overflow: hidden; border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
    
    /* Button styles with fallback */
    .btn { 
      background-color: ${p}; /* Fallback solid color */
      background: ${grad}; 
      border: 0; 
      padding: 16px 40px; 
      color: #ffffff; 
      text-decoration: none; 
      border-radius: 50px; 
      font-weight: 700; 
      font-size: 14px; 
      display: inline-block; 
      mso-padding-alt: 0; 
      text-align: center; 
      cursor: pointer; 
      box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
      letter-spacing: 0.5px; 
      transition: all 0.2s; 
    }
    .btn:hover { transform: scale(1.02); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
    .footer-link { color: #94a3b8; text-decoration: underline; font-size: 11px; }
    
    /* Animations */
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-content { animation: fadeIn 1s ease-out 0.3s backwards; }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main-table" align="center" border="0" cellpadding="0" cellspacing="0">
      
      <!-- Gradient Header -->
      <tr>
        <td height="100" style="background-color: ${p}; background: ${grad}; text-align: center; position: relative;">
          <!-- Visual Pattern Overlay -->
          <div style="opacity: 0.1; background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 12px 12px; height: 100%; width: 100%;"></div>
        </td>
      </tr>

      <!-- Content Area -->
      <tr>
        <td style="padding: 0 40px 50px 40px; text-align: center; background-color: #ffffff;">
          
          <!-- LOGO FIX: Use a div wrapper for the negative margin to prevent table breakage -->
          <div style="margin-top: -55px; margin-bottom: 24px; position: relative; z-index: 10; text-align: center;">
             <center>
               <table width="90" border="0" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 28px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border-collapse: separate;">
                  <tr>
                    <td align="center" valign="middle" style="padding: 5px;">
                       <!-- Inner Colored Border Container -->
                       <div style="border: 3px solid ${p}; border-radius: 20px; background-color: #ffffff; height: 74px; width: 74px; line-height: 74px;">
                          <span style="font-family: sans-serif; font-size: 32px; font-weight: 800; color: ${p}; display: inline-block; line-height: 74px;">SK</span>
                       </div>
                    </td>
                  </tr>
               </table>
             </center>
          </div>

          <div class="animate-content">
            <!-- Icon -->
            ${iconHTML}

            <!-- Main Title -->
            <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px;">${title}</h1>
            <p style="margin: 0 0 30px 0; font-size: 13px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">${preheader}</p>

            <!-- Divider -->
            <div style="height: 1px; background-color: #f1f5f9; width: 100%; margin-bottom: 30px;"></div>

            <!-- Body Text -->
            <div style="text-align: left; margin-bottom: 40px;">
              ${body}
            </div>

            <!-- CTA Button -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <!-- Fallback background color in style attribute for inline safety -->
                  <a href="${link}" class="btn" target="_blank" style="background-color: ${p}; color: #ffffff;">${btnText}</a>
                </td>
              </tr>
            </table>

            <!-- Secondary Help Text -->
            <p style="margin-top: 30px; font-size: 12px; color: #cbd5e1;">
              Si tienes problemas con el botón, copia este enlace: <br/>
              <span style="color: ${p}; text-decoration: none;">${link}</span>
            </p>
          </div>

        </td>
      </tr>
      
      <!-- Footer -->
      <tr>
        <td style="padding: 24px; text-align: center; background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
           <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
             <strong>Sávika IA</strong> • Tu Asistente Educativo Inteligente<br/>
             <a href="#" class="footer-link">Términos</a> • <a href="#" class="footer-link">Privacidad</a> • <a href="#" class="footer-link">Soporte</a>
           </p>
        </td>
      </tr>

    </table>
    
    <div style="height: 40px; font-size: 10px; color: #cbd5e1; margin-top: 20px;">
      &copy; ${new Date().getFullYear()} Sávika IA. Todos los derechos reservados.
    </div>

  </center>
</body>
</html>`;
};

const EmailTemplates: React.FC<EmailTemplatesProps> = ({ view, colors }) => {
  const html = generateEmailHTML(view, colors);
  return (
    <div className="w-full h-full bg-slate-200/50 p-8 flex justify-center overflow-y-auto">
      <iframe 
        title="Email Preview"
        srcDoc={html} 
        className="w-full max-w-[600px] h-[850px] rounded-2xl border-0 shadow-lg"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default EmailTemplates;
