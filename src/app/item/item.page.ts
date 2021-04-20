import { Component, OnInit, Input } from '@angular/core';
import {AlertController, NavController, ModalController, LoadingController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {ServiceService} from '../service.service';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  @Input() venda ;
  itemAberto;
  que;
  itemVenda;
  typeUser;
  statusEnt = '';
  emailUsr;
  sub;
  private goalList: any[];
  private loadedGoalList: any[];
  tipoCarro:any;
  pesoEntrega:any;
  pontos: Array<any> = []
  user
  pedidoCalculado:string;
  idOrder:any;
  userID:any;
  constructor( public navCtrl: NavController,private httpClient: HttpClient, private route: ActivatedRoute,  public afStore: AngularFirestore,
    public services: ServiceService,public loadingController: LoadingController,public modalController: ModalController,
    public alertCtrl: AlertController, private storage: Storage) { }
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','X-DV-Auth-Token' : '3DC9BC4A5EF965B466436DEF6375B188E2AB3083' ,'Access-Control-Allow-Origin':'*' })
    }
  ngOnInit() {
    console.log(this.venda)
    this.start()
    this.pedidoCalculado = "undefined"
    console.log(this.pedidoCalculado)
  }
  async start(){
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Carregando...'
    })
    await loading.present();

    this.storage.get('id').then(dat =>{
      this.userID = dat
    })

    this.storage.get('usuario').then(async data =>{
      this.user = data;
      this.pontos.push({
        "address":this.user.endereco+','+ this.user.complemento +' - '+ this.user.bairro + ', '+ this.user.cidade+' - '+ this.user.estado,
        "contact_person":{
          "name":this.user.nome,
          "phone":"55"+this.user.ddd + this.user.telefone
        }
      })
      console.log(this.pontos)
      this.pontos.push({
        "address":this.venda.endereco,
        "contact_person":{
          "name":this.venda.nomeComprador,
          "phone":"55"+this.user.ddd + this.venda.telefoneComprador
        }
      })
      await loading.dismiss();

    }, async err =>{
      console.log(err)
      alert(err)
      await loading.dismiss();
    })
  }
  voltar(){
  	this.navCtrl.pop()
  }

  save() {
    if(this.venda.statusPag === 'Em dinheiro'){
      this.que = this.route.snapshot.paramMap.get('id');

      this.services.vendasCollection.doc<any>(this.venda.id).update({statusEnt: this.statusEnt }).then(() =>{
        this.dismiss()
  
        this.navCtrl.navigateRoot('/status').then(() =>{
          this.dismiss()
          alert('Status atualizado! O cliente já foi informado!')
  
        })
  
      });
    }else if(this.venda.statusPag === 'Aprovado' ){
      this.que = this.route.snapshot.paramMap.get('id');

      this.services.vendasCollection.doc<any>(this.venda.id).update({statusEnt: this.statusEnt }).then(() =>{
        this.dismiss()
  
        this.navCtrl.navigateRoot('/home').then(() =>{
          this.dismiss()
          alert('Status atualizado! O cliente já foi informado!')
  
        })
  
      });
    }else if(this.venda.statusPag === 'Débito presencial' ){
      this.que = this.route.snapshot.paramMap.get('id');

      this.services.vendasCollection.doc<any>(this.venda.id).update({statusEnt: this.statusEnt }).then(() =>{
        this.dismiss()
  
        this.navCtrl.navigateRoot('/home').then(() =>{
          this.dismiss()
          alert('Status atualizado! O cliente já foi informado!')
  
        })
  
      });
    }else{
      alert('Você não pode atualizar o status de um pedido ainda não aprovado.')
    }

  }
  postRequest(url,json){
    console.log(json)

    const body = {
     "matter":"Artigos de loja religiosa, produtos frágeis!",
     "points": json,
     "vehicle_type_id":8,
     "total_weight_kg":1,


 }
   console.log(body)

    return this.httpClient.post(`https://axedelivery.herokuapp.com/${url}`,body,this.httpOptions)
  }
   async post(){
     const loading = await this.loadingController.create({
       //cssClass: 'my-custom-class',
       message: 'Pedindo o entregador...'
     })
     await loading.present();

     this.postRequest('https://robotapitest.clickentregas.com/api/business/1.1/create-order', this.pontos).subscribe(async (returnedStuff) => {
       console.log(returnedStuff);
       let order = JSON.stringify(returnedStuff)
       let foi = JSON.parse(order)
       console.log(foi.order.payment_amount)
       //this.pedidoCalculado = foi.order.payment_amount
       console.log(foi.order.order_id)
       this.idOrder = foi.order.order_id
       this.pedidoCalculado  = 'Aguardando Entregador'
       console.log(this.idOrder);
       this.services.vendasCollection.doc<any>(this.venda.id).update({statusEnt: 'Aguardando Entregador' }).then(()=>{
         this.afStore.collection('clickEntregas').add({
           order_id: foi.order.order_id,
           matter: foi.order.matter,
           order_name:foi.order.order_name,
           lojaUID: this.userID,
           status_description: foi.order.status_description,
           dataCriada: foi.order.created_datetime
         }).then(()=>{
           this.dismiss()
           alert('Estamos procurando um entregador para você!')
           this.navCtrl.navigateForward('/entrega');

         })
       })

       await loading.dismiss();

     });
  }
  calculateRequest(url, json){
    console.log(json)
    let pontos = json
   const body = {
     "matter":"Documents",
     "points": json,
     "vehicle_type_id":this.tipoCarro,
     "total_weight_kg":this.pesoEntrega
   }
   return this.httpClient.post(`https://axedelivery.herokuapp.com/${url}`,body,this.httpOptions)
 }
 async calculate(){
   const loading = await this.loadingController.create({
     //cssClass: 'my-custom-class',
     message: 'Calculando Entrega para o cliente...'
   })
   await loading.present();


  this.calculateRequest('https://robotapitest.clickentregas.com/api/business/1.1/calculate-order',this.pontos).subscribe(async (returnedStuff) => {
    console.log(returnedStuff);
    console.log(returnedStuff.valueOf())
    let order = JSON.stringify(returnedStuff)
    let foi = JSON.parse(order)
    console.log(foi.order.payment_amount)
    this.pedidoCalculado = foi.order.payment_amount

    this.services.vendasCollection.doc<any>(this.venda.id).update({statusEnt: 'Preparando Entrega' })

    await loading.dismiss();

  });
 }
 cancelarRequest(url,id){

   const body = {
     "order_id": id
   }
   console.log(body)
  return this.httpClient.post(`https://axedelivery.herokuapp.com/${url}`,body,this.httpOptions)

 }
async cancelar(i){
  console.log(i)

  const loading = await this.loadingController.create({
    //cssClass: 'my-custom-class',
    message: 'Calculando pedido...'
  })
  await loading.present();


 this.cancelarRequest('https://robotapitest.clickentregas.com/api/business/1.1/cancel-order',i).subscribe(async (returnedStuff) => {
   console.log(returnedStuff);
   console.log(returnedStuff.valueOf())
 
   //this.services.vendasCollection.doc<any>(this.que).update({statusEnt: 'Cancelado' })

   await loading.dismiss();

 });
}
  dismiss(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  load() {
    this.que = this.route.snapshot.paramMap.get('id');

    this.itemVenda = this.services.getStatusProd(this.que).subscribe(data => {
      this.venda = data;
      console.log(this.venda);
    });
  }

}
