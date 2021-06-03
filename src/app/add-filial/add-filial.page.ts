import { Component, OnInit, NgZone } from '@angular/core';
import { ServiceService } from '../service.service';
import { Storage } from '@ionic/storage';
import {NavController,AlertController} from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
declare var google;

@Component({
  selector: 'app-add-filial',
  templateUrl: './add-filial.page.html',
  styleUrls: ['./add-filial.page.scss'],
})
export class AddFilialPage implements OnInit {
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
  lat
  lng
  unidadeEnd = ''
  unidadeNum = ''
  unidadeEstado = ''
  unidadeCEP = ''
  abrirUnidade
  unidadeBairro = ''
  unidadeComple = ''
  unidadeNumero = ''
  unidadeCidade = ''
  unidadez
  id
  loja
  states
  cidades: Array<any> = [];
  constructor(public services: ServiceService,private storage: Storage,public navCtrl: NavController,public afStore: AngularFirestore,
    public zone: NgZone) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
                  this.autocomplete = { input: '' };
                  this.autocompleteItems = [];
                  this.geocoder = new google.maps.Geocoder;
                  
   }

  ngOnInit() {
    this.storage.get('id').then(data =>{
      this.id = data
      this.services.getProc(this.id).subscribe(resp =>{
        this.loja = resp
      })
    })
    this.services.data().then(x =>{
      this.states = x;
    })
  }
  city(evt){
    console.log(evt.srcElement.value)
    this.unidadeEstado = evt.srcElement.value;
  let estado =  this.states.estados.filter(i => i.sigla === this.unidadeEstado)
      console.log(estado[0].cidades)
      this.cidades =[];
      estado[0].cidades.forEach(element => {

        this.cidades.push({
          nome:element,
          estado:this.unidadeEstado
        })
      });
  }
  UpdateSearchResults(){

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
    
    this.unidadeEnd = String(item.terms[0].value)
    this.unidadeBairro = String(item.terms[1].value)
    //this.unidadeCidade = String(item.terms[2].value)
    //this.unidadeEstado = String(item.terms[3].value)

    console.log(this.unidadeBairro)
    console.log(this.unidadeCidade)
    

    this.placeid = item.place_id
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        let position = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
        };
        console.log(position)
        this.latitudeGoogle =results[0].geometry.location.lat()
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
  salvar(){
    var aprovado = 'Sim'
    var tipo = 'Loja'
    var status = 'Online'
    var uid = this.id
    var endereco = this.unidadeEnd
    var cep = this.unidadeCEP
    var bairro = this.unidadeBairro
    var complemento = this.unidadeComple
    var numero = this.unidadeNumero
    var cidade = this.unidadeCidade
    var estado = this.unidadeEstado
    var lat = this.latitudeGoogle
    var lng = this.longitudeGoogle
    var nome = this.loja.nome
    var FotoPerfil = this.loja.FotoPerfil
    var entrega = this.loja.entrega
    var seNao = this.loja.seNao
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
        this.services.updateFiliais(this.id, data.id)
      }
    })
    //this.services.updateUnidade(this.id, this.unidadeEnd, this.unidadeCEP, this.unidadeBairro,this.unidadeComple, this.unidadeNumero, this.unidadeCidade, this.unidadeEstado, this.latitudeGoogle, this.longitudeGoogle,this.loja.nome,this.loja.FotoPerfil,this.loja.entrega,this.loja.seNao)
    this.navCtrl.pop()
    
  }
}
