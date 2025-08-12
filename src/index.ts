export type FinteqHubCashierBonusCondition = {
  minAmount: number;
  currencyCode: string;
  paymentMethods: string[];
};

export type FinteqHubCashierBonusAttribute = {
  amount: number;
  type: string;
};

export type FinteqHubCashierBonus = {
  bonusId: string;
  conditions: FinteqHubCashierBonusCondition[];
  attributes: FinteqHubCashierBonusAttribute[];
};

export type FinteqHubCashierLotteryConditions = {
  ticketPrice: number;
  currencyCode: string;
  paymentMethod: string[];
  maxTickets: number;
};

export type FinteqHubCashierLotteryPrize = {
  amount: number;
  type: string;
};

export type FinteqHubCashierLottery = {
  lotteryId: string;
  conditions: FinteqHubCashierLotteryConditions;
  prizes: FinteqHubCashierLotteryPrize[];
};

export type FinteqHubCashierTheme = "light" | "dark";

export type FinteqHubCashierOptions = {
  autoClose?: boolean;
  backdropStyleOptions?: Record<string, string>;
  balance?: number;
  bonuses?: FinteqHubCashierBonus[];
  containerStyleOptions?: Record<string, string>;
  iframeUrl?: string;
  initToken: string;
  locale?: string;
  lotteries?: FinteqHubCashierLottery[];
  showClose?: boolean;
  targetContainer?: HTMLElement;
  theme?: FinteqHubCashierTheme;
  apiUrl?: string;
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
  payload?: Partial<
    Pick<FinteqHubCashierOptions, (typeof IFRAME_OPTIONS)[number]>
  >;
};

export const VALID_OPTION_KEYS = [
  "autoClose",
  "backdropStyleOptions",
  "balance",
  "bonuses",
  "containerStyleOptions",
  "iframeUrl",
  "initToken",
  "locale",
  "lotteries",
  "showClose",
  "targetContainer",
  "theme",
  "apiUrl",
] as const satisfies ReadonlyArray<keyof FinteqHubCashierOptions>;

export const IFRAME_OPTIONS = [
  "balance",
  "bonuses",
  "initToken",
  "locale",
  "lotteries",
  "showClose",
  "theme",
  "apiUrl",
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
  open(options?: Partial<FinteqHubCashierOptions>): void;
  close(): void;
  onEvent(handler: (event: FinteqHubCashierEvent) => void): void;
  setOptions(newOptions: Partial<FinteqHubCashierOptions>): void;
}
