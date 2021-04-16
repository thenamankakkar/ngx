import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse, HttpHandler, HttpParams} from '@angular/common/http';
import {Smartphone} from '../smartphone';
import {Observable, of} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

const localUrl = '/assets/data/smatphone.json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private header = new HttpHeaders({ 'content-type': 'application/json' });
  constructor(private httpclient: HttpClient) {

  }

  sendData(data : any=[]) {

    //const headers = {'content-type': 'application/json'};
    return this.httpclient.post('http://localhost:4600/course', data, {'headers': this.header});
  }


  getSmartphone(): Observable<HttpResponse<Smartphone[]>> {
    return this.httpclient.get<Smartphone[]>(
      localUrl, {observe: 'response'});
  }

  addSmartphone() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };


    let params = new HttpParams({ fromObject: {  } });



    return this.httpclient.post(`http://localhost:4600/course`, {
      'pagetwo': '1',
      'time': '2500',
    })

      .subscribe(
        data => {

          console.log('Post Request is successful ', data);

        },

        error => {

          console.log('Error', error);

        }
      );


  }
}
