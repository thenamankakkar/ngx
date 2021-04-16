import {AfterContentInit, AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {$e} from 'codelyzer/angular/styles/chars';
import {PageRenderedEvent, PagesLoadedEvent} from 'ngx-extended-pdf-viewer';
import {NgxExtendedPdfViewerService} from 'ngx-extended-pdf-viewer';
import {pdfDefaultOptions} from 'ngx-extended-pdf-viewer';
import {iterator} from 'rxjs/internal-compatibility';
import {HttpClient} from '@angular/common/http';
import {ApiService} from './services/api.service';
import {Smartphone} from './smartphone';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit, OnDestroy {


  myDate: any = new Date();

  insertobj: any = {};
  insertarr2: any = [];

  ngOnDestroy(): void {


  }

  time = new Date().getTime();
  curentpage: number = 1;
  curenttime: number = 0;
  initialTime: any;
  temp_object: any = {};
  tmparray: any = [];
  tmpobject: any = {};


  title = 'multiplepdf';

  selectedDay: string = '';

  public src = 'assets/example.pdf';
  public src2 = 'assets/exampletwo.pdf';
  newsrc: any = 'assets/example.pdf';

  value = new FormControl('');

  constructor(private apiService: ApiService,
              private datePipe: DatePipe) {
    /* this.apiService.getSmartphone().subscribe();*/
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');

  }


  ngOnInit(): void {
    this.initialTime = this.time;
    console.log('initialTime page one', this.initialTime);
  }


  selectChangeHandler(event: any) {
    //update the ui
    this.selectedDay = event.target.value;
    this.newsrc = this.selectedDay;
    console.log(this.selectedDay);
  }


  functiontwo() {
    this.src = this.src2;
  }

  functionone() {
    this.src = this.newsrc;
  }

  onEvent(pageChange: string, $event: number) {
    this.curenttime = new Date().getTime() - this.initialTime;
    this.initialTime = new Date().getTime();

    if (this.temp_object[this.curentpage]) {
      this.temp_object[this.curentpage] = this.temp_object[this.curentpage] + this.curenttime;
      console.log('am checked in');


    } else {
      console.log('am checked in else');
      this.temp_object[this.curentpage] = this.curenttime;
    }
    console.log(this.temp_object);

    this.curentpage = $event;

  }


  sendData() {

    console.log(this.temp_object);

    let ab = [
      {
        1: 200,
        2: 400
      }

    ];
    let abc: any;
    console.log(ab);
    abc = JSON.stringify(ab);
    console.log(abc);
    this.apiService.sendData(this.temp_object).subscribe(
      response => console.log('Success! ', response),
      error => console.error('Error: ', error)
    );

    /* let objectArray = Object.entries(this.temp_object);
     objectArray.forEach(([key, value]) => {
       console.log(key);
       console.log(value);
       this.insertarr2.push({'page': key, 'time': value, 'date': this.myDate});
     });

     console.log('recreated array', this.insertarr2);

     for (let i = 0; i < this.insertarr2.length; i++) {
       this.apiService.sendData(this.insertarr2[i]).subscribe(
         response => console.log('Success! ', response),
         error => console.error('Error: ', error)
       );
     }*/

  }
}
