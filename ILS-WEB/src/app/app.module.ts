import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';

import { ConfigActions } from './ThemeOptions/store/config.actions';
import { rootReducer, ArchitectUIState } from './ThemeOptions/store';

import { Interceptor } from './Services/HomeServices/interceptor.service';

// LAYOUT
import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';
// HEADER
import {HeaderComponent} from './Layout/Components/header/header.component';
import {SearchBoxComponent} from './Layout/Components/header/elements/search-box/search-box.component';
import {UserBoxComponent} from './Layout/Components/header/elements/user-box/user-box.component';
// SIDEBAR
import {SidebarComponent} from './Layout/Components/sidebar/sidebar.component';
import {LogoComponent} from './Layout/Components/sidebar/elements/logo/logo.component';
// FOOTER
import {FooterComponent} from './Layout/Components/footer/footer.component';

// HOME
import { HomeComponent } from './Home/home.component';
import { AboutComponent } from './Home/about.component';
import { RouteNotFoundComponent } from './Home/routeNotFound.component';
import { LoginComponent } from './Home/login.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    PagesLayoutComponent,
    PageTitleComponent,

    HeaderComponent,
    SearchBoxComponent,
    UserBoxComponent,

    SidebarComponent,
    LogoComponent,
    FooterComponent,

    HomeComponent,
    RouteNotFoundComponent,
    AboutComponent,
    LoginComponent
  ],
  imports: [
    AngularMyDatePickerModule,
    AppRoutingModule,
    AutocompleteLibModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    LoadingBarRouterModule,
    NgbModule,
    NgReduxModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    ConfigActions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

  this.ngRedux.configureStore(
    rootReducer,
    {} as ArchitectUIState,
    [],
    [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
