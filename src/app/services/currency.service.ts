import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

const ENDPOINT = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';
const UAH = {
  r030: 1,
  txt: 'Українська гривня',
  rate: 1,
  cc: 'UAH',
  exchangedate: '02.03.2020',
};

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  currencyList: any[] = [];

  constructor(private http: HttpClient) {}

  public calculateCurrRate(
    inputCurr: string,
    outputCurr: string,
    inputAmmont: number
  ) {
    const { rate: inputRate } =
      this.currencyList.find(({ cc }) => cc === inputCurr) || {};
    const { rate: outputRate } =
      this.currencyList.find(({ cc }) => cc === outputCurr) || {};

    return (inputAmmont * (inputRate / outputRate)).toFixed(2);
  }
  public getCurrencyRates(date?: string) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('json', '');
    if (date) {
      httpParams = httpParams.append('date', date);
    }

    return this.http.get<any[]>(ENDPOINT, { params: httpParams }).pipe(
      map((res) => [...res, UAH]),
      tap((res) => (this.currencyList = res))
    );
  }
}
