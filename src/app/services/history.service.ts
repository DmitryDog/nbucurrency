import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  historyList = new BehaviorSubject<any>([]);

  constructor() {
    this.initHistory();
  }

  public appendValue(value: any): void {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    this.historyList.next([...this.historyList.value, value]);

    localStorage.setItem('history', JSON.stringify([...history, value]));
  }

  public initHistory(): void {
    const history = JSON.parse(localStorage.getItem('history') || '[]');
    this.historyList.next(history);
  }
}
