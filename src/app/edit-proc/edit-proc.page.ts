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
import { ActivatedRoute } from '@angular/router';
import {Storage} from '@ionic/storage'
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
  selector: 'app-edit-proc',
  templateUrl: './edit-proc.page.html',
  styleUrls: ['./edit-proc.page.scss'],
})
export class EditProcPage implements OnInit {
  nomePrd = '';
  email = '';
  tellme = '';
  valor: number;
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
  qtd:number
  hide = true;
  produto
  lojaUID
  estado
  aprovado
  userID:string;
  user:any;
  constructor(public navCtrl: NavController, public afStore: AngularFirestore,
    public alertCtrl: AlertController,
    public services: ServiceService,
    private platform: Platform,private camera: Camera, private afStorage: AngularFireStorage,
    private mediaCapture: MediaCapture, private route: ActivatedRoute,
    private file: File,
    private media: Media,private storage: Storage) { }

  ngOnInit() {
    this.storage.get('id').then(data =>{
      this.userID = data
        this.storage.get('usuario').then(event =>{
          this.user = event;
          this.email = event.email;
          this.nome = event.nome;
          this.boss = event.boss;
          this.lojaUID = this.userID
          this.estado = event.estado
          this.aprovado = "Sim"

          this.start()
      })
    })

  }
  start(){
    this.que = this.route.snapshot.paramMap.get('id');

    console.log(this.que);
    if (this.que) {
      this.services.getProdutos(this.que).subscribe(data =>{
        this.produto = data;
        if(this.produto.especi != undefined){
          if(this.produto.especi.lenght != 0){
            this.produto.especi.forEach(i => {
              this.check.push(i)

            });
          }
        }
        if(this.produto.fotos != undefined){

        if(this.produto.fotos.lenght != 0){
          this.produto.fotos.forEach(i => {
            this.photos.push(i)
          });
        }
      }
        console.log(this.produto)
        //this.type = this.produto.type
       // this.nomePrd = this.produto.nome
      })
      
  }
  }
  abrir(){
    this.hide = false;
  }
  addItem(){
    
    this.check.push({
      name: 'checkbox2',
      type: 'radio',
      label: this.variedade ,
      value:  this.variedade 
    })
    this.variedade = '';
    console.log(this.check)
  }
  
  deletaItem(items){
    _.remove(this.check, n => n.value === items.value);
    console.log(this.check);
    
  }
  async abrirGaleria1(){
      const options: CameraOptions = {
        quality: 100,
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
        quality: 100,
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
        quality: 100,
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
        quality: 100,
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
  create() {
        console.log()

    const user = this.user;
    if (user) {
     
     var valorN
     var valorS
     valorN = String(this.valor).replace(',','')
     valorS = String(this.valor).replace(',','.')
     this.services.updateProduto(this.que,this.nomePrd,this.nome, Number(valorN), 
     this.nome,
     Number(this.qtd),
      this.type, Number(valorS), this.resumo, this.resumo,this.check, this.photos, 
      this.estado, this.aprovado, this.lojaUID)
    }
    this.showalert('Obrigado!', 'Seu produto foi atualizado!');
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

  /*deletafoto(items){
    return this.afStorage.storage.refFromURL(items.link).delete().then(() =>{
      this.showalert("Opa!", "Imagem excluida com sucesso!")
    }).catch(err => {
      this.showalert("Ops!","Ocorreu um erro no processamento..." + err)
    })
  }*/
  deletafoto(items){
    _.remove(this.photos, n => n.link === items.link);
    console.log(this.photos);
    
  }
}
