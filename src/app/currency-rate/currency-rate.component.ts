import {Component, OnInit} from '@angular/core';
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.scss']
})

export class CurrencyRateComponent implements OnInit {
  resultSale: any = ''
  resultBye: any = ''
  selectedSale: string = 'UAH'
  selectedBye: string = 'USD'
  objCurrencies: any = {}

  constructor(public data: DataService) {
  }

  ngOnInit() {
    this.data.fetchData().subscribe()
  }

  changeSelect(e: any) {
    this.onSaleChange(+this.resultSale)
  }

  inputValue(searchValue: any) {
    let inputValue: number
    if (typeof searchValue !== "number") {
      inputValue = searchValue.value
    } else {
      inputValue = searchValue
    }
    this.data.dataCurrencies.forEach((el: any) => {
      if (el.cc === 'USD') {
        this.objCurrencies.USD = el
      }
      if (el.cc === 'EUR') {
        this.objCurrencies.EUR = el
      }
    })
    return inputValue
  }

  setRate(select: any) {
    return this.objCurrencies[select].rate
  }

  onSaleChange(searchValue: any): void {
    let inputValue: number = this.inputValue(searchValue)
    if (this.selectedSale === this.selectedBye) {
      this.resultBye = inputValue
    } else {
      if (this.selectedSale === 'UAH') {
        this.resultBye = (inputValue / this.setRate(this.selectedBye)).toFixed(2)
      } else {
        if (this.selectedBye === "UAH") {
          this.resultBye = (inputValue * this.setRate(this.selectedSale)).toFixed(2)
        } else {
          this.resultBye = ((inputValue * this.setRate(this.selectedSale)) / this.setRate(this.selectedBye)).toFixed(2)
        }
      }
    }
  }

  onByeChange(searchValue: any): void {
    let inputValue: number = this.inputValue(searchValue)
    if (this.selectedSale === this.selectedBye) {
      this.resultSale = inputValue
    } else {
      if (this.selectedBye === 'UAH') {
        this.resultSale = (inputValue / this.setRate(this.selectedSale)).toFixed(2)
      } else {
        if (this.selectedSale === 'UAH') {
          this.resultSale = (inputValue * this.setRate(this.selectedBye)).toFixed(2)
        } else {
          this.resultSale = ((inputValue * this.setRate(this.selectedBye)) / this.setRate(this.selectedSale)).toFixed(2)
        }
      }
    }
  }
}
