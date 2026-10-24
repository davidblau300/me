export interface AppDeps {
  storage: Storage;
  now: () => Date;
  makeId: () => string;
  confirm: (message: string) => boolean;
  fetch: typeof fetch;
}

export interface Mounted {
  stop(): void;
}
