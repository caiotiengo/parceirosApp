import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ServiceService } from '../service.service';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase/app';

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
    this.storage.clear()

     const loading = await this.loadingController.create({
        message: 'Carregando...'
     });
     await loading.present();
      this.services.SignIn(this.email,this.senha).then(async (data) =>{
        console.log(data)
        this.services.getLoja(data.user.uid).subscribe(async y =>{
          console.log(y)
          if(y.tipo === "Loja"){
            this.storage.set('id', data.user.uid).then(async x =>{
              this.storage.remove('usuario')

              await loading.dismiss()
              this.navCtrl.navigateRoot('/home')
            }, async err =>{
              console.log(err)
              await loading.dismiss()
            })
          }else{
            this.storage.clear()
            await loading.dismiss()

          }

        }, async e =>{
          console.log(e)
          alert(e)
          await loading.dismiss()
        })
      }, async erro =>{
        console.log(erro)
      })

  }
  senhaEsquecida(){
    console.log(this.email)
    if(this.email){
      console.log(this.email)
      var auth = firebase.default.auth()
      var emailAddress = this.email;
      auth.sendPasswordResetEmail(emailAddress).then((res)=>{
        console.log(res)
        alert('Tudo certo! Corre no seu email agora para resetar a senha!')
      })
    }else{
      alert('Opa! Digite por favor o seu email no campo "Email" e clique em "Esqueceu a senha?" novamente.')
    }

  }

}
