import { ApplicationRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { GoogleMaps } from 'src/providers/google-maps/google-maps';
import { GlobalEventService } from 'src/services/events.service';

declare var google;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  @ViewChild('pleaseConnect', {static: false}) pleaseConnect: ElementRef;

  map: any;
  latitude: number;
  longitude: number;
  autocompleteService: any;
  placesService: any;
  query: string = '';
  places: any = [];
  searchDisabled: boolean;
  saveDisabled: boolean;
  location: any;
  marker: any;
  moveMarker: any;
  clickMarker: any;

  constructor(
    public navCtrl: NavController,
    public zone: NgZone,
    public maps: GoogleMaps,
    public platform: Platform,
    public geolocation: Geolocation,
    public event: GlobalEventService,
    private modalCtrl: ModalController,
    private applicationRef: ApplicationRef
  ) {
    this.searchDisabled = true;
    this.saveDisabled = false;
  }

  ngOnInit() {
  }

  ionViewDidEnter() {

  }

  ngAfterViewInit() {
    this.loadMap()
  }
  
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {      
      this.searchDisabled = false;      

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        animation: google.maps.Animation.DROP,
        zoomControl: false
      }
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

      this.marker = new google.maps.Marker({
        map: this.map,
        position: this.map.getCenter(),
        draggable: true
      });
      this.marker.setMap(this.map);

      let thisObj = this;
      this.map.addListener('click', function (e) {
        thisObj.marker.setPosition(e.latLng);
      });
      
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.placesService = new google.maps.places.PlacesService(this.map);
      
      var con_text = document.getElementById('please-connect');
      con_text.style.display = 'none';

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }


  selectPlace(place) {

    this.places = [];

    let location = {
      lat: null,
      lng: null,
      name: place.name
    };

    this.placesService.getDetails({ placeId: place.place_id }, (details) => {
      this.zone.run(() => {
        location.name = details.name;
        location.lat = details.geometry.location.lat();
        location.lng = details.geometry.location.lng();
        this.saveDisabled = false;        

        this.map.setCenter({ lat: location.lat, lng: location.lng });
        console.log('pickup location data = : ', location);
        this.location = location;

        console.log(this.map.center);

        this.marker = new google.maps.Marker({
          map: this.map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });

        this.marker.setMap(this.map);

        let thisObj = this;

        this.map.addListener('click', function (e) {
          thisObj.marker.setPosition(e.latLng);
          let location = {
            lat: null,
            lng: null,
            name: ''
          };
          location.name = '';
          location.lat = e.latLng.lat();
          location.lng = e.latLng.lng();
          console.log('click location = : ', location);
          thisObj.location = location;
          thisObj.saveDisabled = false;          
        });        

        this.moveMarker = google.maps.event.addListener(this.marker, 'dragend', (evt) => {
          location.name = '';
          location.lat = evt.latLng.lat();
          location.lng = evt.latLng.lng();
          console.log('drag end location = :', location);
          this.location = location;
          this.saveDisabled = false;          
        });        
      });
    });
  }

  searchPlace() {

    this.saveDisabled = true;

    if (this.query.length > 0 && !this.searchDisabled) {
      let config = {
        types: ['geocode'],
        input: this.query,
        componentRestrictions: { country: "kw" }
      }

      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
          this.places = [];
          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }
      });

    } else {
      this.places = [];
    }

  }

  save() {
    let position = this.marker.getPosition();
    this.event.publishSomeData({event: 'pickup', lat: position.lat(), lng: position.lng()});
    this.modalCtrl.dismiss({data: this.location, role: 'pickup'});
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
