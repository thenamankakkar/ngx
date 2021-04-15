import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {$e} from 'codelyzer/angular/styles/chars';
import {PageRenderedEvent, PagesLoadedEvent} from 'ngx-extended-pdf-viewer';
import {NgxExtendedPdfViewerService} from 'ngx-extended-pdf-viewer';
import {pdfDefaultOptions} from 'ngx-extended-pdf-viewer';
import {iterator} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  time = new Date().getTime();

  curentpage: number = 1;
  curenttime: number = 0;
  initialTime: any;
  temp_object: any = {};
  time_container: any = [];
  tmparray: any = [];
  tmpobject: any = {};


  title = 'multiplepdf';

  selectedDay: string = '';

  public src = 'assets/example.pdf';
  public src2 = 'assets/exampletwo.pdf';
  newsrc: any = 'assets/example.pdf';

  value = new FormControl('');

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
}
