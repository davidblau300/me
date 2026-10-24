export interface AppDeps {
  storage: Storage;
  now: () => Date;
  makeId: () => string;
  confirm: (message: string) => boolean;
}

export interface Mounted {
  stop(): void;
}
