import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() data: string;
  intervalo
  courier
  constructor(public services: ServiceService, public storage: Storage,public loadingController: LoadingController, public navCtrl: NavController,public router: Router,private httpClient: HttpClient,public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.data)
    this.start()
    this.watchCourier(this.data)
   this.intervalo =  setInterval(()=> {
      this.watchCourier(this.data)},4000); 
    
  
  }
  async start(){
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Carregando dados da sua entrega...',
      duration: 4000

    })
    await loading.present();
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','X-DV-Auth-Token' : '3DC9BC4A5EF965B466436DEF6375B188E2AB3083' ,'Access-Control-Allow-Origin':'*' })
  }
  async watchCourier(dado){
    let i = dado.order_id
    console.log('carregando...')
    //https://robotapitest.clickentregas.com/api/business/1.1/orders?order_id=


    this.courierRequest('https://robotapitest.clickentregas.com/api/business/1.1/courier?order_id=',i).subscribe(async (returnedStuff) => {
      console.log(returnedStuff);
      console.log(returnedStuff.valueOf())
      let order = JSON.stringify(returnedStuff)
      let foi = JSON.parse(order)
      console.log(foi.courier)
      this.courier = foi.courier;
    });
  }
  courierRequest(url,i){
    console.log(i)

    return this.httpClient.get(`https://axedelivery.herokuapp.com/${url}`+i,this.httpOptions)
  }
 
 
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    clearInterval(this.intervalo)
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
