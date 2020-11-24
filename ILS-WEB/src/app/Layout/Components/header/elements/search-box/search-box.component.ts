import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {

  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     }
  ];

  public isActive: any;

  constructor() { }

  ngOnInit() {}

  selectEvent(item) {}

  onChangeSearch(val: string) {}

  onFocused(e) {}


}
