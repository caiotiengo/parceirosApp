import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPassosPage } from '../modal-passos/modal-passos.page';
import { Storage } from '@ionic/storage';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userID:any;
  user:any;
  vendasAguardando:any;
  constructor(public navCtrl: NavController,public router:Router,public services:ServiceService, public storage: Storage, public modal:ModalController) { }
  slidesOptions = {
    slidesPerView: 1.5
  }
  ngOnInit() {
    this.storage.get('id').then(y => {
      this.userID = y;
     console.log(this.userID)

      if(this.userID === null || this.userID === undefined){
        this.navCtrl.navigateForward('')
      }else{
        this.services.getLoja(this.userID).subscribe(da =>{
          this.user = da;
          this.storage.set('usuario',this.user).then(res =>{
            console.log(res)
          })
          console.log(this.user)
        })
        this.services.getVendas().subscribe(prod =>{
          this.vendasAguardando = prod.filter(i =>i.lojaUID === this.userID && i.statusEnt === "Loja informada")
          console.log(this.vendasAguardando)
        })
      }

    })
  }

  async presentModal() {
    const modal = await this.modal.create({
      component: ModalPassosPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  entregasPage(){
    //let user = this.user
   // console.log(user)
    this.router.navigate(['/entregas'])
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
