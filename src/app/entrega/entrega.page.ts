import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../service.service';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.page.html',
  styleUrls: ['./entrega.page.scss'],
})
export class EntregaPage implements OnInit {
  userID:any;
  entregasList: Array<any> = [];
  constructor(public services: ServiceService,public modalController: ModalController, public storage: Storage,public loadingController: LoadingController, public navCtrl: NavController,public router: Router,private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','X-DV-Auth-Token' : '37EEFF5A69728562254333417A15029D4A2B673E' ,'Access-Control-Allow-Origin':'*' })
  }

  //producao 37EEFF5A69728562254333417A15029D4A2B673E
  // dev 3DC9BC4A5EF965B466436DEF6375B188E2AB3083
  ngOnInit() {
    this.start()
  }
  async start(){
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Carregando...'
    })
    await loading.present();
    this.services.getEntregas().subscribe(data=>{
      console.log(data)
      this.entregasList = []

      this.storage.get('id').then(async sub =>{
        this.userID = sub
        let entregas = data
        entregas.forEach(e =>{
          this.callOrder(e.order_id)
        })
        await loading.dismiss();
      })
      

    })
  }

 async callOrder(i){
    //https://robotapitest.clickentregas.com/api/business/1.1/orders?order_id=
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Listando suas entregas...'
    })
    await loading.present();

    this.postRequest('https://robot.clickentregas.com/api/business/1.1/orders?order_id=',i).subscribe(async (returnedStuff) => {
      console.log(returnedStuff);
      this.entregasList.push(returnedStuff)
      console.log(this.entregasList)
      await loading.dismiss();

    });
  }
  postRequest(url,i){
    console.log(i)

    return this.httpClient.get(`https://axedelivery.herokuapp.com/${url}`+i,this.httpOptions)
  }
   async post(){
    
  }
  goPedido(){
    this.navCtrl.navigateForward('/entregas')
  }
  async presentModal(itens) {
    const modal = await this.modalController.create({
      component: ExploreContainerComponent,
      componentProps:{
        'data':itens
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
