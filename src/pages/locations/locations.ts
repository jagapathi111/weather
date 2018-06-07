import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Events} from 'ionic-angular';
import { CurrentLoc } from '../../interfaces/current-loc';
import { WeatherLocation } from '../../interfaces/weather-location';
import { LocationsServiceProvider } from '../../providers/locations-service/locations-service';
import { GeocodeserviceProvider } from '../../providers/geocodeservice/geocodeservice';
import { WeatherPage } from '../weather/weather';



/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  locs: Array<WeatherLocation>;

   
  constructor(public navCtrl: NavController, public navParams: NavParams,public locationsService: LocationsServiceProvider,
    public geocodeService: GeocodeserviceProvider,public alertCtrl: AlertController,public events: Events) 
  {
    locationsService.locations$.subscribe( ( locs: Array<WeatherLocation> ) => {
      this.locs = locs;
     });
     
    
     }

  deleteLocation(loc:WeatherLocation) {
    this.locationsService.removeLocation(loc);
    this.events.publish('locations:updated', {});

   }
   addLocation() {
    let prompt = this.alertCtrl.create({
      title: 'Add a City',
      message: "Enter the city's name",
      inputs: [
      {
      name: 'title',
      placeholder: 'City name'
      },
      ],
      buttons: [
      {
      text: 'Cancel',
      handler: data => {
      console.log('Cancel clicked');
      }
      },
      {
      text: 'Add',
      handler: data => {
        if (data.title != '') {
          this.geocodeService.getLatLong(data.title).then(res => {
          let newLoc = { title: '', component: WeatherPage, icon: 'pin',loc: { lat: 0, lon: 0 } }
          newLoc.title = res.name;
          newLoc.loc.lat = res.location.latitude;
          newLoc.loc.lon = res.location.longitude;
          this.locationsService.addLocation(newLoc);
           this.events.publish('locations:updated', {});

        });
      }
      
      }
      }
      ]
      });
      prompt.present();
    }
  
  
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
  }

}
