export class AmountHistoryModel {
  date: string = new Date().toDateString();
  inputCurrency: string = '';
  outputCurrency: string = '';
  inputAmount: string | number = 0;
  outputAmount: any = 0;
  totalData: string = '';

  constructor(
    inputCurr: string,
    outputCurrency: string,
    inputAmount: string | number,
    outputAmount: string | number
  ) {
    this.inputCurrency = inputCurr;
    this.outputCurrency = outputCurrency;
    this.inputAmount = inputAmount;
    this.outputAmount = outputAmount;
    this.totalData = `${this.date} ${inputCurr} - ${inputAmount} : ${outputCurrency} - ${outputAmount}`;
  }
}
