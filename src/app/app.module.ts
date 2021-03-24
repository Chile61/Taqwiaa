import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CommonService } from "../services/commonService";
import { GlobalEventService } from "../services/events.service";
import { Services } from '../services/services';
import { Connectivity } from '../providers/connectivity-service/connectivity-service';
import { GoogleMaps } from '../providers/google-maps/google-maps';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { LocationPageModule } from './pages/location/location.module';
import { Camera } from '@ionic-native/camera/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ChangeLangPageModule } from './pages/change-lang/change-lang.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    LocationPageModule,
    ChangeLangPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CommonService,
    GlobalEventService,
    Services,
    Geolocation,
    Network,
    GoogleMaps,
    Connectivity,
    Camera,
    HTTP,
    NativeGeocoder,
    SpinnerDialog,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
