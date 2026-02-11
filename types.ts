
export type AppView = 'login' | 'register' | 'forgot' | 'update';
export type EmailView = 'confirm' | 'reset' | 'changed';
export type MainMode = 'app' | 'email';
export type DisplayMode = 'preview' | 'code';

export interface AppState {
  mainMode: MainMode;
  appView: AppView;
  emailView: EmailView;
  displayMode: DisplayMode;
  colors: {
    primary: string;
    secondary: string;
  };
  supabase: {
    url: string;
    key: string;
    isConnected: boolean;
  };
  logs: LogEntry[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
}
