import { Component, OnInit ,NgZone} from '@angular/core';
import {NavController,AlertController, LoadingController} from '@ionic/angular';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {HttpClient} from '@angular/common/http';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

declare var google;

export interface Processo {
    nome: string ;
    endereco: string ;
    cidade: string ;
    bairro: string ;
    telefone: string ;
    LikeValue: number;
    DislikeValue: number;
    tellme: string;
    email: string;
    typeUser:string;
    lat:any;
    long:any;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  bancos
  banks
  nome: string ;
  endereco: string ;
  cidade: string ;
  bairro: string ;
  telefone: string ;
  email: string;
  zona: string;
  sub;
  proc;
  que: any;
  procUser;
  public goalList: any[];
  public loadedGoalList: any[];
  mainuser: AngularFirestoreDocument;
  processos;
  typeUser;
  currentGoale;
  public products = new Array<Processo>();
  public proccessSubscription: Subscription;
  goalListFiltrado;
  loadedGoalListFiltrado;
  userID
  enderecoNew = '';
  bairroNew = '';
  cidadeNew = '';
  estadoNew = '';
  numeroENDNew = '';
  agenciaNew = '';
  contaNew = '';
  nomeContaNew = '';
  bancoNew = '';
  tipoContaNew = '';
  CEPNew = '';
  CPFconta
  hideMe = true
  hideMe2 = true
  newCadastro
  CEP:string
  estado:string
  lat
  newBanco
  newEntrega
  lng
  datou
  numero
  banco
  conta
  nomeNaConta
  tipoConta 
  agencia
  CPFcontaNew = '';
  type = '';
  FCM
  hideMe3 = true
  entrega
  seNao
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  hide = false
  geocoder
  latitudeGoogle
  longitudeGoogle
  status
  hider = true
  numeroBank =''
  nomeBanco = ''
  complemento
  unidadeEnd 
  unidadeNum
  unidadeEstado
  unidadeCEP
  abrirUnidade
  unidadeBairro
  unidadeComple
  unidadeNumero
  unidadeCidade
  unidadez
  aprovado
  filiais
  filiaz
  constructor(public loadingController: LoadingController,public navCtrl: NavController, private storage: Storage,
    public afStore: AngularFirestore, public afAuth: AngularFireAuth,
    public modalController: ModalController, public router:Router,
      public services: ServiceService,private formBuilder: FormBuilder,private geolocation: Geolocation,private http: HttpClient, public zone: NgZone, 
      public alertCtrl: AlertController,private push:Push) { 

        this.newBanco = this.formBuilder.group({
                  
          bancoNew: ['', Validators.required],
          contaNew: ['', Validators.required],
          digitoNew: ['', Validators.required],
          numeroBank:['', Validators.required],
          agenciaNew: ['', Validators.required],
          nomeContaNew: ['', Validators.required],
          tipoContaNew: ['', Validators.required],
          CPFcontaNew: ['', Validators.required]
          
    }); 
    this.newEntrega = this.formBuilder.group({
          
      entregas: ['', Validators.required],
      senaoEntregas: ['', Validators.required],

      
});     
      }

  ngOnInit() {
    this.start()
  }

  async start(){
    const user = firebase.default.auth().currentUser;
    console.log(user);
    if (user) {
            this.mainuser = this.afStore.doc(`users/${user.uid}`);
               this.userID = user.uid
               // this.storage.set('usuarioUID', this.userID)
              } else {

      }
    const loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await loading.present();
    this.storage.get('id').then(data =>{
      this.userID = data;
      console.log(this.userID)
      this.sub = this.mainuser.valueChanges().subscribe((event) => {
        this.nome = event.nome;
        this.endereco = event.endereco;
        this.cidade = event.cidade;
        this.email = event.email;
        this.bairro = event.bairro;
        this.telefone = event.telefone;
        this.zona = event.zona;
        this.CEP = event.CEP;
        this.estado = event.estado;
        this.numero = event.numeroEND
        this.banco = event.banco
        this.agencia = event.agencia
        this.conta = event.conta
        this.nomeNaConta = event.nomeNaConta
        this.tipoConta = event.correnteoupou
        this.CPFconta = event.CPFconta
        this.entrega = event.entrega
        this.seNao = event.seNao
        this.status = event.status
        this.complemento = event.complemento
        this.unidadez = event.unidades
        this.aprovado = event.aprovado
        this.filiais = event.filiais
        
  
      });
    })
    this.services.data2().then( async data =>{
      this.bancos = data;
      this.banks = data;
      console.log(this.bancos)
      await loading.dismiss();
    })
    
  }

  updateBusca(item){
    console.log(item)
    this.hider = true
    this.numeroBank = item.value
    this.nomeBanco = item.label

  }
  initializeItems(): void {
    this.bancos.bancos = this.banks.bancos;
    this.hider = false


  }
  buscaBanco(evt){

    this.initializeItems();

    

    const searchTerm = evt.srcElement.value;
    console.log(searchTerm)
    
    if (!searchTerm) { 
      return;
     }
    this.bancos = this.banks.bancos.filter(currentGoal => {
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

  // -------- update de endereco ---------- //

  entregaz(){
    this.services.updateEntrega(this.userID, this.newEntrega.value.entregas,
       this.newEntrega.value.senaoEntregas)
       alert('Dados atualizados.')
       this.hideMe3 = true;
  }

  // -------- habilitar notificações ------- //
  habilitar(){
    const options: PushOptions = {
      android: {
        senderID:'612729787094'
      },
      ios: {
       alert: 'true',
       badge: true,
       sound: 'true'
     }
   }
 
   const pushObject: PushObject = this.push.init(options);
 
     pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
 
     pushObject.on('registration').subscribe((registration: any) => {
 
     console.log('Device registered', registration.registrationId)
     this.FCM = registration.registrationId
     this.services.updateFCM(this.userID, this.FCM);
      alert('Notificação habilitada.')
         console.log('Device registered', registration)

   } );
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
 
 

  }

  // --------- abrir e fechar lojas -------- //

  abrirLoja(){
    this.filiais.forEach(element => {
      console.log(element.idFilial)
      var opc = "Online"
      this.services.updateFilialStatus(element.idFilial,opc)  
    });
    var opc = "Online"
    this.services.updateStatus(this.userID,opc)
    
  }
  fecharLoja(){
    this.filiais.forEach(element => {
      console.log(element.idFilial)
      var opc = "Offline"
      this.services.updateFilialStatus(element.idFilial,opc)  
    });
    var opc = "Offline"
    this.services.updateStatus(this.userID,opc)
    
  }

  // ------ hide e unhide funcoes ------ //

  updateEnd(){
    this.hideMe = false;
  }
  updateBank(){
    this.hideMe2 = false;
  }
  updateEntrega(){
    this.hideMe3 = false;
  }

  // -------- update bancario ------- //

  updateBanco(){

    this.services.updateBanco(this.userID, this.newBanco.value.bancoNew, this.newBanco.value.agenciaNew,
       this.newBanco.value.contaNew,this.newBanco.value.tipoContaNew,this.newBanco.value.nomeContaNew,
      this.newBanco.value.CPFcontaNew, this.newBanco.value.digitoNew, this.newBanco.value.numeroBank)
      setTimeout(() => {
        this.storage.remove('usuario')
      }, 2000);
        
     this.hideMe2 = true;
  }

  // -------- add unidade --------- //

  addUni(){
    this.navCtrl.navigateForward('/add-filial')
  }

  sair() {
    this.router.navigate(['/']);
    
   
  }
  vaiProdutos(){
    this.navCtrl.navigateForward('/produtos')
  }

  // ------ deletar unit ----- //

  pedirDele(item){
    console.log(item)
    console.log(item.id)
    this.services.deleteFilial(item.id)
  }

}
