import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPassosPage } from '../modal-passos/modal-passos.page';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ItemPage } from '../item/item.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    this.statusBar.overlaysWebView(false); 
    this.statusBar.backgroundColorByHexString("#f1f5f8")
    this.statusBar.show();
    this.statusBar.styleLightContent();
    this.storage.get('id').then(y => {
      this.userID = y;
     console.log(this.userID)

      if(this.userID === null || this.userID === undefined){
        this.navCtrl.navigateForward('')
      }else{
        this.services.getLoja(this.userID).subscribe(da =>{
          this.user = da;
          if(this.user.tipo === "Loja"){
            this.storage.set('usuario',this.user).then(res =>{
              console.log(res)
            })
            console.log(this.user)
          }else{
            this.storage.clear()
            alert('Você não tem uma conta de lojista, Baixe o App "Axé Delivery" ou cadastre sua loja na página anterior!');
            this.navCtrl.navigateRoot('/')
          }

        })
        this.services.getVendas().subscribe(prod =>{
          this.vendasAguardando = prod.filter(i =>i.lojaUID === this.userID && i.statusEnt === "Loja informada")
          console.log(this.vendasAguardando)
        })
      }

    })
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
