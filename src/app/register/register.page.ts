import { Component, OnInit, NgZone } from '@angular/core';
import moipSdk from 'moip-sdk-node'
import { ServiceService } from '../service.service';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { PoliticaPage } from '../politica/politica.page';
import { AngularFireAuth } from '@angular/fire/auth';
declare var google;
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email:string;
  senha:string;
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
  constructor(public services: ServiceService,public storage: Storage , public loadingController: LoadingController, public afAuth: AngularFireAuth,public zone: NgZone, private modalController: ModalController, public navCtrl:NavController) {

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

  ngOnInit() {
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
        this.presentLoading().then(() =>{
          this.presentLoading2()
            this.services.RegisterUser(this.email, this.senha)      
          .then((res) => {
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
  // --------- wirecard ---------- //
  contaWirecard(){
    this.presentLoading().then(() =>{ 
      this.presentLoadingMoip()   
        this.moip.account.create({
          email: {
              address: this.email
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
      })
    }) 

  }
  // --------- dados do usuario -------- ///
  finalizar(){
    
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
  entrarNoApp(){
    this.navCtrl.navigateRoot('/home')
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
}
