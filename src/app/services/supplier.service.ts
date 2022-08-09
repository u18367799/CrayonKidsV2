import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Supplier } from '../shared/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  url = "https://localhost:44359/api";

  constructor(private httpClient: HttpClient) { }
  
  getSupplier() {
    return this.httpClient.get(this.url+ '/Supplier').toPromise();
  }

  addSupplier(obj: Supplier) {
    return this.httpClient.post(this.url + '/Supplier', obj);
  }

  updateSupplier(obj: Supplier) {
    return this.httpClient.put(this.url+ '/Supplier/' + localStorage['Supplier_ID'], obj);
  }

  deleteSupplier(id: number) {
    return this.httpClient.delete(this.url + '/Supplier/' + localStorage['Supplier_ID']);
  }
}
