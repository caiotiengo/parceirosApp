import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import {AlertController} from '@ionic/angular';
import {ServiceService} from '../service.service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform } from '@ionic/angular';
import {Observable} from 'rxjs'
import {
  MediaCapture,
  MediaFile,
  CaptureError
} from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import {finalize} from 'rxjs/operators';
import * as _ from 'lodash';

export interface Foto {
    fotoN: string;
    link?: any;
}
export interface CheckBox{
    name: string;// 'checkbox2',
    type: string; //'checkbox',
    label: string;// 'Checkbox 2',
    value: string; //'value2'
  
}
@Component({
  selector: 'app-add-proc',
  templateUrl: './add-proc.page.html',
  styleUrls: ['./add-proc.page.scss'],
})
export class AddProcPage implements OnInit {
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
  photos: Array<Foto> = [];
  check: Array<CheckBox> = [];
  tipoPrd
  qtd: number
  hide = true;
  lojaUID
  estado
constructor(public navCtrl: NavController, public afStore: AngularFirestore,
            public alertCtrl: AlertController,
            public services: ServiceService,
            private platform: Platform,private camera: Camera,
             private afStorage: AngularFireStorage,
            private mediaCapture: MediaCapture,
            private file: File,
            private media: Media) {

  
}
abrir(){
  this.hide = false;
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
    alert('Coloque um valor para variedade!')
  }
  
}
ngOnInit() {
}
deletaItem(items){
  _.remove(this.check, n => n.value === items.value);
  console.log(this.check);
  
}
async abrirGaleria1(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      //mediaType: this.camera.MediaType.PICTURE
  }
  try{
    const fileUri: string = await this.camera.getPicture(options)
    let file: string

    if(this.platform.is('ios')){
      file = fileUri.split('/').pop();
    }else{
      file = fileUri.substring(fileUri.lastIndexOf('/')+1, fileUri.indexOf('?'))
    }
    const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
    const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file)
    const blob: Blob = new Blob([buffer],{type:'image/jpeg'})
    this.uploadPicture(blob)
  }catch(error){
    console.error(error)
  }

}
async abrirGaleria2(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      //mediaType: this.camera.MediaType.PICTURE
  }
  try{
    const fileUri: string = await this.camera.getPicture(options)
    let file: string

    if(this.platform.is('ios')){
      file = fileUri.split('/').pop();
    }else{
      file = fileUri.substring(fileUri.lastIndexOf('/')+1, fileUri.indexOf('?'))
    }
    const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
    const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file)
    const blob: Blob = new Blob([buffer],{type:'image/jpeg'})
    this.uploadPicture(blob)

  }catch(error){
    console.error(error)
  }

}
  async abrirGaleria3(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      //mediaType: this.camera.MediaType.PICTURE
  }
  try{
    const fileUri: string = await this.camera.getPicture(options)
    let file: string

    if(this.platform.is('ios')){
      file = fileUri.split('/').pop();
    }else{
      file = fileUri.substring(fileUri.lastIndexOf('/')+1, fileUri.indexOf('?'))
    }
    const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
    const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file)
    const blob: Blob = new Blob([buffer],{type:'image/jpeg'})
    this.uploadPicture(blob)
  }catch(error){
    console.error(error)
  }

}
  async abrirGaleria4(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      //mediaType: this.camera.MediaType.PICTURE
  }
  try{
    const fileUri: string = await this.camera.getPicture(options)
    let file: string

    if(this.platform.is('ios')){
      file = fileUri.split('/').pop();
    }else{
      file = fileUri.substring(fileUri.lastIndexOf('/')+1, fileUri.indexOf('?'))
    }
    const path: string = fileUri.substring(0, fileUri.lastIndexOf('/'));
    const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file)
    const blob: Blob = new Blob([buffer],{type:'image/jpeg'})
    this.uploadPicture(blob)
  }catch(error){
    console.error(error)
  }

}
uploadPicture(blob:Blob){
  var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
  console.log(seq);
  const ref = this.afStorage.ref(seq +'.jpeg');
  const task = ref.put(blob)
  const don = this.afStorage.ref(seq+'.jpeg');
  const task2 = don.put(blob)
  this.uploadPercent = task.percentageChanges();
  task2.snapshotChanges().pipe(
      finalize(() => {

        this.donwloadUrl = don.getDownloadURL();
        this.donwloadUrl.subscribe(res => {
          this.url = res;
           this.photos.push({fotoN:'ionic.fotoSUB',
                          link:String(this.url)})
          this.showalert('Opa!', 'Concluido! Se quiser, j?? pode publicar!');

        })
       
      })
    ).subscribe();
}
validade(){
  if(this.type != ''){
    if(this.nomePrd != ''){
     if(this.resumo != ''){
       if(this.qtd != null){
         if(this.valor != ''){
          this.create();
          }else{
            alert('Por favor, preencha o campo "Valor"') 

          }
        }else{
          alert('Por favor, informe a "Quantidade"') 

        }
      }else{
        alert('Por favor, preencha o campo "Descri????o do Produto"') 

      }
    }else{
      alert('Por favor, selecione o campo "Nome do Produto"') 

    }
   }else{
    alert('Por favor, preencha o campo "Tipo do produto"') 

   }
}
create() {
  
   var valorN
   var valorS
   valorN = String(this.valor).replace(',','')
   valorS = String(this.valor).replace(',','.')
    this.afStore.collection('produto').add({
       nome: this.nomePrd,
       email: this.email,
       valor: Number(valorS),
       tipoPrd: this.type,
       resumo: this.resumo,
       product: this.nomePrd,
       quantity: Number(this.qtd),
       detail:  this.resumo,
       price: Number(valorN),
       fotos: this.photos,
       especi: this.check,
       noApp: "Sim",
       estado: this.estado,
       lojaUID: this.lojaUID,
       aprovado: "Sim",
       nomeLoja: this.nome
    });
  
  this.showalert('Obrigado!',' Seu produto estar?? dispon??vel em breve!');
  this.navCtrl.navigateForward('/user');
  this.photos = []
  console.log('aqui foi');
}
async showalert(header: string, message: string) {
  const alert = await this.alertCtrl.create({
    header,
    message,
    buttons: ['Ok']
  });

  await alert.present();
}

photo() {
 this.showalert('Sorry', 'Photos upload will be available in our next version.');

}
voltar(){
  this.navCtrl.pop();
}
enviar() {
  this.navCtrl.navigateForward('/user');
  // ele vai fazer o processo de registar no firebase e depois joga para uma lista que vai estar na pagina do user.
}
}
