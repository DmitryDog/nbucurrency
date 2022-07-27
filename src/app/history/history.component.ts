import { Component, OnInit } from '@angular/core';
import { HistoryService } from '../services';

@Component({
  selector: 'history-page',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  historyList: string[] = [];

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.historyService.historyList.subscribe(
      (list: string[]) => (this.historyList = list.reverse())
    );
  }
}
