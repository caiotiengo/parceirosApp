import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPassosPage } from '../modal-passos/modal-passos.page';
import { Storage } from '@ionic/storage';
import { ServiceService, Processo } from '../service.service';
import { Router } from '@angular/router';
import { ItemPage } from '../item/item.page';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.page.html',
  styleUrls: ['./orcamento.page.scss'],
})
export class OrcamentoPage implements OnInit {
  @Input() orcamento;
  userID
  user
  valor = '';
  produtos: Array<Processo> = [];
  produto = '';
  constructor(public navCtrl: NavController,public router:Router,public services:ServiceService, public storage: Storage, public modal:ModalController) { }

  ngOnInit() {
    this.start()
    this.produtos.push(this.orcamento)
    console.log(this.produtos)
  }
  start(){
    console.log(this.orcamento.id)
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
      }

    })
  }
  enviarPro(){
    if(this.valor != ''){
      console.log(this.valor)
      var x = this.valor.replace(',', '')
      var y = Number(x)
      this.services.updateOrcamentoVal(this.orcamento.id, y, this.valor)
    }else{
      alert('Por favor, digite o valor para o orçamento do seu cliente!')
    }
  }
  adicionar(index:number){
    console.log(index)

    this.produtos[index].quantity += 1;
    
    console.log(this.produtos[index])
  }
  retirar(index:number){
    console.log(index)

    this.produtos[index].quantity -= 1;
    console.log(this.produtos[index])
  }
  dismiss(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modal.dismiss({
      'dismissed': true
    });
  }
}
