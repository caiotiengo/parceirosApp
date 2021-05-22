import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPassosPage } from '../modal-passos/modal-passos.page';
import { Storage } from '@ionic/storage';
import { ServiceService, Processo } from '../service.service';
import { Router } from '@angular/router';
import { ItemPage } from '../item/item.page';
import { ModalOrcamentoPage } from '../modal-orcamento/modal-orcamento.page';
import { BrMaskDirective, BrMaskModel } from 'br-mask';

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
  produtos: Array<any> = [];
  produto = '';
  testy
  valorTotal
  constructor(public navCtrl: NavController,public brMask: BrMaskDirective,public router:Router,public services:ServiceService, public storage: Storage, public modale:ModalController) { }

  ngOnInit() {
    this.start()
    this.valorTotal = 0
    this.orcamento.orcamento.forEach(element => {
      this.produtos.push({
        nome:element.nome,
        quantity:element.quantity,
        obs:element.obs,
        foto: undefined,
        valor:0,
        disponivel: 'Não avaliado'
      })
    });
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
      console.log(this.valorTotal)
      console.log(this.orcamento.valorFrete)
      var x = this.valorTotal.replace('.', '')
     // var x = this.valorTotal.replace(',', '')
      var y = Number(x)
      console.log(y)
      var z = x.replace(',','.')
      var h = this.orcamento.valorFrete
      console.log(h)
      var o = Number(z) + Number(h)
      var valor = o.toFixed(2)
      console.log(o)
      console.log(x)
      console.log(this.orcamento.id, y, valor, this.produtos, x )
      this.services.updateOrcamentoVal(this.orcamento.id, y, valor, this.produtos, x)
      this.dismiss()
 
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
    this.modale.dismiss({
      'dismissed': true
    });
  }
  async modalAnswer(itens,i){
    const modal = await this.modale.create({
      componentProps:{
        'orcamento': itens,
        'id': i
      },
      showBackdrop:true,
      component: ModalOrcamentoPage,
      cssClass: 'my-custom-modal-css'
    });
     await modal.present();
     await modal.onDidDismiss().then((r) => {
      this.testy = r.data.data;
      let id = r.data.id
      console.log(id)
      if(this.testy === undefined){
        console.log("indefinido")
      }else{
        this.produtos.splice(id, 1)
        this.testy.forEach(element => {
          this.produtos.push(element)
        });
        console.log("the result:", r , 'test'+ this.testy);
        console.log(this.produtos)
        this.somaTudo()
      }

    })
  }
  somaTudo(){
    let mapVal = this.produtos.map(i => Number(i.valor)).reduce((a, b) =>   a + b, 0 )
    console.log(mapVal)
    if(mapVal){
      const config: BrMaskModel = new BrMaskModel()
      config.money = true;
      this.valorTotal =  this.brMask.writeValueMoney(String(mapVal),config)
      //this.valorTotal = mapVal
    }
  }
}
