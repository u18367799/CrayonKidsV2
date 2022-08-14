import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../shared/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  url = "https://localhost:44359/api";
  constructor(private http: HttpClient) { }
 
  getMenus() {
    return this.http.get(this.url+ '/Menu').toPromise();
  }

  addMenu(obj: Menu) {
    return this.http.post(this.url + '/Menu', obj);
  }

  updateMenu(obj: Menu) {
    return this.http.put(this.url+ '/Menu/' + localStorage['Menu_ID'], obj);
  }

  deleteMenu(id: number) {
    return this.http.delete(this.url + '/Menu/' + localStorage['Menu_ID']);
  }

}
