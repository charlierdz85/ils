import { Component, OnInit } from '@angular/core';
import { faStar, faPlus, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthenticationService } from './Services/HomeServices/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit {

  title = 'Dicka logistics';

  public Star = faStar;
  public Plus = faPlus;
  public Elipsisv = faEllipsisV;

  constructor(  location: Location
              , router: Router
              , servAuth: AuthenticationService ) {

    router.events.subscribe(val => {
      if (!servAuth.sessionCheck()) {
        if (location.path() !== '/login'){
          window.location.href = '/login';
        }
      }
    });
  }

  ngOnInit() {}

}
