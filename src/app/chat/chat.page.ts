import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../service.service';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @Input() id ;
  chatou
  semChat:number;
  novaMsg
  userID
  constructor(public services: ServiceService, public storage: Storage,public modalController: ModalController) { }

  ngOnInit() {
    this.start()
  }

  async start(){
    this.storage.get('id').then(data =>{
      this.userID = data;
      this.services.getChat(this.id).subscribe(res =>{
        console.log(res)
        this.chatou = res
        this.semChat = this.chatou.mensagens.length;
        console.log(this.semChat)
      })
    })

  }
  enviar(){
    if(!this.novaMsg){

    }else{
      var message = this.novaMsg;
      var emailExp = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/img;
     // var linksExp = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
      var phoneExp = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/img;
      console.log(message.replace(phoneExp, '************'))
      var messageE = message.replace(phoneExp,'***********').replace(emailExp,'**************')
      this.services.updateChat(this.id,messageE)
      this.novaMsg = '';
    }


  	// aqui eu farei o envio da mensagem, mas eu não consigo achar um PUSH para o firebase. só consigo atualizar um item
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    //clearInterval(this.intervalo)
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
