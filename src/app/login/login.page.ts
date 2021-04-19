import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ServiceService } from '../service.service';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  senha:string;
  constructor(public loadingController: LoadingController,public afAuth: AngularFireAuth,public services: ServiceService,public storage: Storage,public navCtrl:NavController) { }

  ngOnInit() {
  }

   async login(){
     const loading = await this.loadingController.create({
        message: 'Carregando...'
     });
     await loading.present();
      this.services.SignIn(this.email,this.senha).then(async (data) =>{
        console.log(data)
        this.services.getLoja(data.user.uid).subscribe(async y =>{
          this.storage.set('id', data.user.uid).then(async x =>{
            await loading.dismiss()
            this.navCtrl.navigateRoot('/home')
          }, async err =>{
            console.log(err)
            await loading.dismiss()
          })
        }, async e =>{
          console.log(e)
          alert(e)
          await loading.dismiss()
        })
      }, async erro =>{
        console.log(erro)
      })

  }

}
