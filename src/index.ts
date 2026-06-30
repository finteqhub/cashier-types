export type CashierBonus = {
  description: string[];
  details: string[];
  id: string;
  isActive: boolean;
  isDisabled: boolean;
  isSelectable: boolean;
  title: string;
};

export type CashierLottery = CashierBonus;

export type CashierTheme = "light" | "dark" | "blue";
export type CashierTransactionType = "deposit" | "withdrawal";
export type CashierMode = "full" | "oneClick";

export type CashierOptions = {
  activePromoCode?: string | null;
  activeTransactionType?: CashierTransactionType;
  apiUrl?: string;
  autoClose?: boolean;
  availableTransactionTypes?: CashierTransactionType[];
  backdropStyleOptions?: Record<string, string>;
  balance?: {
    total?: number;
    withdrawable?: number;
  };
  bonuses?: CashierBonus[];
  bonusesActivated?: boolean;
  containerStyleOptions?: Record<string, string>;
  contentAlign?: "left" | "center" | "right";
  transactionFlow?: "redirect" | "newWindow";
  iframeUrl?: string;
  initToken: string;
  locale?: string;
  lotteries?: CashierLottery[];
  lotteriesActivated?: boolean;
  mode?: CashierMode;
  redirectUrl?: string;
  showClose?: boolean;
  showTransactionType?: boolean;
  targetContainer?: HTMLElement;
  termsAndConditionsUrl?: string;
  theme?: CashierTheme;
};

export type CashierMessage =
  | {
      type: "SET_OPTIONS";
      payload: Partial<
        Pick<CashierOptions, (typeof IFRAME_OPTIONS)[number]>
      >;
    }
  | {
      type: "WIDGET_OPENED";
    }
  | {
      type: "CLOSE_WIDGET";
    };

export const CashierErrorType = {
  CashierServerUnavailable: "CashierServerUnavailable",
  CashierWidgetUnavailable: "CashierWidgetUnavailable",
  CashierServerError: "CashierServerError",
  CashierWidgetError: "CashierWidgetError",
} as const;

export type CashierErrorType =
  (typeof CashierErrorType)[keyof typeof CashierErrorType];

export type CashierEvent =
  | {
      type: "BONUSES_ACTIVATED";
      payload: { state: boolean };
    }
  | {
      type: "BONUS_SELECTED";
      payload: { bonus: CashierBonus; state: boolean };
    }
  | {
      type: "ERROR";
      payload: {
        error: CashierErrorType;
        statusCode: number | null;
        details: string;
      };
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
      payload: { lottery: CashierLottery; state: boolean };
    }
  | {
      type: "MESSAGE_SENT";
      payload: CashierMessage;
    }
  | {
      type: "PAYMENT_FAILED";
      payload: {
        operationId?: string;
        error: string;
      };
    }
  | {
      type: "PAYMENT_METHODS_LOADED";
      payload: { depositMethods: string[]; withdrawMethods: string[] };
    }
  | {
      type: "PAYMENT_SUBMITTED";
      payload: {
        initialAmount: string;
        initialCurrencyCode: string;
        paymentMethodType?: string;
        transactionType: CashierTransactionType;
      };
    }
  | {
      type: "PAYMENT_SUCCESS";
      payload: {
        operationId: string;
      };
    }
  | {
      type: "PROMOCODE_ADDED";
      payload: { promoCode: string };
    }
  | {
      type: "PROMOCODE_REMOVED";
      payload: { promoCode: string };
    }
  | {
      type: "STATE_CHANGED";
      payload: {
        initialAmount: string;
        initialCurrencyCode: string;
        paymentMethodType?: string;
        transactionType: CashierTransactionType;
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
      type: "OPEN_FULL_WIDGET";
    }
  | {
      type: "WIDGET_TRIGGER_CLOSE";
    }
  | {
      type: "PAYMENT_REDIRECT";
      payload: {
        url: string;
      };
    };

export const VALID_OPTION_KEYS = [
  "activePromoCode",
  "activeTransactionType",
  "apiUrl",
  "autoClose",
  "availableTransactionTypes",
  "backdropStyleOptions",
  "balance",
  "bonuses",
  "bonusesActivated",
  "containerStyleOptions",
  "contentAlign",
  "transactionFlow",
  "iframeUrl",
  "initToken",
  "locale",
  "lotteries",
  "lotteriesActivated",
  "mode",
  "redirectUrl",
  "showClose",
  "showTransactionType",
  "targetContainer",
  "termsAndConditionsUrl",
  "theme",
] as const satisfies ReadonlyArray<keyof CashierOptions>;

export const IFRAME_OPTIONS = [
  "activePromoCode",
  "activeTransactionType",
  "apiUrl",
  "availableTransactionTypes",
  "balance",
  "bonuses",
  "bonusesActivated",
  "contentAlign",
  "transactionFlow",
  "initToken",
  "locale",
  "lotteries",
  "lotteriesActivated",
  "mode",
  "redirectUrl",
  "showClose",
  "showTransactionType",
  "termsAndConditionsUrl",
  "theme",
] as const satisfies ReadonlyArray<keyof CashierOptions>;

type AllOptionKeys = (typeof VALID_OPTION_KEYS)[number];
type CheckOptionKeys = [
  Exclude<keyof CashierOptions, AllOptionKeys>,
] extends [never]
  ? [Exclude<AllOptionKeys, keyof CashierOptions>] extends [never]
    ? true
    : never
  : never;

type IframeOptionKeys = (typeof IFRAME_OPTIONS)[number];
type CheckIframeOptionKeys = [
  Exclude<IframeOptionKeys, keyof CashierOptions>,
] extends [never]
  ? true
  : never;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _check: CheckOptionKeys = true;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkIframe: CheckIframeOptionKeys = true;

export interface ICashier {
  open(options?: Partial<CashierOptions>): void;
  close(): void;
  onEvent(handler: (event: CashierEvent) => void): void;
  setOptions(newOptions: Partial<CashierOptions>): void;
}
