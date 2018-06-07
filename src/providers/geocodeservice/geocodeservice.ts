import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GeocodeserviceProvider {

  data: any;
  apikey:String = 'AIzaSyDVGnwxnT-9kbqUPd2RuPzdDOjMRMsi4UQ';
  constructor(public http: Http) {
  this.data = null;
  }
  getLatLong(address:string) {
  if (this.data) {
  
  return Promise.resolve(this.data);
  }
  
  return new Promise(resolve => {
  this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(address)+'&key='+this.apikey)
  .map(res => res.json())
  .subscribe(data => {
  if(data.status === "OK") {
  resolve({name: data.results[0].formatted_address, location:{
  latitude: data.results[0].geometry.location.lat,
  longitude: data.results[0].geometry.location.lng
  }
  });
  } else {
  console.log(data);
  
  }
  });
});
}

}


 //constructor(public http : HttpClient); {
   // console.log('Hello GeocodeserviceProvider Provider');
  //}

