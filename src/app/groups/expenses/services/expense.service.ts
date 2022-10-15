import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable()
export class ExpenseService {
  constructor(private httpService: HttpService) {}

  public createExpense(data: any): Observable<any> {
    return this.httpService.post('expenses/add', data);
  }
}
