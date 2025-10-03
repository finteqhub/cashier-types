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
export type FinteqHubCashierTransactionType = "deposit" | "withdrawal";

export type FinteqHubCashierOptions = {
  activeTransactionType?: FinteqHubCashierTransactionType;
  apiUrl?: string;
  autoClose?: boolean;
  availableTransactionTypes?: FinteqHubCashierTransactionType[];
  backdropStyleOptions?: Record<string, string>;
  balance?: number;
  bonuses?: FinteqHubCashierBonus[];
  containerStyleOptions?: Record<string, string>;
  iframeUrl?: string;
  initToken: string;
  locale?: string;
  lotteries?: FinteqHubCashierLottery[];
  showClose?: boolean;
  showTransactionType?: boolean;
  targetContainer?: HTMLElement;
  termsAndConditionsUrl?: string;
  theme?: FinteqHubCashierTheme;
};

export type FinteqHubCashierMessage = {
  type: "SET_OPTIONS" | "CLOSE_WIDGET";
  payload?: Partial<
    Pick<FinteqHubCashierOptions, (typeof IFRAME_OPTIONS)[number]>
  >;
};

export type FinteqHubCashierEvent =
  | {
      type: "BONUSES_ACTIVATED";
      payload: { state: boolean };
    }
  | {
      type: "BONUSES_PROMOCODE_SUBMITTED";
      payload: { promoCode: string };
    }
  | {
      type: "BONUS_SELECTED";
      payload: { bonus: FinteqHubCashierBonus; state: boolean };
    }
  | {
      type: "ERROR";
      payload: { details: unknown; reason: string };
    }
  | {
      type: "IFRAME_LOADED";
    }
  | {
      type: "LOTTERIES_ACTIVATED";
      payload: { state: boolean };
    }
  | {
      type: "LOTTERY_SELECTED";
      payload: { lottery: FinteqHubCashierLottery; state: boolean };
    }
  | {
      type: "MESSAGE_SENT";
      payload: FinteqHubCashierMessage;
    }
  | {
      type: "METHOD_SELECTED";
      payload: { paymentMethodType: string };
    }
  | {
      type: "PAYMENT_FAILED";
      payload: {
        reason: string;
        paymentMethod: string;
        amount: string;
        currencyCode: string;
      };
    }
  | {
      type: "PAYMENT_METHODS_LOADED";
      payload: { depositMethods: string[]; withdrawMethods: string[] };
    }
  | {
      type: "PAYMENT_SUBMITTED";
      payload: {
        paymentMethod: string;
        amount: string;
        currencyCode: string;
      };
    }
  | {
      type: "PAYMENT_SUCCESS";
      payload: {
        paymentMethod: string;
        amount: string;
        currencyCode: string;
        operationId: string;
        transactionId: string;
      };
    }
  | {
      type: "STATE_CHANGED";
      payload: {
        paymentMethod: string;
        amount: string;
        currencyCode: string;
      };
    }
  | {
      type: "WIDGET_CLOSED";
    }
  | {
      type: "WIDGET_OPENED";
    }
  | {
      type: "WIDGET_READY";
    }
  | {
      type: "WIDGET_TRIGGER_CLOSE";
    };

export const VALID_OPTION_KEYS = [
  "activeTransactionType",
  "apiUrl",
  "autoClose",
  "availableTransactionTypes",
  "backdropStyleOptions",
  "balance",
  "bonuses",
  "containerStyleOptions",
  "iframeUrl",
  "initToken",
  "locale",
  "lotteries",
  "showClose",
  "showTransactionType",
  "targetContainer",
  "termsAndConditionsUrl",
  "theme",
] as const satisfies ReadonlyArray<keyof FinteqHubCashierOptions>;

export const IFRAME_OPTIONS = [
  "activeTransactionType",
  "apiUrl",
  "availableTransactionTypes",
  "balance",
  "bonuses",
  "initToken",
  "locale",
  "lotteries",
  "showClose",
  "showTransactionType",
  "termsAndConditionsUrl",
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
  open(options?: Partial<FinteqHubCashierOptions>): void;
  close(): void;
  onEvent(handler: (event: FinteqHubCashierEvent) => void): void;
  setOptions(newOptions: Partial<FinteqHubCashierOptions>): void;
}
