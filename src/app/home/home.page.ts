import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPassosPage } from '../modal-passos/modal-passos.page';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ItemPage } from '../item/item.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userID:any;
  user:any;
  vendasAguardando:any;
  constructor(private statusBar: StatusBar,public navCtrl: NavController,public router:Router,public services:ServiceService, public storage: Storage, public modal:ModalController) { }
  slidesOptions = {
    slidesPerView: 1.5
  }
  ngOnInit() {
  /*  this.userID = ''
    const usr = firebase.default.auth().currentUser
    console.log(usr.uid)
      this.userID = usr.uid;
     console.log(this.userID)
     this.storage.set('id', this.userID)

      if(this.userID != null || this.userID != undefined){
        console.log(this.userID)
        this.services.getLoja(usr.uid).subscribe(da =>{
          console.log(this.userID)

          this.user = da;
          console.log(this.user + this.userID)
          this.storage.set('usuario',this.user)
          
        })
        this.services.getVendas().subscribe(prod =>{
          this.vendasAguardando = prod.filter(i =>i.lojaUID === this.userID.uid && i.statusEnt === "Loja informada")
          console.log(this.vendasAguardando)
        })
      }else{
        this.navCtrl.navigateRoot('')

      }
      */
  }
async ionViewDidEnter() {
 // this.storage.remove('carrinhoUser')
  if(this.router.url === '/home'){
    this.storage.get('id').then((data) =>{
      console.log(data)
      this.services.getProc(data).subscribe(us =>{
        this.user = us
        console.log(this.user)
      })
    })
  }else{
    console.log('vaxou')
  }




}

  async modalItem(itens) {
    const modal = await this.modal.create({
      componentProps:{
        'venda': itens
      },
      component: ItemPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  entregasPage(){
    //let user = this.user
   // console.log(user)
    this.router.navigate(['/entrega'])
  }
  ganhosPage(){
    this.navCtrl.navigateForward('/ganhos')
  }
  produtosPage(){
    this.navCtrl.navigateForward('/produtos')
  }
  editarPage(){
    this.navCtrl.navigateForward('/user')
  }
  chatPage(){
    this.navCtrl.navigateForward('/lista-chat')
  }
  pedidosPage(){
    this.navCtrl.navigateForward('/lista-pedidos')
  }
}
