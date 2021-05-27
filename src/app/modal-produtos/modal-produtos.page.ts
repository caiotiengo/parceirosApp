import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ServiceService } from '../service.service';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-modal-produtos',
  templateUrl: './modal-produtos.page.html',
  styleUrls: ['./modal-produtos.page.scss'],
})
export class ModalProdutosPage implements OnInit {
  nomePrd = '';
  email = '';
  tellme = '';
  valor='';
  nomeLoja = '';
  LikeValue: number;
  DislikeValue: number;
  autor: string;
  type = '';
  resumo = '';
  mainuser;
  sub;
  name;
  nome = '';
  variedade = '';
  boss;
  procUser: any ;
  que;
  url
  public donwloadUrl: Observable<string>;
  public uploadPercent: Observable<number>;
  public formulario : FormGroup;
  photos: Array<any> = [];
  check: Array<any> = [];
  tipoPrd
  qtd: number
  hide = true;
  lojaUID
  estado
  todosx = false;
  @Input() produto: any;
  loja
  constructor( public navCtrl: NavController, public afStore: AngularFirestore,public modalz:ModalController,public router:Router,public services:ServiceService, public storage: Storage) { }

  ngOnInit() {
    console.log(this.produto)
    this.storage.get('usuario').then(data =>{
      this.loja = data;
      console.log(this.loja)
      this.storage.get('id').then(res =>{
        this.lojaUID = res
        console.log(this.lojaUID)
      })
    })
  }
  abrir(){
    this.hide = false;
    this.todosx = true;
  }
  validade(){
     if(this.qtd != null){
       if(this.valor != ''){
          this.create();
        }else{
          alert('Por favor, preencha o campo "Valor"') 
        }
     }else{
        alert('Por favor, informe a "Quantidade"') 
    }    
     
  }
  caio(){
    var valorN
    var valorS
    valorN = String(this.valor).replace(',','')
    valorS = String(this.valor).replace(',','.')
    console.log(valorN)
    console.log(valorS)
    console.log(this.valor)
  }
  create() {
    this.photos.push({fotoN:'ionic.fotoSUB',
    link:String(this.produto.foto)})
      if (this.lojaUID) {
      var valorN
      var valorS
      valorN = String(this.valor).replace(',','')
      valorS = String(this.valor).replace(',','.')
        this.afStore.collection('produto').add({
          nome: this.produto.Produto,
          email: this.loja.email,
          valor: Number(valorS),
          tipoPrd: this.produto.Categoria,
          resumo: this.produto.Produto,
          product: this.produto.Produto,
          quantity: Number(this.qtd),
          detail:  this.resumo,
          price: Number(valorN),
          fotos: this.photos,
          especi: this.check,
          noApp: "Sim",
          estado: this.loja.estado,
          lojaUID: this.lojaUID,
          aprovado: "Sim",
          nomeLoja: this.loja.nome
        });
      }
      alert('Obrigado! Seu produto estará disponível em breve!');
      this.photos = []
      this.dismiss()
      console.log('aqui foi');
}
  addItem(){
    if(this.variedade != ''){
      this.check.push({
        name: 'checkbox2',
        type: 'radio',
        label: this.variedade ,
        value:  this.variedade 
      })
      this.variedade = '';
      console.log(this.check)
    }else{
      alert('Coloque um nome para variedade!')
    }
    
  }
  deletaItem(items){
    _.remove(this.check, n => n.value === items.value);
    console.log(this.check);
    
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalz.dismiss({
      'dismissed': true
    });
  }
}
