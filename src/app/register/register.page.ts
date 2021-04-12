import { Component, OnInit } from '@angular/core';
import moipSdk from 'moip-sdk-node'
import { ServiceService } from '../service.service';
import { NavController, ModalController } from '@ionic/angular';
import { PoliticaPage } from '../politica/politica.page';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email:string;
  senha:string;
  primeiraDiv = true;
  segundaDiv = true;
  terceiraDiv = true;
  quartaDiv = true;
  started = false;
  hider = true;
  moip
  Es
  states
  cidades: Array<any> = [];
  estado:string;
  errosFirebase;
  bancos;
  errosFirebaseLoad;
  bancosLoad;
  bank
  numeroBanco:number
  nomeBanco:string
  constructor(public services: ServiceService, private modalController: ModalController, public navCtrl:NavController) {

    this.moip = moipSdk({
      /*
      token: 'C5LQHXVYGJLN0XYSTRZCQY6LRQZVV6AR',
      key: 'LNRERY9ULDQSPBXYR2BTJLNKRKLWTPEIUKAV9E1Z',
      production: false
           idmoip account "MPA-CC3641B4B904"
      */
  
      accessToken: '292bed0bd3244409b835986edca4119f_v2',
      secret:'cf87986f39c342caa5d9a49c6c166a2a',
      key: 'Y4UDSTTB0JSJC6UPCQPGLMGPHQT7MEHCDM1FERDI',
      channelId:"APP-16HIIBI5HPS8",
      production: true,
      "Accept" : "*/*"
      //token: 'Z9KP0SCKJ2UZGWSGYXUJCZOU0BVMB1QN',
      //id moip account prod "MPA-888C5307676A"
  
    })

   }

  ngOnInit() {
    this.services.data().then(x =>{
      this.states = x;
      console.log(this.states)
    })
    this.services.data2().then(y =>{
      this.bank = y;
      this.bancos = this.bank.bancos
      this.bancosLoad = this.bank.bancos
      console.log(this.bancos)
    })
    this.services.data3().then(z =>{
      this.errosFirebase = z;
      console.log(this.errosFirebase)
    })

  }
  city(evt){
    console.log(evt.srcElement.value)
    this.estado = evt.srcElement.value;
    let estado =  this.states.estados.filter(i => i.sigla === this.estado)
      console.log(estado[0].cidades)
      this.cidades =[];
      estado[0].cidades.forEach(element => {

        this.cidades.push({
          nome:element,
          estado:this.estado
        })
      });
  }

  // ------------ Bancos ------------ //
  updateBusca(item){
    console.log(item)
    this.hider = true
    this.numeroBanco = Number(item.value)
    this.nomeBanco = item.label

  }

  initializeItems(): void {
    this.bancos = this.bancosLoad;
    this.hider = false


  }
  buscaBanco(evt){

    this.initializeItems();

    const searchTerm = evt.srcElement.value;
    console.log(searchTerm)
    
    if (!searchTerm) { 
      return;
     }
    this.bancos = this.bancosLoad.filter(currentGoal => {
       if (currentGoal.label && searchTerm) {
          
        if (currentGoal.label.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
           // this.hider = true;
            
            return true;
           } else {   
             return false;
           }
       }
     });
  }
  voltar(){
    this.navCtrl.pop()
  }
  iniciar(){

    this.started = false
    this.primeiraDiv = true;
    this.segundaDiv = true;
    this.terceiraDiv = true;
    this.quartaDiv = true;
  }

  primeiroPasso(){

    this.started = true
    this.primeiraDiv = false;
    this.segundaDiv = true;
    this.terceiraDiv = true;
    this.quartaDiv = true;
  }
  segundoPasso(){
    console.log(this.email)
    console.log(this.senha)
    this.started = true
    this.primeiraDiv = true;
    this.segundaDiv = false;
    this.terceiraDiv = true;
    this.quartaDiv = true;
  }
  terceiroPasso(){
    this.started = true
    this.primeiraDiv = true;
    this.segundaDiv = true;
    this.terceiraDiv = false;
    this.quartaDiv = true;
  }
  quartoPasso(){
    this.started = true
    this.primeiraDiv = true;
    this.segundaDiv = true;
    this.terceiraDiv = true;
    this.quartaDiv = false;
  }
  politica(){
    this.presentModal();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PoliticaPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  
}
