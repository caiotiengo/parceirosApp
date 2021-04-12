import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController) { }
  slidesOptions = {
    slidesPerView: 1.5
  }
  ngOnInit() {
  }
  entregasPage(){
    this.navCtrl.navigateForward('/entregas')
  }
  ganhosPage(){
    this.navCtrl.navigateForward('/ganhos')
  }
  produtosPage(){
    this.navCtrl.navigateForward('/produtos')
  }
  editarPage(){
    this.navCtrl.navigateForward('/user')
  }
}
