import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,  NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { HTTP } from '@ionic-native/http/ngx';
import { BrMaskerModule, BrMaskDirective } from 'br-mask';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Media } from '@ionic-native/media/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/File/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HaversineService } from "ng2-haversine";
import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceService } from './service.service';
import { Push } from '@ionic-native/push/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule,
    BrowserModule,
    HttpClientModule,
    BrMaskerModule,
    IonicModule.forRoot(), 
    AppRoutingModule,    
  ],
  providers: [
    StatusBar,
    HaversineService,
    Camera,
    NativeGeocoder,
    Geolocation,
    SplashScreen,
    ServiceService,
    AngularFirestore,
    HttpClientModule,
    Push,
    MediaCapture,
    File,
    HTTP,
    Media,
    BrMaskDirective,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule {}
