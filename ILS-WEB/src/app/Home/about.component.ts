import { Component } from '@angular/core';
import {IAngularMyDpOptions, IMyDateModel} from 'angular-mydatepicker';

@Component({
  selector: 'app-about',
  templateUrl: './about.view.html'
})
export class AboutComponent {

    title = 'Dicka Logistics - WMS 2.0.0';

    myDpOptions: IAngularMyDpOptions = {
      dateRange: false,
      dateFormat: 'dd.mm.yyyy'
      // other options are here...
    };
  
    model: IMyDateModel = null;

    onDateChanged(event: IMyDateModel): void {
      // date selected
    }
}
