import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPassosPage } from '../modal-passos/modal-passos.page';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ItemPage } from '../item/item.page';
import { OrcamentoPage } from '../orcamento/orcamento.page';

@Component({
  selector: 'app-lista-orcamentos',
  templateUrl: './lista-orcamentos.page.html',
  styleUrls: ['./lista-orcamentos.page.scss'],
})
export class ListaOrcamentosPage  {
  userID:any;
  user:any;
  orcamentos:any;
  testy:any
  constructor(public navCtrl: NavController,public router:Router,public services:ServiceService, public storage: Storage, public modal:ModalController) { }

  ionViewDidEnter() {
    this.start()
  }
  start(){
    this.storage.get('id').then(y => {
      this.userID = y;
     console.log(this.userID)

      if(this.userID === null || this.userID === undefined){
        this.navCtrl.navigateRoot('/')
      }else{
        this.services.getLoja(this.userID).subscribe(da =>{
          this.user = da;
          this.storage.set('usuario',this.user).then(res =>{
            console.log(res)
          })
          console.log(this.user)
        })
        this.services.getOrcamentos().subscribe(prod =>{
          this.orcamentos = prod.filter(i =>i.idLoja === this.userID)
          console.log(this.orcamentos)
        })
      }

    })
  }
  async modalItem(itens) {
    const modal = await this.modal.create({
      componentProps:{
        'orcamento': itens
      },
      component: OrcamentoPage,
      cssClass: 'my-custom-class'
    });
  return await modal.present();
  }
}
