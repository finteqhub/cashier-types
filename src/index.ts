export type FinteqHubCashierOptions = {
  backdropStyleOptions?: Record<string, string>;
  balance?: number;
  bonuses?: { id: string; name: string; description: string }[];
  containerStyleOptions?: Record<string, string>;
  iframeUrl?: string;
  initToken?: string; // todo: add support in cashier
  locale?: string; // todo: add support in cashier
  lotteris?: { id: string; name: string; description: string }[];
  showClose?: boolean;
  targetContainer?: HTMLElement;
  theme?: string;
};

export type FinteqHubCashierEvent = {
  type:
    | "ERROR"
    | "IFRAME_LOADED"
    | "IFRAME_REMOVED"
    | "MESSAGE_SENT"
    | "METHOD_SELECTED"
    | "PAYMENT_FAILED"
    | "PAYMENT_METHODS_LOADED"
    | "PAYMENT_SUBMITTED"
    | "PAYMENT_SUCCESS"
    | "WIDGET_CLOSED"
    | "WIDGET_OPENED"
    | "WIDGET_READY"
    | "WIDGET_TRIGGER_CLOSE"
    | "BONUSES_ACTIVATED"
    | "BONUSES_PROMOCODE_SUBMITTED"
    | "LOTTERIES_ACTIVATED";
  payload?: Record<string, unknown>;
};

export type FinteqHubCashierMessage = {
  type: "SET_OPTIONS";
  payload?: Record<string, unknown>;
};

export const VALID_OPTION_KEYS = [
  "backdropStyleOptions",
  "balance",
  "bonuses",
  "containerStyleOptions",
  "iframeUrl",
  "initToken",
  "locale",
  "lotteris",
  "showClose",
  "targetContainer",
  "theme",
] as const satisfies ReadonlyArray<keyof FinteqHubCashierOptions>;

export const IFRAME_OPTIONS = [
  "balance",
  "bonuses",
  "initToken",
  "locale",
  "lotteris",
  "showClose",
  "theme",
] as const satisfies ReadonlyArray<keyof FinteqHubCashierOptions>;

type AllOptionKeys = (typeof VALID_OPTION_KEYS)[number];
type CheckOptionKeys = [
  Exclude<keyof FinteqHubCashierOptions, AllOptionKeys>,
] extends [never]
  ? [Exclude<AllOptionKeys, keyof FinteqHubCashierOptions>] extends [never]
    ? true
    : never
  : never;

type IframeOptionKeys = (typeof IFRAME_OPTIONS)[number];
type CheckIframeOptionKeys = [
  Exclude<IframeOptionKeys, keyof FinteqHubCashierOptions>,
] extends [never]
  ? true
  : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _check: CheckOptionKeys = true;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkIframe: CheckIframeOptionKeys = true;

export interface IFinteqHubCashier {
  open(options?: FinteqHubCashierOptions): void;
  close(): void;
  onEvent(handler: (event: FinteqHubCashierEvent) => void): void;
  setOptions(newOptions: FinteqHubCashierOptions): void;
}
