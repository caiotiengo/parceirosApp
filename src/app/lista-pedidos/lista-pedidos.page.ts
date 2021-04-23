import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPassosPage } from '../modal-passos/modal-passos.page';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ItemPage } from '../item/item.page';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {
  userID:any;
  user:any;
  vendas:any;
  constructor(public navCtrl: NavController,public router:Router,public services:ServiceService, public storage: Storage, public modal:ModalController) { }

  ngOnInit() {
    this.start()
  }
  start(){
    this.storage.get('id').then(y => {
      this.userID = y;
     console.log(this.userID)

      if(this.userID === null || this.userID === undefined){
        this.navCtrl.navigateForward('')
      }else{
        this.services.getLoja(this.userID).subscribe(da =>{
          this.user = da;
          this.storage.set('usuario',this.user).then(res =>{
            console.log(res)
          })
          console.log(this.user)
        })
        this.services.getVendas().subscribe(prod =>{
          this.vendas = prod.filter(i =>i.lojaUID === this.userID)
          console.log(this.vendas)
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
  listaOrc(){
    this.navCtrl.navigateForward('/lista-orcamentos')
  }
}
