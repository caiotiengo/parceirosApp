import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-lista-chat',
  templateUrl: './lista-chat.page.html',
  styleUrls: ['./lista-chat.page.scss'],
})
export class ListaChatPage implements OnInit {
  chatsList
  userID
  constructor(public services: ServiceService,public modalController: ModalController, public storage: Storage) { }

  ngOnInit() {
    this.storage.get('id').then(data =>{
      this.userID = data
      this.services.getChats().subscribe(res =>{
        this.chatsList = res.filter( i => i.idLoja === this.userID)
      })
    })
  }
  async presentModal(id) {
    const modal = await this.modalController.create({
      component: ChatPage,
      componentProps:{
        'id':id
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
