import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UploadPop } from '../shared/upload-pop';

@Injectable({
  providedIn: 'root'
})
export class UploadPopService {

  url = "https://localhost:44359/api";

  constructor(private httpClient: HttpClient) { }

  getPoP(){
    return this.httpClient.get(this.url + '/UploadPop').toPromise();
  }

  addPoP(obj: UploadPop) {
    return this.httpClient.post(this.url + '/UploadPop', obj);
  }

  updatePop(obj: UploadPop) {
    return this.httpClient.put(this.url+ '/UploadPop/' + localStorage['Pop_ID'], obj);
  }

  deletePop(id: number) {
    return this.httpClient.delete(this.url + '/UploadPop/' + localStorage['Pop_ID']);
  }
}
