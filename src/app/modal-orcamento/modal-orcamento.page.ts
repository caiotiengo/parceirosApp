import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../service.service';
import { Observable } from 'rxjs';
import { BrMaskDirective, BrMaskModel } from 'br-mask';

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
  qtdRes: number;
  qtdRes2:number;
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
  constructor(public storage: Storage,public loading: LoadingController,public brMask: BrMaskDirective,public services:ServiceService, public modalz:ModalController) { }

  ngOnInit() {
    console.log(this.orcamento)
    this.produtos.push(this.orcamento)
    console.log(this.produtos)
    console.log(this.foto)
    this.quantidade = this.orcamento.quantity
    this.quantidade2 = this.orcamento.quantity
    this.qtdRes = this.orcamento.quantity
    this.qtdRes2 = this.orcamento.quantity
  }
  adicionar(){

    this.qtdRes += 1;
    
    console.log(this.qtdRes)
  }
  retirar(){

    this.qtdRes -= 1;
    console.log(this.qtdRes)
  }
  updateOrc(){
    if(this.valor){
      const config: BrMaskModel = new BrMaskModel()
      config.money = true;
      this.orcamento.valorHTML =  this.brMask.writeValueMoney(String(this.valor),config)
      //this.valorTotal = mapVal
    }
      console.log(this.valor)
      let valor = this.valor.replace(',','')
      this.orcamento.nome = this.orcamento.nome;
      this.orcamento.quantity = this.quantidade;
      this.orcamento.obs = this.orcamento.obs;
      this.orcamento.qtdRes = this.qtdRes;
      this.orcamento.valor = valor;
      if(this.foto === undefined){
        this.orcamento.foto = "Sem foto";

      }else{
        this.orcamento.foto = this.foto;

      }
      this.orcamento.disponivel = true;
    console.log(this.produtos)
    this.dismiss()
  }
  notHave(){
      this.orcamento.valorHTML = '0'
      var valor = "0000"
      this.orcamento.nome = this.orcamento.nome;
      this.orcamento.quantity = this.quantidade;
      this.orcamento.obs = this.orcamento.obs;
      this.orcamento.qtdRes = this.qtdRes;
      this.orcamento.valor = valor ;

      if(this.foto === undefined){
        this.orcamento.foto = 'Sem foto';

      }else{
        this.orcamento.foto = this.foto;

      }
      this.orcamento.disponivel = false;
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
    console.log(this.produtos)
    this.modalz.dismiss({
      'dismissed': true,
      data: this.produtos,
      id: this.id

    });
  }
}
