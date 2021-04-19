import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-perfil-loja',
  templateUrl: './perfil-loja.page.html',
  styleUrls: ['./perfil-loja.page.scss'],
})
export class PerfilLojaPage implements OnInit {
  hide = true;
  hide2 = false;
  constructor(public services: ServiceService) {

   }

  ngOnInit() {
    this.services.data4().then(data =>{
      console.log(data)
    })
  }
  searchBar(){
    this.hide = false;
    this.hide2 = true;
  }
  filtroCat(){
    this.hide = true;
    this.hide2 = false;
  }
}
