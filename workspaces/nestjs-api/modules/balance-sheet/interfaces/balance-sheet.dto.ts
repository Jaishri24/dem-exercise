export interface BalanceSheet {
  year: number;
  month: number;
  profitOrLoss: number;
  assetsValue: number;
}

export interface BusinessBalanceSheets {
  abn: string;
  balanceSheet: BalanceSheet[];
}
