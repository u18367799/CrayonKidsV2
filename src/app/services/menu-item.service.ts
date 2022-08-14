import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../shared/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  url = "https://localhost:44359/api";
  constructor(private http: HttpClient) { }

  getMenuItems() {
    return this.http.get(this.url+ '/MenuItem').toPromise();
  }

  addMenuItem(obj: MenuItem) {
    return this.http.post(this.url + '/MenuItem', obj);
  }

  updateMenuItem(obj: MenuItem) {
    return this.http.put(this.url+ '/MenuItem/' + localStorage['MenuItem_ID'], obj);
  }

  deleteMenuItem(id: number) {
    return this.http.delete(this.url + '/MenuItem/' + localStorage['MenuItem_ID']);
  }
}
