import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({providedIn: 'root'})

export class DataService {
  public dataCurrencies: any = []

  constructor(private http: HttpClient) {
  }

  fetchData(): Observable<any> {
    return this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .pipe(tap((data: any) => {
          let dataArr = []
          const usd = data.filter((e: any) => e.cc === "USD")
          const eur = data.filter((e: any) => e.cc === "EUR")
          dataArr.push(...usd, ...eur)
          this.dataCurrencies = dataArr
        }
      ))
  }
}
