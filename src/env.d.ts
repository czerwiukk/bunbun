/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_SUPABASE_ANON_KEY: string;
  VITE_ALLOWED_EMAILS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
