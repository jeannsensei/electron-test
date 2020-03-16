import { ElectronService } from './../../core/services/electron/electron.service';
import { Item } from './../../core/models/item.schema';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private _electron: ElectronService) {}

  getItems(): Observable<Item[]> {
    return of(this._electron.ipcRenderer.sendSync('get-items')).pipe(
      catchError((error: any) => Observable.throw(error.json))
    );
  }

  addItem(item: Item): Observable<Item[]> {
    return of(this._electron.ipcRenderer.sendSync('add-item', item)).pipe(
      catchError((error: any) => Observable.throw(error.json))
    );
  }

  deleteItem(item: Item): Observable<Item[]> {
    return of(this._electron.ipcRenderer.sendSync('delete-item', item)).pipe(
      catchError((error: any) => Observable.throw(error.json))
    );
  }
}
