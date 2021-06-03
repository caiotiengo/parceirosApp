import { Component, OnInit, NgZone } from '@angular/core';
import moipSdk from 'moip-sdk-node'
import { ServiceService } from '../service.service';
import { NavController, ModalController, LoadingController, Platform } from '@ionic/angular';
import { PoliticaPage } from '../politica/politica.page';
import { AngularFireAuth } from '@angular/fire/auth';
declare var google;
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {Observable} from 'rxjs';
import {
  MediaCapture,
  MediaFile,
  CaptureError
} from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import {finalize} from 'rxjs/operators';
import * as _ from 'lodash';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email2:string;
  senha2:string;
  nomeResponsavel:string;
  sobrenomeResponsavel:string;
  RG:string;
  orgaoEmissor:string;
  CPF:string;
  telefone:string;
  endereco:string;
  numero:number;
  complemento:string;
  bairro:string;
  cep:string;
  estado:string;
  cidade:string;
  correnteoupou:string;
  banco:string;
  nomeNaConta:string;
  CNPJconta:string;
  agencia:number;
  conta:number;
  digitoConta:number;
  ddd:number;
  numeroBanco:number;
  nomeBanco:string;
  nomeLoja:string;
  horarioFechar:any;
  horarioAbrir:any;
  cnpj:string;
  primeiraDiv = true;
  segundaDiv = true;
  terceiraDiv = true;
  quartaDiv = true;
  started = false;
  hider = true;
  quintaDiv = true
  moip
  Es
  states
  cidades: Array<any> = [];
  errosFirebase;
  bancos;
  errosFirebaseLoad;
  bancosLoad;
  bank
  errosFire
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  hide = false
  geocoder
  hide2 = false
  latitudeGoogle
  longitudeGoogle
  userUID;
  idMoip;
  tokenMoip;
  foto:any;
  url
  public donwloadUrl: Observable<string>;
  public uploadPercent: Observable<number>;
  barStatus = false;
  imageUploads = [];
  evento: Array<any> = [];
  planos
  hidePlanos = false
  hideIniciar = true
  constructor(public services: ServiceService, 
    private platform: Platform,
    private camera: Camera,
    private afStorage: AngularFireStorage,
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media, 
    public afStore: AngularFirestore,
    public storage: Storage , 
    public loadingController: LoadingController, 
    public afAuth: AngularFireAuth,
    public zone: NgZone, 
    private modalController: ModalController, 
    public navCtrl:NavController) {

    

    this.moip = moipSdk({
      /*
      token: 'C5LQHXVYGJLN0XYSTRZCQY6LRQZVV6AR',
      key: 'LNRERY9ULDQSPBXYR2BTJLNKRKLWTPEIUKAV9E1Z',
      production: false
           idmoip account "MPA-CC3641B4B904"
      */
  
      accessToken: '292bed0bd3244409b835986edca4119f_v2',
      secret:'cf87986f39c342caa5d9a49c6c166a2a',
      key: 'Y4UDSTTB0JSJC6UPCQPGLMGPHQT7MEHCDM1FERDI',
      channelId:"APP-16HIIBI5HPS8",
      production: true,
      "Accept" : "*/*"
      //token: 'Z9KP0SCKJ2UZGWSGYXUJCZOU0BVMB1QN',
      //id moip account prod "MPA-888C5307676A"
  
    })
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.geocoder = new google.maps.Geocoder;
   }

   slidesOptions = {
    slidesPerView: 1.5
  }
  ngOnInit() {
    this.storage.remove('usuario')
    this.storage.remove('id')
    this.storage.clear()

    this.services.data().then(x =>{
      this.states = x;
      console.log(this.states)
    })
    this.services.data2().then(y =>{
      this.bank = y;
      this.bancos = this.bank.bancos
      this.bancosLoad = this.bank.bancos
      console.log(this.bancos)
    })
    this.services.data3().then(z =>{
      this.errosFire = z
      this.errosFirebase = this.errosFire.errors;

      console.log(this.errosFirebase)
    })

  }
  // --------- E-mail autenticação -------- //
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Processando dados...',
      duration: 1000
    });
    await loading.present();
  }
  async presentLoading2() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Enviando para o banco de dados...',
      duration: 3000
    });
    await loading.present();
  }
  async presentLoadingMoip() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cadastrando sua Conta de ganhos Axé...',
      duration: 3000
    });
    await loading.present();
  }
   authenticacao(){
     
    this.segundoPasso()
      this.presentLoading().then(() =>{
          this.presentLoading2()
            this.afAuth.createUserWithEmailAndPassword(this.email2, this.senha2).then(async(res) => {
            console.log(res.user.uid)
            this.userUID = res.user.uid
            this.segundoPasso()
            
          }).catch((e) => {
            console.dir(e)
              var erro = this.errosFirebase.filter(i => i.code === e.code)
              console.log(erro[0].message)
              if(erro.length > 0){
                alert('Ops! ' + erro[0].message )

              }else{
                alert('Ops! ' + e )
              }
          })
     })
    


  }
  plano(item){
    console.log(item)
    this.planos = item;
    if(this.planos === 'entrega'){
      if(confirm('O plano entregas está disponível apenas nos estados/cidades: RJ, SP, Campinas, Curitiba, Belo Horizonte, Recife. Se você se encontra em um desses estados, pode continuar! se não, clique em cancelar.')){
        this.hidePlanos = true
        this.hideIniciar = false;

      }else {
        this.hideIniciar = true;
        this.hidePlanos = false

      }
    }else if(this.planos === 'basico'){
      this.hidePlanos = true
      this.hideIniciar = false;

    }
  }
  // --------- wirecard ---------- //
  contaWirecard(){
    this.presentLoading().then(() =>{ 
      this.presentLoadingMoip()   
        this.moip.account.create({
          email: {
              address: this.email2
          },
          person: {
              name: this.nomeResponsavel,
              lastName: this.sobrenomeResponsavel,
              taxDocument: {
                  type: "CPF",
                  number: this.CPF
              },
              identityDocument: {
                  type : "RG",
                  number: this.RG,
                  issuer: this.orgaoEmissor,
                  issueDate: "2000-12-12"
              },
              birthDate: "1990-01-01",
              phone: {
                  countryCode: "55",
                  areaCode: this.ddd,
                  number: this.telefone
              },
              address: {
                  street: this.endereco,
                  streetNumber: this.numero,
                  district: this.bairro,
                  zipCode: this.cep,
                  city: this.cidade,
                  state: this.estado,
                  country: "BRA"
              }
          },
          type: "MERCHANT",
          transparentAccount: true
      }).then((response) => {
          console.log(response.body)
          this.idMoip = response.body.id;
          this.tokenMoip = response.body.accessToken;
          this.quartoPasso()
      }).catch((err) => {
          console.log(err)
          alert(err)
      })
    }) 

  }
  
  // --------- dados do usuario -------- ///
  checklistUsuario(){
    if(this.email2 !='' && this.email2 != undefined){
      if(this.senha2 !='' && this.senha2 != undefined){
        if(this.nomeLoja !='' && this.nomeLoja != undefined){
          console.log('ok nome')
          if(this.CPF !='' && this.CPF != undefined){
            console.log('ok cpf')
            if(this.endereco !='' && this.endereco != undefined){
              console.log('ok end')
              if(this.numero != null && this.numero != undefined){
                console.log('ok num')
                if(this.cep !='' && this.cep != undefined){
                  console.log('ok Cep')
                  if(this.complemento !='' && this.complemento != undefined){
                    console.log('ok com')
                    if(this.bairro !='' && this.bairro != undefined){
                      console.log('ok bairro')
                      if(this.estado  !='' && this.estado != undefined){
                        console.log('ok est')
                        if(this.cidade !='' && this.cidade != undefined){
                          console.log('ok cid')
                          if(this.ddd != null && this.ddd != undefined){
                            console.log('ok ddd')
                            if(this.telefone !='' && this.telefone != undefined){
                              console.log('ok Tel')
                              if(this.numeroBanco != null && this.numeroBanco != undefined){
                                console.log('ok numerobank')
                                if(this.latitudeGoogle !='' && this.latitudeGoogle != undefined){
                                  console.log('ok Lat')
                                  console.log(this.latitudeGoogle)
                                  if(this.longitudeGoogle !='' &&  this.longitudeGoogle != undefined){
                                    console.log('ok lon')
                                    console.log(this.latitudeGoogle)
                                    if(this.planos === 'basico'){
                                      this.finalizar1()

                                    }else if(this.planos === 'entrega'){
                                      this.finalizar2()
                                    }
                                  }else{
                                    alert('Selecione um dos endereços da lista, se o seu endereço não aparece, tente outro.')
                                  } 
                                }else{
                                  alert('Selecione um dos endereços da lista, se o seu endereço não aparece, tente outro.')
                                }
                              }else{
                                alert('Selecione um dos bancos da lista.')
                              }
                              
                            }else{
                              alert('Preencha o campo "Telefone"')
                            }
                          }else{
                            alert('Preencha o campo "DDD"')
                          }
                    
                        }else{
                          alert('Preencha o campo "Cidade"')
                        }
                      }else{
                        alert('Preencha o campo "Estado"')

                      }

                    }else{
                      alert('Preencha o campo "Bairro"')
                    }
              
                  }else{
                    alert('Preencha o campo "Complemento"')
                  }
                }else{
                  alert('Preencha o campo "CEP"')
                }
              }else{
                alert('Preencha o campo "Número"')
              }
            }else{
              alert('Preencha o campo "Endereço da Loja"')
            }
          }else{
            alert('Preencha o campo "CPF do Responsavél"')
          }
        }else{
          alert('Preencha o campo "Nome Loja"')
        }
      }else{
        alert('Preencha o campo "Senha"')
      }
    }else{
      alert('Preencha o campo "Email"')
    }
  }
  async finalizar1(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cadastrando o seu perfil...',
    });
    await loading.present();
    const userid = this.userUID
    var telefone = this.telefone.replace('-','')
    console.log(telefone)
    
    this.afStore.doc(`users/${userid}`).set({
        nome: this.nomeLoja,
        email: this.email2,
        endereco: this.endereco,
        telefone: telefone,
        bairro: this.bairro,
        cidade: this.cidade,
        lat: this.latitudeGoogle,
        lng: this.longitudeGoogle,
        numeroEND: this.numero,
        CPFCNPJ: this.CPF,
        CEP: this.cep,
        complemento: this.complemento,
        estado: this.estado,
        idmoip:this.idMoip,
        nomeNaConta: this.nomeNaConta,
        numeroBank: this.numeroBanco,
        optEntregas: "Não",
        porcentagemAxe: 13,
        porcentagemLoja: 87,
        accessToken: this.tokenMoip,
        agencia: Number(this.agencia),
        entrega: this.horarioAbrir,
        seNao:this.horarioFechar,
        aprovado: "Nao",
        banco: this.nomeBanco,
        conta: this.conta,
        digitoConta:this.digitoConta,
        correnteoupou: this.correnteoupou,
        DOB:Date.now(),
        ddd: this.ddd,
        fcm: '1',
        FotoPerfil:this.url,
        status:'Offline',   
        tipo: "Loja",
        CPFconta: this.CNPJconta,
        filiais:[]
       
       }).then(async (data)=>{
         await loading.dismiss()
         this.storage.remove('usuario')

         this.quintoPasso()
       }).catch(async (e) =>{
        console.dir(e)
        await loading.dismiss()
  
        var erro = this.errosFirebase.filter(i => i.code === e.code)
        console.log(erro[0].message)
        if(erro.length > 0){
          await loading.dismiss()
  
          alert('Ops!'+ erro[0].message )
  
        }else{
          await loading.dismiss()
  
          alert('Ops!' + e )
        }
  
      })
       
    
  }

  async finalizar2(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cadastrando o seu perfil...',
    });
    await loading.present();
    const userid = this.userUID
    var telefone = this.telefone.replace('-','')
    console.log(telefone)
    
    this.afStore.doc(`users/${userid}`).set({
        nome: this.nomeLoja,
        email: this.email2,
        endereco: this.endereco,
        telefone: telefone,
        bairro: this.bairro,
        cidade: this.cidade,
        lat: this.latitudeGoogle,
        lng: this.longitudeGoogle,
        numeroEND: this.numero,
        CPFCNPJ: this.CPF,
        CEP: this.cep,
        complemento: this.complemento,
        estado: this.estado,
        idmoip:this.idMoip,
        nomeNaConta: this.nomeNaConta,
        numeroBank: this.numeroBanco,
        optEntregas: "Não",
        porcentagemAxe: 16,
        porcentagemLoja: 84,
        accessToken: this.tokenMoip,
        agencia:  Number(this.agencia),
        entrega: this.horarioAbrir,
        seNao:this.horarioFechar,
        aprovado: "Nao",
        banco: this.nomeBanco,
        conta: this.conta,
        digitoConta:this.digitoConta,
        correnteoupou: this.correnteoupou,
        DOB:Date.now(),
        ddd: this.ddd,
        fcm: '1',
        FotoPerfil:this.url,
        status:'Offline',   
        tipo: "Loja",
        CPFconta: this.CNPJconta,
        filiais:[]
       
       }).then(async (data)=>{
         await loading.dismiss()
         this.storage.remove('usuario')
         this.quintoPasso()
       }).catch(async (e) =>{
        console.dir(e)
        await loading.dismiss()
        
        var erro = this.errosFirebase.filter(i => i.code === e.code)
        console.log(erro[0].message)
        if(erro.length > 0){
          await loading.dismiss()
  
          alert('Ops!'+ erro[0].message )
  
        }else{
          await loading.dismiss()
  
          alert('Ops!' + e )
        }
  
      })
       
    
  } 
 //------- salvar filial ------ //
 salvar(){
  var aprovado = 'Nao'
  var tipo = 'Loja'
  var status = 'Offline'
  var uid = this.userUID
  var endereco = this.endereco
  var cep = this.cep
  var bairro = this.bairro
  var complemento = this.complemento
  var numero = this.numero
  var cidade = this.cidade
  var estado = this.estado
  var lat = this.latitudeGoogle
  var lng = this.longitudeGoogle
  var nome = this.nomeLoja
  var FotoPerfil = this.url
  var entrega = this.horarioAbrir
  var seNao = this.horarioFechar
  const data = {
     uid,
     endereco,
     cep,
     bairro,
     complemento,
     numero,
     cidade,
     estado,
     lat,
     lng,
     tipo,
     aprovado,
     status,
     nome,
     FotoPerfil,
     entrega,
     seNao
 }
  this.afStore.collection('unidades').add(data).then(data =>{
    console.log(data.id)
    if(data.id){
      this.services.updateFiliais(this.userUID, data.id)
    }
  })
  //this.services.updateUnidade(this.id, this.unidadeEnd, this.unidadeCEP, this.unidadeBairro,this.unidadeComple, this.unidadeNumero, this.unidadeCidade, this.unidadeEstado, this.latitudeGoogle, this.longitudeGoogle,this.loja.nome,this.loja.FotoPerfil,this.loja.entrega,this.loja.seNao)
  this.navCtrl.pop()
  
}
  // --------- cidades ----------- //

  city(evt){
    console.log(evt.srcElement.value)
    this.estado = evt.srcElement.value;
    let estado =  this.states.estados.filter(i => i.sigla === this.estado)
      console.log(estado[0].cidades)
      this.cidades =[];
      estado[0].cidades.forEach(element => {

        this.cidades.push({
          nome:element,
          estado:this.estado
        })
      });
  }

  // ------------ Bancos ------------ //
  updateBusca(item){
    console.log(item)
    this.hider = true
    this.numeroBanco = Number(item.value)
    this.nomeBanco = item.label

  }

  initializeItems(): void {
    this.bancos = this.bancosLoad;
    this.hider = false


  }
  buscaBanco(evt){

    this.initializeItems();

    const searchTerm = evt.srcElement.value;
    console.log(searchTerm)
    
    if (!searchTerm) { 
      return;
     }
    this.bancos = this.bancosLoad.filter(currentGoal => {
       if (currentGoal.label && searchTerm) {
          
        if (currentGoal.label.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
           // this.hider = true;
            
            return true;
           } else {   
             return false;
           }
       }
     });
  }
  // --------- headers e navegação ----------- //
  voltar(){
    this.navCtrl.pop()
  }
  iniciar(){

    this.started = false
    this.primeiraDiv = true;
    this.segundaDiv = true;
    this.terceiraDiv = true;
    this.quartaDiv = true;
  }

  primeiroPasso(){

    this.started = true
    this.primeiraDiv = false;
    this.segundaDiv = true;
    this.terceiraDiv = true;
    this.quartaDiv = true;
    this.quintaDiv = true;

  }
  segundoPasso(){
    //console.log(this.email)
    //console.log(this.senha)
    this.started = true
    this.primeiraDiv = true;
    this.segundaDiv = false;
    this.terceiraDiv = true;
    this.quartaDiv = true;
    this.quintaDiv = true;

  }
  terceiroPasso(){
    this.started = true
    this.primeiraDiv = true;
    this.segundaDiv = true;
    this.terceiraDiv = false;
    this.quartaDiv = true;
    this.quintaDiv = true;

  }
  quartoPasso(){
    this.started = true
    this.primeiraDiv = true;
    this.segundaDiv = true;
    this.terceiraDiv = true;
    this.quartaDiv = false;
    this.quintaDiv = true;

  }
  quintoPasso(){
    console.log(this.horarioFechar , this.horarioAbrir)
    this.quintaDiv = false
    this.started = true
    this.primeiraDiv = true;
    this.segundaDiv = true;
    this.terceiraDiv = true;
    this.quartaDiv = true;
  }
  async entrarNoApp(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Entrando no app...',
    });
    await loading.present();
    this.storage.remove('usuario')
    this.salvar()
    this.services.getLoja(this.userUID).subscribe(async data =>{
      //this.storage.set('usuario', data).then(async (data)=>{
        await loading.dismiss();
        this.navCtrl.navigateRoot('/home')

     // })
    })
  }
// ---------- politica ----------- //

  politica(){
    this.presentModal();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PoliticaPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
// ---------- Google Address ----------- //
UpdateSearchResults(evt){
  this.hide = false
  this.autocomplete.input = evt.srcElement.value;
  if (this.autocomplete.input == '') {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ 
    input: this.autocomplete.input,
    componentRestrictions: {
      country: 'br'
    }
  },
  (predictions, status) => {
    this.autocompleteItems = [];
    this.zone.run(() => {
      predictions.forEach((prediction) => {
        this.autocompleteItems.push(prediction);
      });
    });
  });
}
SelectSearchResult(item) {
  this.hide = true

  ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
  console.log(String(item.terms[0].value))      
  console.log(String(item.terms[1].value))      
  console.log(String(item.terms[2].value))      
  console.log(String(item.terms[3].value))   
  console.log(JSON.stringify(item))
  
  this.endereco = String(item.terms[0].value)

  //this.cidade = String(item.terms[2].value)
  //this.Es = String(item.terms[3].value)

  console.log(this.endereco)
  this.placeid = item.place_id
  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
    if(status === 'OK' && results[0]){
      let position = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
      };
      console.log(position)
      this.latitudeGoogle = results[0].geometry.location.lat()
      this.longitudeGoogle = results[0].geometry.location.lng()
      console.log(results[0].geometry.location)
      console.log(results)
      //let marker = new google.maps.Marker({
      //  position: results[0].geometry.location,
      //  map: this.map,
      //});
      //this.markers.push(marker);
      //this.map.setCenter(results[0].geometry.location);
    }
  })
}
/*
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
            alert('Opa! Concluido! Se quiser, já pode finalizar o seu cadastro!');
  
          })
         
        })
      ).subscribe();
  }
  */
  imageName() {
    const newTime = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * 20) + newTime;
  }
 async uploadPhoto(event) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Carregando foto...',
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
                    this.url = res
                    await loading.dismiss();

                    alert('Foto carregada')

                    this.imageUploads.unshift(res);
                    this.barStatus = false;
            }
          },
          async (error: any) => {
            console.log(error)
            await loading.dismiss();
            alert(error)
            this.barStatus = false;
          });
          
        } 
      }
  }
}
