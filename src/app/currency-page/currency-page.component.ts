import { _isNumberValue } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { CurrencyService, HistoryService } from '../services';
import { AmountHistoryModel } from '../history/history.model';

@Component({
  selector: 'currency-page',
  templateUrl: './currency-page.component.html',
  styleUrls: ['./currency-page.component.scss'],
})
export class CurrencyPageComponent implements OnInit {
  public currencyList: SelectItem[] = [];
  public formattedDate = '';
  public currentDate: Date = new Date();
  public userForm: FormGroup = this.fb.group({});

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder,
    private historyService: HistoryService
  ) {}

  ngOnInit(): void {
    this.generateForm();
    this.observeFormChanges('inputCurrency');
    this.observeFormChanges('inputAmount');
    this.observeFormChanges('outputAmount');
    this.observeFormChanges('outputCurrency');
  }

  private generateForm(): void {
    this.userForm = this.fb.group({
      inputAmount: new FormControl(1, [Validators.required]),
      outputAmount: new FormControl(1),
      inputCurrency: new FormControl('USD'),
      outputCurrency: new FormControl('USD'),
    });
  }

  private observeFormChanges(field: string) {
    this.userForm.controls[field].valueChanges.subscribe(() => {
      const { fieldsForCalculations, fieldToChange } =
        this.getFieldsToChange(field);
      const fields: [string, string, number] = fieldsForCalculations.map(
        (elem: any) => this.userForm.get(elem)?.value
      );
      const resultAmount = this.currencyService.calculateCurrRate(...fields);
      this.userForm.patchValue(
        {
          [fieldToChange]: resultAmount,
        },
        { emitEvent: false }
      );
      this.historyService.appendValue(
        new AmountHistoryModel(...fields, resultAmount).totalData
      );
    });
  }

  private getFieldsToChange(field: string): any {
    switch (field) {
      case 'inputCurrency':
        return {
          fieldsForCalculations: [
            'inputCurrency',
            'outputCurrency',
            'inputAmount',
          ],
          fieldToChange: 'outputAmount',
        };

      case 'outputCurrency':
        return {
          fieldsForCalculations: [
            'inputCurrency',
            'outputCurrency',
            'inputAmount',
          ],
          fieldToChange: 'outputAmount',
        };

      case 'inputAmount':
        return {
          fieldsForCalculations: [
            'inputCurrency',
            'outputCurrency',
            'inputAmount',
          ],
          fieldToChange: 'outputAmount',
        };

      case 'outputAmount':
        return {
          fieldsForCalculations: [
            'outputCurrency',
            'inputCurrency',
            'outputAmount',
          ],
          fieldToChange: 'inputAmount',
        };
    }
  }

  public onInputNumber(event: any, field: any) {
    this.userForm.patchValue({
      [field]: event.value,
    });
  }

  private getCurrencyList(date: string): void {
    this.currencyService.getCurrencyRates(date).subscribe((data) => {
      this.currencyList = data
        .map(({ txt: label, cc: value }) => ({
          label,
          value,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
    });
  }

  public onDateSelect(date: Date): void {
    const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    this.getCurrencyList(formattedDate);
  }
}
