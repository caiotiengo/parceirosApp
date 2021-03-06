import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import {Produtos} from './item/item.page';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
//import { Foto, CheckBox } from './add-proc/add-proc.page';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

export interface User {
    nome: string ;
    filiais:any;
    endereco: string ;
    cidade: string ;
    bairro: string ;
    telefone: string ;
    LikeValue?: number;
    unidades?:any;
    DislikeValue?: number;
    tellme: string;
    email: string;
    type?: string;
    tipo?: string;
    resumo?: string;
    lastEdit?: string;
    comments?:any;
    CEP?:any;
    CPFconta?:any;
    complemento?:string;
    numeroEND?:any;
    pontoREF?:any;
    estado?:any;
    lat?:any;
    lng?:any;
    banco?:any;
    agencia?:any;
    conta?:any;
    correnteoupou?:any
    nomeNaConta?:any
    aprovado?:string
    fcm?:any
    zona?:any
    entrega?:any
    seNao?:any
    status?:any;
    digitoConta?:any;
    numeroBank?:any;
    cupons?:any;
    uid?:any;

}
export interface Processo {
    // tslint:disable-next-line:indent
    aprovado?:string;
    nomeLoja?:string;
    lojaUID?:string;
    estado?:string;
    nome?: string;
    LikeValue?: number;
    DislikeValue?: number;
    valor?: number;
    email?: string;
    type?: string;
    resumo?: string;
    noApp?:string;
    lastEdit?: string;
    tipoPrd?:any;
    price?:number;
    product?:string;
    quantity?: number;
    detail?: string;
    especi?:Array<any>
    fotos?:Array<any>
    unidades?:any

}
export interface Vendas {
    nomeComprador?: string;
    endereco?: string;
    nomeLoja?: string;
    valor?: number;
    dia?: string;
    emailComprador?: string;
    produtos?: string;
    statusPag?: string;
    statusEnt?: string;
    emailLoja?:string;
    lojaUID?:any;
    nPedido?:Number;
    mensagens?:any;
    valorDevedor?: number;
    chat?:any;
    comentario?:any;
    enderecoLoja?:any;
    valorFrete?:any;
    entregador?:string;
    bairroEnt?:string;

}
export interface Comentario{
        comments?: string;
        loja?: string;
        lojaUID?: any;
        emailLoja?: string;
        nomeComprador?: any;
        nPedido?:Number;
}
export interface Filial{
  status:any;
  uid:any;
}
export interface Comentario{
  comments?: string;
  loja?: string;
  lojaUID?: any;
  emailLoja?: string;
  nomeComprador?: any;
  nPedido?:Number;

}
export interface Entregador{
      idVenda?:string;
      loja?:string;
      lojaUID?:string;
      emailLoja?:string;
      nomeComprador?:string;
      idComprador?:string;
      enderecoLoja?:string;
      enderecoEnt?:string;
      nPedido?:number;
      nomeEntregador?:string;
      idEntregador?:string;
      placa?:string;
      tipo?:string;
      produtos?:string;
      bairro?:string;
      valorEntrega?:string;
}
export interface Cupom{
  cupom?:string;
  desconto?:number
}
export interface Chat{
  mensagens?:any;
  conteudo?:string;
  criadoEm?: Date;
  id?: string;
  uid?: string;
  idLoja?:string;
}
export interface Orcamento{
  orcamento?:any;
  valor?:any;
  price?:number;
  idComprador?:any;
  idLoja?:any;
  nomeComprador?:string;
  nomeLoja?:string;
  chat?:any;
  valorHTML?:string;
}
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  LikeValue: number;
  DislikeValue: number;
  private userCollection: AngularFirestoreCollection<User>;
  private processoCollection: AngularFirestoreCollection<Processo>;
  public vendasCollection: AngularFirestoreCollection<Vendas>;
  public commentsCollection: AngularFirestoreCollection<Comentario>;
  public cuponsCollection: AngularFirestoreCollection<Cupom>;
  public chatCollection: AngularFirestoreCollection<Chat>;
  public entregadorCollection: AngularFirestoreCollection<Entregador>;
  public orcamentoCollection: AngularFirestoreCollection<Orcamento>;
  public filiaisCollection: AngularFirestoreCollection<Filial>;
  users: Observable<User[]>;
  cupom: Observable<Cupom[]>;
  chat: Observable<Chat[]>;
  processos: Observable<Processo[]>;
  vendas: Observable<Vendas[]>;
  comentario: Observable<Comentario[]>;
  entregador: Observable<Entregador[]>;
  orcamento: Observable<Orcamento[]>;

  private user: User;
    likes: number;
    dislikes: number;
    proccesso;
    arrey: Array<Comentario> = [];
filial
  constructor(private afs: AngularFirestore, private storage: Storage,public ngFireAuth: AngularFireAuth,
    private http: HttpClient, public angularFireStorage: AngularFireStorage, public router:Router,  public platform: Platform) {

      // tslint:disable-next-line:indent
  	 this.userCollection = afs.collection<User>('users');
  	 // this.users = this.userCollection.valueChanges();

    this.processoCollection = afs.collection<Processo>('produto');
  	 // this.processos = this.processoCollection.valueChanges();
    this.vendasCollection = afs.collection<Vendas>('vendas');
    this.commentsCollection = afs.collection<Comentario>('comments');
    this.cuponsCollection = afs.collection<Cupom>('cupons')
    this.chatCollection = afs.collection<Chat>('chats')
    this.entregadorCollection = afs.collection<Entregador>('entregas')
    this.filiaisCollection = afs.collection<Filial>('unidades')
    this.orcamentoCollection = afs.collection<Orcamento>('orcamento')
    this.getUsers();
      // tslint:disable-next-line:indent
    this.getProccessos();
    this.getVendas();


  }
  getFiliais() {
    return this.filial = this.filiaisCollection.snapshotChanges().pipe(
         map(actions => actions.map(a => {
             const data = a.payload.doc.data() as Filial;
             const id = a.payload.doc.id;
             return { id, ...data };
         }))

     );
 }
  getUsers() {
     return this.users = this.userCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
              const data = a.payload.doc.data() as User;
              const id = a.payload.doc.id;
              return { id, ...data };
          }))

      );
  }
  getOrcamentos(){
    return this.orcamento = this.orcamentoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Orcamento;
          const id = a.payload.doc.id;
          return { id, ...data };
      }))

  );  
  }
  getCupom() {
    return this.cupom = this.cuponsCollection.snapshotChanges().pipe(
         map(actions => actions.map(a => {
             const data = a.payload.doc.data() as Cupom;
             const id = a.payload.doc.id;
             return { id, ...data };
         }))

     );
 }
 getChats() {
  return this.chat = this.chatCollection.snapshotChanges().pipe(
       map(actions => actions.map(a => {
           const data = a.payload.doc.data() as Chat;
           const id = a.payload.doc.id;
           return { id, ...data };
       }))

   );
}
  getProccessos() {
   return this.processos = this.processoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Processo;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
   getComments() {
   return this.comentario = this.commentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Comentario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getVendas() {
        return this.vendas = this.vendasCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Vendas;
                const id = a.payload.doc.id;
                //console.log('nova venda!')
                return { id, ...data };
            }))
        );
  }
  
  getLojas(){
    let lojasMapeadas = this.afs.collection('users',ref => ref.where('tipo' , '==' , 'Loja') && ref.where('aprovado' , '==' , 'Sim') );
     return lojasMapeadas.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      const data = a.payload.doc.data() as User;
      const id = a.payload.doc.id;
      return { id, ...data };
    })))
  }
  getEntregas(){
    let entregasMapeadas = this.afs.collection('clickEntregas');
     return entregasMapeadas.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      const data = a.payload.doc.data() as any;
      const id = a.payload.doc.id;
      return { id, ...data };
    })))
  }
  imageName() {
    const newTime = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * 20) + newTime;
  }

    async storeImage(imageData: any) {
      try {
          const imageName = this.imageName();
          return new Promise((resolve, reject) => {
          const pictureRef = this.angularFireStorage.ref(imageName + '.jpg');
          pictureRef.put(imageData).then(function () {
              pictureRef.getDownloadURL().subscribe((url: any) => {
                resolve(url);
                });
            }).catch((error) => {
              reject(error);
          });
        });
        } catch (e) {

        }
    }
  getLoja(id:string){
    return this.userCollection.doc<User>(id).valueChanges()
  }
  getTodosProdutos(){
    let produtos = this.afs.collection<any>('produto');
    return produtos.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Processo;
        const id = a.payload.doc.id;
        return { id, ...data };
      })))

  }
 data(){
   return new Promise(resolve => {
        this.http.get<any[]>('/assets/cidades.json').subscribe(data => {
          resolve(data);
          console.log(data);
        }, err => {
          console.log(err);
        });
      });
  }
  data2(){
    return new Promise(resolve => {
         this.http.get<any[]>('/assets/bancos.json').subscribe(data => {
           resolve(data);
           console.log(data);
         }, err => {
           console.log(err);
         });
       });
   }
   data3(){
    return new Promise(resolve => {
         this.http.get<any[]>('/assets/erros-firebase.json').subscribe(data => {
           resolve(data);
           console.log(data);
         }, err => {
           console.log(err);
         });
       });
   }
   data4(){
    return new Promise(resolve => {
      this.http.get<any[]>('/assets/produtos.json').subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
   }
   data5(){
    return new Promise(resolve => {
      this.http.get<any[]>('/assets/produtos.json').subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
   }
   // Login in with email/password
  async SignIn(email, password) {
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }

  // Register user with email/password
  async RegisterUser(email2, password2) {
    return await this.ngFireAuth.createUserWithEmailAndPassword(email2, password2)
  }

  async logout(){
    
    return await this.ngFireAuth.signOut().then((res) => {
      console.log(res)
      localStorage.removeItem('usuario');
      localStorage.removeItem('id');
      this.storage.remove('usuario')
      this.storage.remove('id')
    })
  }

  deleteUnidade(id:string,item:any){
   this.userCollection.doc<User>(id).update({filiais: firebase.default.firestore.FieldValue.arrayRemove(item)})  
  }
  deleteFilial(id:string,){
    this.filiaisCollection.doc<Filial>(id).delete()
   }
  updateUnidade(id:string, endereco: string, cep:string, bairro:string,complemento:string, numero:any, cidade:string, estado:string, lat:string,lng:string,nome:string,FotoPerfil:string,entrega:string,seNao:string){
    const {uid} = firebase.default.auth().currentUser;
    var aprovado = 'Sim'
    var tipo = 'Loja'
    var status = 'Online'
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
    this.userCollection.doc<User>(id).update({unidades: firebase.default.firestore.FieldValue.arrayUnion(data)})  
}
updateFiliais(id:string, idFilial:string){
  const data ={
    idFilial
  }
  this.userCollection.doc<User>(id).update({filiais: firebase.default.firestore.FieldValue.arrayUnion(data)})
}
  addUser(user: User) {
    this.userCollection.add(user);
  }

  addProc(processo: Processo) {
    this.processoCollection.add(processo);
  }
  update(id: string, user: User) {
    this.userCollection.doc<User>(id).update(user);
  }
  getEmail() {
  	return this.user.email;
  }
  getProc(id: string) {
    if(this.router.url === '/home'){
      return this.userCollection.doc<User>(id).valueChanges();

    }else{
      console.log('haha')
      
    }
  }
  getStatusProd(id: string) {
    return this.vendasCollection.doc<Vendas>(id).valueChanges();
  }
  getProdutos(id: string) {
    return this.processoCollection.doc<Processo>(id).valueChanges();
  }
 getLikes(id: string) {
    return this.userCollection.doc<User>(id).valueChanges().subscribe((data) => {
      //this.likes = data.LikeValue;
      //this.dislikes = data.DislikeValue;
      console.log(this.likes);
    });
 }
  updateEntregas(id:string, identregador:string, status:string){
    this.vendasCollection.doc<Vendas>(id).update({entregador:identregador, statusEnt: status})
  }

  like(id: string , loja: Processo) {
      this.likes++;
      return this.userCollection.doc<User>(id).update({LikeValue: Number(this.likes)});

  }
   comment(id: string) {
      return this.commentsCollection.doc<Comentario>(id).valueChanges();
 }
  
  dislike(id: string, loja: Processo) {
    this.dislikes++;
    return this.userCollection.doc<User>(id).update({DislikeValue: Number(this.dislikes)});
  }
  deletarItem(id){
      return this.processoCollection.doc<Processo>(id).delete();
  }
updateEnd(id: string, tipo:string, end: string, cep:string, bairro:string,comple:string, numero:string, cidade:string, estado:string, lat:string,lng:string) {
    this.userCollection.doc<User>(id).update({endereco: end,zona:tipo,
                                              CEP:cep,
                                              bairro:bairro,
                                              complemento:comple,
                                              numeroEND: numero,           
                                              cidade: cidade,
                                              estado: estado,
                                              lat:lat,
                                              lng:lng  });
  }
  updateBanco(id:string,banco:string, agencia:number,conta:number,correnteoupou:string, nomeNaConta:string, CPFconta:string, digito:number,numeroBank:number) {
    this.userCollection.doc<User>(id).update({
      banco:banco,
      agencia:Number(agencia),
      conta:Number(conta),
      correnteoupou:correnteoupou,
      nomeNaConta:nomeNaConta,
      CPFconta: CPFconta,
      digitoConta: Number(digito),
      numeroBank: Number(numeroBank)
    });
  }
  updateFCM(id:string,FCM:string) {
    this.userCollection.doc<User>(id).update({fcm: FCM});
  }

  updateOrcamento(id:string, idChat:any){
    this.orcamentoCollection.doc<Orcamento>(id).update({chat:idChat})
  }
  deleteOrcamento(id:string,item:any){
    this.orcamentoCollection.doc<Orcamento>(id).update({orcamento: firebase.default.firestore.FieldValue.arrayRemove(item)})  
   }
  updateOrcamentoVal(id:string, price:number, valor:string, produtos:any, valorHTM:string){
    //const data = produtos;
  //  console.log(data)
    this.orcamentoCollection.doc<Orcamento>(id).update({
      price:price, 
      valor:valor,
      orcamento:produtos,
      valorHTML:valorHTM
    })

  }  
  getOrcamento(id:string){
   return this.orcamentoCollection.doc<Orcamento>(id).valueChanges();

  }
  updateChat(id:string,conteudo:string){
      const {uid} = firebase.default.auth().currentUser;
      const data = {
         uid,
         conteudo,
         criadoEm: Date.now()
     }
      this.chatCollection.doc<Chat>(id).update({mensagens: firebase.default.firestore.FieldValue.arrayUnion(data)})  
  }
  updateCupom(id:string,cupom:string){
    const {uid} = firebase.default.auth().currentUser;
    const data = {
       uid,
       cupom,
       usadoEm: Date.now()
   }
    this.userCollection.doc<User>(id).update({cupons: firebase.default.firestore.FieldValue.arrayUnion(data)})  
}
  updateVendas(id:string, chatId:string){
    this.vendasCollection.doc<Vendas>(id).update({chat: chatId})
  }
  updateVComentario(id:string, comentario:string){
    this.vendasCollection.doc<Vendas>(id).update({comentario: comentario})
  }

  updateComentario(id:string, comentario:string){
    this.commentsCollection.doc<Comentario>(id).update({comments: comentario})
  }
  getChat(id:string){
    return this.chatCollection.doc<Chat>(id).valueChanges();
  }
  updateEntrega(id: string, entrega:string, seNao:string){
    this.userCollection.doc<User>(id).update({entrega: entrega, seNao:seNao});

  }
  updateProduto(id: string, nomeNovo:string,nomeLoja:string, priceNovo:number, productNovo:string,quantityNovo:number,
    tipoPrdNovo:string, valorNovo:number, detailNovo:string, resumoNovo:string,especiNovo:Array<any>,photos:Array<any>, estado: string, aprovado:string,lojaUID:string){
    this.processoCollection.doc<Processo>(id).update({
      nome: nomeNovo,
      nomeLoja:nomeLoja,
      price: priceNovo,
      product: nomeNovo,
      quantity: quantityNovo,
      valor: valorNovo,
      tipoPrd: tipoPrdNovo,
      noApp: "Sim",
      detail: detailNovo,
      resumo:resumoNovo,
      especi:especiNovo,
      fotos:photos,
      estado: estado,
      aprovado: aprovado,
      lojaUID: lojaUID
    })
  }
  updateStatus(id:string, opc: string){
    this.userCollection.doc<User>(id).update({
      status: opc
    })
  }
  updateFilialStatus(id:string, opc: string){
    this.filiaisCollection.doc<Filial>(id).update({
      status: opc
    })
  }
  updatePagamento(id:string,status:string){
    this.vendasCollection.doc<Vendas>(id).update({statusPag: status})
  }
  updateDivida(id:string,divida:number){
    this.vendasCollection.doc<Vendas>(id).update({valorDevedor: divida})
  }
  updateComplemento(id:string, complemento:string){
    this.userCollection.doc<User>(id).update({complemento: complemento})
  }
/*



detail: "Uma caixa de velas"
email: "lojazonanorte@gmail.com"
fotos: [{???}]
noApp: "Sim"
nome: "Caixa de Velas"
price: 1000
product: "caixa de obi"
quantity: 10
resumo: "Uma caixa de velas"
tipoPrd: "Velas"
valor: 10

.nomeNaConta}}</p>
      <p>{{loja.banco}}</p>
      <p>{{loja.agencia}}</p>
      <p>{{loja.conta}}</p>
      <p>{{loja.correnteoupou}}
 addProduct(product: Product) {
    return this.productsCollection.add(product);
  }

  getProduct(id: string) {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }



  deleteProduct(id: string) {
    return this.productsCollection.doc(id).delete();
  }

*/

}
