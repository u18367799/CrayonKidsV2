import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipment } from '../shared/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  url = "https://localhost:44359/api";

  constructor(private httpClient: HttpClient) { }

  getEquipment() 
  {
    return this.httpClient.get(this.url+ '/Equipment').toPromise();
  }

  addEquipment(obj: Equipment) 
  {
    return this.httpClient.post(this.url + '/Equipment', obj);
  }

  updateEquipment(obj: Equipment) 
  {
    return this.httpClient.put(this.url+ '/Equipment/' + localStorage['Equipment_ID'], obj);
  }

  deleteEquipment(id: number) 
  {
    return this.httpClient.delete(this.url + '/Equipment/' + localStorage['Equipment_ID']);
  }
}

