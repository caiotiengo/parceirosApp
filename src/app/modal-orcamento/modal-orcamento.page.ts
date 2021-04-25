import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal-orcamento',
  templateUrl: './modal-orcamento.page.html',
  styleUrls: ['./modal-orcamento.page.scss'],
})
export class ModalOrcamentoPage implements OnInit {
  @Input() orcamento;
  @Input() id;

  quantidade: number;
  quantidade2: number;
  valor:any;
  produtos: Array<any> = [];
  foto:any;
  photos: Array<any> = [];
  fotinhas: Array<any> = [];
  url
  public donwloadUrl: Observable<string>;
  public uploadPercent: Observable<number>;
  barStatus = false;
  imageUploads = [];
  evento: Array<any> = [];
  files: Array<any> = [];
  city: Array<any> = [];
  constructor(public storage: Storage,public loading: LoadingController,public services:ServiceService, public modalz:ModalController) { }

  ngOnInit() {
    console.log(this.orcamento)
    console.log(this.foto)
    this.quantidade = this.orcamento.quantity
    this.quantidade2 = this.orcamento.quantity
  }
  adicionar(){

    this.quantidade += 1;
    
    console.log(this.quantidade)
  }
  retirar(){

    this.quantidade -= 1;
    console.log(this.quantidade)
  }
  updateOrc(){
    let valor = this.valor.replace(',','')
    this.produtos.push({
      nome: this.orcamento.nome,
      quantity: this.quantidade,
      obs:this.orcamento.obs,
      valor: valor,
      foto:this.foto,
      disponivel: true
    })
    console.log(this.produtos)
    this.dismiss()
  }
  notHave(){
    this.produtos.push({
      nome: this.orcamento.nome,
      quantity: this.quantidade,
      obs:this.orcamento.obs,
      valor: 0,
      foto:this.foto,
      disponivel: false
    })
    console.log(this.produtos)
    this.dismiss()
  }

  imageName() {
    const newTime = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * 20) + newTime;
  }
  async uploadPhoto(event) {
    const loading = await this.loading.create({
      cssClass: 'my-custom-class',
      message: 'Carregando a foto...',
    });
    await loading.present();
    this.barStatus = true;
    const idFoto = this.imageName();
    this.evento = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        this.services.storeImage(file).then(
          async (res: any) => {
              if (res) {
                  console.log(res);
                  this.foto = res;
                  this.imageUploads.unshift(res);
                  this.barStatus = false;
                  await loading.dismiss();

          }
        },
        (error: any) => {
          console.log(error)
            this.barStatus = false;
        });
        
      } 
    }
}
  dismiss(){
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalz.dismiss({
      'dismissed': true,
      data: this.produtos,
      id: this.id

    });
  }
}
