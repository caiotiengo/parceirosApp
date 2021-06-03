import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ServiceService } from '../service.service';
import { Storage } from '@ionic/storage';
import { NavController, LoadingController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errors = [
    {
        "code": "auth/app-deleted",
        "message": "O banco de dados não foi localizado."
    },
    {
        "code": "auth/expired-action-code",
        "message": "O código da ação o ou link expirou."
    },
    {
        "code": "auth/invalid-action-code",
        "message": "O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado."
    },
    {
        "code": "auth/user-disabled",
        "message": "O usuário correspondente à credencial fornecida foi desativado."
    },
    {
        "code": "auth/user-not-found",
        "message": "O usuário não correponde à nenhuma credencial."
    },
    {
        "code": "auth/weak-password",
        "message": "A senha é muito fraca."
    },
    {
        "code": "auth/email-already-in-use",
        "message": "Já existi uma conta com o endereço de email fornecido."
    },
    {
        "code": "auth/invalid-email",
        "message": "O endereço de e-mail não é válido."
    },
    {
        "code": "auth/operation-not-allowed",
        "message": "O tipo de conta correspondente à esta credencial ainda não encontra-se ativada."
    },
    {
        "code": "auth/account-exists-with-different-credential",
        "message": "E-mail já associado a outra conta."
    },
    {
        "code": "auth/auth-domain-config-required",
        "message": "A configuração para autenticação não foi fornecida."
    },
    {
        "code": "auth/credential-already-in-use",
        "message": "Já existe uma conta para esta credencial."
    },
    {
        "code": "auth/operation-not-supported-in-this-environment",
        "message": "Esta operação não é suportada no ambiente que está sendo executada. Verifique se deve ser http ou https."
    },
    {
        "code": "auth/timeout",
        "message": "Excedido o tempo de resposta. O domínio pode não estar autorizado para realizar operações."
    },
    {
        "code": "auth/missing-android-pkg-name",
        "message": "Deve ser fornecido um nome de pacote para instalação do aplicativo Android."
    },
    {
        "code": "auth/missing-continue-uri",
        "message": "A próxima URL deve ser fornecida na solicitação."
    },
    {
        "code": "auth/missing-ios-bundle-id",
        "message": "Deve ser fornecido um nome de pacote para instalação do aplicativo iOS."
    },
    {
        "code": "auth/invalid-continue-uri",
        "message": "A próxima URL fornecida na solicitação é inválida."
    },
    {
        "code": "auth/unauthorized-continue-uri",
        "message": "O domínio da próxima URL não está na lista de autorizações."
    },
    {
        "code": "auth/invalid-dynamic-link-domain",
        "message": "O domínio de link dinâmico fornecido não está autorizado ou configurado no projeto atual."
    },
    {
        "code": "auth/argument-error",
        "message": "Verifique a configuração de link para o aplicativo."
    },
    {
        "code": "auth/invalid-persistence-type",
        "message": "O tipo especificado para a persistência dos dados é inválido."
    },
    {
        "code": "auth/unsupported-persistence-type",
        "message": "O ambiente atual não suportar o tipo especificado para persistência dos dados."
    },
    {
        "code": "auth/invalid-credential",
        "message": "A credencial expirou ou está mal formada."
    },
    {
        "code": "auth/wrong-password",
        "message": "Senha incorreta."
    },
    {
        "code": "auth/invalid-verification-code",
        "message": "O código de verificação da credencial não é válido."
    },
    {
        "code": "auth/invalid-verification-id",
        "message": "O ID de verificação da credencial não é válido."
    },
    {
        "code": "auth/custom-token-mismatch",
        "message": "O token está diferente do padrão solicitado."
    },
    {
        "code": "auth/invalid-custom-token",
        "message": "O token fornecido não é válido."
    },
    {
        "code": "auth/captcha-check-failed",
        "message": "O token de resposta do reCAPTCHA não é válido expirou ou o domínio não é permitido."
    },
    {
        "code": "auth/invalid-phone-number",
        "message": "O número de telefone está em um formato inválido (padrão E.164)."
    },
    {
        "code": "auth/missing-phone-number",
        "message": "O número de telefone é requerido."
    },
    {
        "code": "auth/quota-exceeded",
        "message": "A cota de SMS foi excedida."
    },
    {
        "code": "auth/cancelled-popup-request",
        "message": "Somente uma solicitação de janela pop-up é permitida de uma só vez."
    },
    {
        "code": "auth/popup-blocked",
        "message": "A janela pop-up foi bloqueado pelo navegador."
    },
    {
        "code": "auth/popup-closed-by-user",
        "message": "A janela pop-up foi fechada pelo usuário sem concluir o login no provedor."
    },
    {
        "code": "auth/unauthorized-domain",
        "message": "O domínio do aplicativo não está autorizado para realizar operações."
    },
    {
        "code": "auth/invalid-user-token",
        "message": "O usuário atual não foi identificado."
    },
    {
        "code": "auth/user-token-expired",
        "message": "O token do usuário atual expirou."
    },
    {
        "code": "auth/null-user",
        "message": "O usuário atual é nulo."
    },
    {
        "code": "auth/app-not-authorized",
        "message": "Aplicação não autorizada para autenticar com a chave informada."
    },
    {
        "code": "auth/invalid-api-key",
        "message": "A chave da API fornecida é inválida."
    },
    {
        "code": "auth/network-request-failed",
        "message": "Falha de conexão com a rede."
    },
    {
        "code": "auth/requires-recent-login",
        "message": "O último horário de acesso do usuário não atende ao limite de segurança."
    },
    {
        "code": "auth/too-many-requests",
        "message": "As solicitações foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo."
    },
    {
        "code": "auth/web-storage-unsupported",
        "message": "O navegador não suporta armazenamento ou se o usuário desativou este recurso."
    },
    {
        "code": "auth/invalid-claims",
        "message": "Os atributos de cadastro personalizado são inválidos."
    },
    {
        "code": "auth/claims-too-large",
        "message": "O tamanho da requisição excede o tamanho máximo permitido de 1 Megabyte."
    },
    {
        "code": "auth/id-token-expired",
        "message": "O token informado expirou."
    },
    {
        "code": "auth/id-token-revoked",
        "message": "O token informado perdeu a validade."
    },
    {
        "code": "auth/invalid-argument",
        "message": "Um argumento inválido foi fornecido a um método."
    },
    {
        "code": "auth/invalid-creation-time",
        "message": "O horário da criação precisa ser uma data UTC válida."
    },
    {
        "code": "auth/invalid-disabled-field",
        "message": "A propriedade para usuário desabilitado é inválida."
    },
    {
        "code": "auth/invalid-display-name",
        "message": "O nome do usuário é inválido."
    },
    {
        "code": "auth/invalid-email-verified",
        "message": "O e-mail é inválido."
    },
    {
        "code": "auth/invalid-hash-algorithm",
        "message": "O algoritmo de HASH não é uma criptografia compatível."
    },
    {
        "code": "auth/invalid-hash-block-size",
        "message": "O tamanho do bloco de HASH não é válido."
    },
    {
        "code": "auth/invalid-hash-derived-key-length",
        "message": "O tamanho da chave derivada do HASH não é válido."
    },
    {
        "code": "auth/invalid-hash-key",
        "message": "A chave de HASH precisa ter um buffer de byte válido."
    },
    {
        "code": "auth/invalid-hash-memory-cost",
        "message": "O custo da memória HASH não é válido."
    },
    {
        "code": "auth/invalid-hash-parallelization",
        "message": "O carregamento em paralelo do HASH não é válido."
    },
    {
        "code": "auth/invalid-hash-rounds",
        "message": "O arredondamento de HASH não é válido."
    },
    {
        "code": "auth/invalid-hash-salt-separator",
        "message": "O campo do separador de SALT do algoritmo de geração de HASH precisa ser um buffer de byte válido."
    },
    {
        "code": "auth/invalid-id-token",
        "message": "O código do token informado não é válido."
    },
    {
        "code": "auth/invalid-last-sign-in-time",
        "message": "O último horário de login precisa ser uma data UTC válida."
    },
    {
        "code": "auth/invalid-page-token",
        "message": "A próxima URL fornecida na solicitação é inválida."
    },
    {
        "code": "auth/invalid-password",
        "message": "A senha é inválida precisa ter pelo menos 6 caracteres."
    },
    {
        "code": "auth/invalid-password-hash",
        "message": "O HASH da senha não é válida."
    },
    {
        "code": "auth/invalid-password-salt",
        "message": "O SALT da senha não é válido."
    },
    {
        "code": "auth/invalid-photo-url",
        "message": "A URL da foto de usuário é inválido."
    },
    {
        "code": "auth/invalid-provider-id",
        "message": "O identificador de provedor não é compatível."
    },
    {
        "code": "auth/invalid-session-cookie-duration",
        "message": "A duração do COOKIE da sessão precisa ser um número válido em milissegundos entre 5 minutos e 2 semanas."
    },
    {
        "code": "auth/invalid-uid",
        "message": "O identificador fornecido deve ter no máximo 128 caracteres."
    },
    {
        "code": "auth/invalid-user-import",
        "message": "O registro do usuário a ser importado não é válido."
    },
    {
        "code": "auth/invalid-provider-data",
        "message": "O provedor de dados não é válido."
    },
    {
        "code": "auth/maximum-user-count-exceeded",
        "message": "O número máximo permitido de usuários a serem importados foi excedido."
    },
    {
        "code": "auth/missing-hash-algorithm",
        "message": "É necessário fornecer o algoritmo de geração de HASH e seus parâmetros para importar usuários."
    },
    {
        "code": "auth/missing-uid",
        "message": "Um identificador é necessário para a operação atual."
    },
    {
        "code": "auth/reserved-claims",
        "message": "Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas."
    },
    {
        "code": "auth/session-cookie-revoked",
        "message": "O COOKIE da sessão perdeu a validade."
    },
    {
        "code": "auth/uid-alread-exists",
        "message": "O indentificador fornecido já está em uso."
    },
    {
        "code": "auth/email-already-exists",
        "message": "O e-mail fornecido já está em uso."
    },
    {
        "code": "auth/phone-number-already-exists",
        "message": "O telefone fornecido já está em uso."
    },
    {
        "code": "auth/project-not-found",
        "message": "Nenhum projeto foi encontrado."
    },
    {
        "code": "auth/insufficient-permission",
        "message": "A credencial utilizada não tem permissão para acessar o recurso solicitado."
    },
    {
        "code": "auth/internal-error",
        "message": "O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação."
    }
]
  email:string;
  senha:string;
  mainuser: AngularFirestoreDocument;
  userID
  FCM
  constructor(public loadingController: LoadingController,public afStore: AngularFirestore,public afAuth: AngularFireAuth,public services: ServiceService,public storage: Storage,public navCtrl:NavController) {
   }

  ngOnInit() {

  }

   async login(){

     const loading = await this.loadingController.create({
        message: 'Carregando...'
     });
     await loading.present();
     firebase.default.auth().setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(() =>{
      this.services.SignIn(this.email,this.senha).then(async (data) =>{
        console.log(data)
        untilDestroyed(this, 'login')

          this.navCtrl.navigateRoot('/home')
          await loading.dismiss();          
      }, async erro =>{
        console.log(erro)
        await loading.dismiss();          

      })

     })
      
  }
  async entrar() {
    const{email, senha } = this;
      //this.presentLoading() 

    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, senha);
      if (res.user) {
         const user = firebase.default.auth().currentUser;
         this.mainuser = this.afStore.doc(`users/${user.uid}`);
         this.userID = user.uid
         console.log(this.userID)
         this.storage.set('id',this.userID).then((res) =>{
            console.log(res)
        });
         this.mainuser.valueChanges().subscribe(event => {
            console.log(event)
            if(this.FCM === undefined){
              this.FCM === event.fcm
            }else{
              this.services.updateFCM(this.userID, this.FCM)

            }
            if(event.tipo === 'user'){
                alert('Mudou tudo! Parceiro Axé! agora você conta com um app exclusivo seu... Baixe agora o App "Parceiros Axé" para ter acesso a sua loja!')
            }else{
                this.storage.set('usuario', event).then(() =>{
                    //this.showalert('Bem-vindo de volta!', 'Vamos as compras!?');
                    this.navCtrl.navigateRoot('/home');
                     
                  })
                        
            }

         })
             

      }

    } catch(e){
      console.dir(e)
      var erro = this.errors.filter(i => i.code === e.code)
      console.log(erro[0].message)
      if(erro.length > 0){
        alert('Ops!'+erro[0].message )

      }else{
        alert('Ops!'+e )
      }

    }
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
  ngOnDestroy(){
    console.log('destruiu')
    untilDestroyed(this, 'entrar')

  }
}
