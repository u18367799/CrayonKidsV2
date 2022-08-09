import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lunch } from '../shared/lunch';

@Injectable({
  providedIn: 'root'
})
export class LunchService {

  url = "https://localhost:44359/api";

  constructor(private httpClient: HttpClient) { }

  getLunch() {
    return this.httpClient.get(this.url+ '/Lunch').toPromise();
  }

  addLunch(obj: Lunch) {
    return this.httpClient.post(this.url + '/Lunch', obj);
  }

  updateLunch(obj: Lunch) {
    return this.httpClient.put(this.url+ '/Lunch/' + localStorage['Lunch_ID'], obj);
  }

  deleteLunch(id: number) {
    return this.httpClient.delete(this.url + '/Lunch/' + localStorage['Lunch_ID']);
  }
}

