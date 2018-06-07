import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { WeatherPage } from '../pages/weather/weather';
import { LocationsPage } from '../pages/locations/locations';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WeatherServiceProvider } from '../providers/weatherservice/weatherservice';
import { GeocodeserviceProvider } from '../providers/geocodeservice/geocodeservice';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationsServiceProvider } from '../providers/locations-service/locations-service';
import { Pipe, PipeTransform } from '@angular/core';


@NgModule({
  declarations: [
    MyApp,
    WeatherPage,
    LocationsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeatherPage,
    LocationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    WeatherServiceProvider,
    GeocodeserviceProvider,
    LocationsServiceProvider]
})
export class AppModule { }
