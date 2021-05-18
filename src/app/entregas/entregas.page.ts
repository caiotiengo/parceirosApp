import { Component, OnInit } from '@angular/core';
import { NavController, isPlatform, LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import '@capacitor-community/http';
import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ItemPage } from '../item/item.page';
import * as _ from 'lodash';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})
export class EntregasPage implements OnInit {
  nomeDestinatario :string
  endereco :string
  complemento:any
  bairro:string
  pontos: Array<any> = []
  estado:string;
  cidade:string;
  user:any;
  tipoCarro:any;
  pesoEntrega:any;
  precoCalculado:string;
  vendas
  userID
  todas: Array<any> = []
  prevendas: Array<any> = []
  hide = true
  hide2 = false
  idOrder
  pedidoCalculado
  constructor(public storage: Storage, public services: ServiceService,public afStore: AngularFirestore,
    public loadingController: LoadingController, public navCtrl: NavController,public router: Router,private httpClient: HttpClient) { 

  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','X-DV-Auth-Token' : '3DC9BC4A5EF965B466436DEF6375B188E2AB3083' ,'Access-Control-Allow-Origin':'*' })
  }
  ngOnInit() {
    this.start();
    this.get()
    this.precoCalculado = '0.00'
  }
  async start(){
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Carregando...'
    })
    await loading.present();

    this.storage.get('id').then(async x =>{
      this.userID = x;
      console.log(this.userID)
    })

    this.storage.get('usuario').then(async data =>{
      this.user = data;
      this.pontos.push({
        "address":this.user.endereco+','+ this.user.complemento +' - '+ this.user.bairro + ', '+ this.user.cidade+' - '+ this.user.estado,
        "contact_person":{
          "name":this.user.nome,
          "phone":"55"+this.user.ddd + this.user.telefone
        }
      })
      this.services.getVendas().subscribe(y =>{
        this.vendas = y.filter(i => i.lojaUID === this.userID);
        this.vendas.forEach(element => {
          this.todas.push(
            {
              "endereco": element.endereco,
              "telefone":'55' + element.telefoneComprador,
              "nome": element.nomeComprador,
              "nPedido": element.nPedido
            }
          )
          console.log(this.todas)
        });
        console.log(this.vendas)
      })
      await loading.dismiss();

    }, async err =>{
      console.log(err)
      alert(err)
      await loading.dismiss();
    })

  }
  get() {

    this.getRequest('https://robotapitest.clickentregas.com/api/business/1.1').subscribe((returnedStuff) => {
      console.log(returnedStuff);
      
    });
   }

   getRequest(url){
     if(isPlatform('cordova')){
       console.log('capacitor')
      const { Http } = Plugins;
      return from(Http.request({
        method: 'GET',
        url,
        headers: this.httpOptions,
        mode:'cors'

      })).pipe(map(result => result));
     }else{
       return this.httpClient.get(`https://axedelivery.herokuapp.com/${url}`,this.httpOptions)
     }
   }
   postRequest(url,json){
     console.log(json)

     const body = {
      "matter":"Artigos de loja religiosa, produtos frágeis!",
      "points": json,
      "vehicle_type_id":this.tipoCarro,
      "total_weight_kg":this.pesoEntrega,


  }
    console.log(body)

     return this.httpClient.post(`https://axedelivery.herokuapp.com/${url}`,body,this.httpOptions)
   }
    async post(){
      const loading = await this.loadingController.create({
        //cssClass: 'my-custom-class',
        message: 'Pedindo o entregador...'
      })
      await loading.present();

      this.postRequest('https://robotapitest.clickentregas.com/api/business/1.1/create-order', this.pontos).subscribe(async (returnedStuff) => {
        console.log(returnedStuff);
        let order = JSON.stringify(returnedStuff)
       let foi = JSON.parse(order)
       console.log(foi.order.payment_amount)
       console.log(foi.order.order_id)
       this.idOrder = foi.order.order_id
       this.pedidoCalculado  = 'Aguardando Entregador'
        this.afStore.collection('clickEntregas').add({
          order_id: foi.order.order_id,
          matter: foi.order.matter,
          order_name:foi.order.order_name,
          lojaUID: this.userID,
          status_description: foi.order.status_description,
          dataCriada: foi.order.created_datetime
        }).then(async ()=>{
          alert('Estamos procurando um entregador para você!')
          await loading.dismiss();

          this.navCtrl.navigateForward('/entrega');

        }) 

      });
   }
   calculateRequest(url, json){
     console.log(json)
     let pontos = json
    const body = {
      "matter":"Documents",
      "points": json,
      "vehicle_type_id":this.tipoCarro,
      "total_weight_kg":this.pesoEntrega
    }
    return this.httpClient.post(`https://axedelivery.herokuapp.com/${url}`,body,this.httpOptions)
  }
  async calculate(){
    const loading = await this.loadingController.create({
      //cssClass: 'my-custom-class',
      message: 'Calculando...'
    })
    await loading.present();


   this.calculateRequest('https://robotapitest.clickentregas.com/api/business/1.1/calculate-order',this.pontos).subscribe(async (returnedStuff) => {
     console.log(returnedStuff);
     console.log(returnedStuff.valueOf())
     let order = JSON.stringify(returnedStuff)
     let foi = JSON.parse(order)
     console.log(foi.order.payment_amount)
     this.precoCalculado = foi.order.payment_amount;
     this.endereco = undefined
     this.complemento = undefined
     this.bairro = undefined
     this.cidade = undefined
     this.nomeDestinatario = undefined
     await loading.dismiss();

   });
  }
  calDesti(){
    if(this.endereco != undefined){
      if(this.complemento != undefined){
       if(this.bairro != undefined){
         if(this.nomeDestinatario != undefined){
           if(this.cidade != undefined){
            this.pontos.push({
              "address":this.endereco+','+ this.complemento +' - '+ this.bairro + ', '+ this.cidade+' - '+ 'RJ',
              "contact_person":{
                "name":this.nomeDestinatario,
                "phone":"5521974077896"
              },

            })
            this.calculate()
            console.log(this.pontos)
          }else{
            alert('Verifique o campo cidade e tente novamente.')
            // this.valor = items.valor
             // this.updateprod(items)
            }
          }else{
            alert('Verifique o campo Nome do Destinatário e tente novamente.')
            // this.qtd = items.quantity;
          }
        }else{
          alert('Verifique o campo Complemento e tente novamente.')
          // this.resumo = items.resumo
        }
      }else{
        alert('Verifique o campo Complemento e tente novamente.')
        // this.nomePrd = items.product;
      }
     }else{
      alert('Verifique o campo Endereço e tente novamente.')
      // this.type = items.tipoPrd

     } 
      


  }
  calculateAll(){
    this.prevendas.forEach(data =>{
      this.pontos.push({
        "address": data.endereco,
        "contact_person":{
          "name":data.nome,
          "phone":data.telefone
        }
      })
      console.log(this.pontos)
      
    })
    this.calculate()
  }
  addDestinoAlt(){
    this.endereco = undefined
    this.complemento = undefined
    this.bairro = undefined
    this.cidade = undefined
    this.nomeDestinatario = undefined
  }
  itemSelected(e,pedido, i){
    var isChecked = e.currentTarget.checked;
    console.log(isChecked)
    if(isChecked === false){
      this.prevendas.push({
        "endereco": pedido.endereco,
        "telefone":'55' + pedido.telefone,
        "nome": pedido.nome,
        "nPedido": pedido.nPedido
      })
      
      console.log(this.prevendas)
    }else{
     console.log('nada')
     _.remove(this.prevendas, i => i.nPedido === pedido.nPedido)
     console.log(this.prevendas)
    }

  }
  pedidosFora(){
    this.hide2 = true;
    this.hide = false;
  }
  pedidosDentro(){
    this.hide2 = false;
    this.hide = true;
  }
  removerLista(i){
    console.log(i)
    this.pontos.splice(i)

    console.log(this.pontos)
  }
}
