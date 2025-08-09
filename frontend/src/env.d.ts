interface ImportMetaEnv {
  readonly PUBLIC_JOIN_URL: string;
  readonly PUBLIC_FILE_TIMES_URL: string;
  readonly PUBLIC_ANALYTICS_URL: string;
  readonly PUBLIC_ANALYTICS_SITE_ID: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
