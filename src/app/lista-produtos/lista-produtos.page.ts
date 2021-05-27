import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalProdutosPage } from '../modal-produtos/modal-produtos.page';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {

  listaProdutos
  constructor(public services: ServiceService, public modalController: ModalController) { }

  ngOnInit() {
    this.load();
  }
  async presentModal(items){
    const modal = await this.modalController.create({
      component: ModalProdutosPage,
      cssClass: 'my-custom-class-prod',
      componentProps: {
        'produto':items
      }
    });
    return await modal.present();
  }
  load(){
    this.services.data4().then(data =>{
      console.log(data)
      this.listaProdutos = data
    })
  }

}
