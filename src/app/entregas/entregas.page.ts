import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})
export class EntregasPage implements OnInit {
  nomeDestinatario :string
  endereco :string
  complemento:any
  bairro:string
  pontos: Array<any> = []
  estado:string;
  cidade:string;
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.pontos.push({
      "address":'R. Guamiranga, 1140 - Vila Independencia, São Paulo - SP, 04220-020',
      "contact_person":{
        "name":'this.user.nome',
        "phone":"55"+'+this.user.ddd + this.user.telefone'
      }
    })
  }
  calDesti(){
    if(this.endereco != ''){
      if(this.complemento != ''){
       if(this.bairro != ''){
         if(this.nomeDestinatario != ''){
           if(this.cidade != ''){
            this.pontos.push({
              "address":this.endereco+','+ this.complemento +' - '+ this.bairro + ', '+ this.cidade+' - '+ this.estado,
              "contact_person":{
                "name":this.nomeDestinatario,
                "phone":"telefoneAxé"
              }
            })
            console.log(this.pontos)
          }else{
            alert('Verifique o campo cidade e tente novamente.')
            // this.valor = items.valor
             // this.updateprod(items)
            }
          }else{
            alert('Verifique o campo Nome do Destinatário e tente novamente.')
            // this.qtd = items.quantity;
          }
        }else{
          alert('Verifique o campo Complemento e tente novamente.')
          // this.resumo = items.resumo
        }
      }else{
        alert('Verifique o campo Complemento e tente novamente.')
        // this.nomePrd = items.product;
      }
     }else{
      alert('Verifique o campo Endereço e tente novamente.')
      // this.type = items.tipoPrd

     } 
      


  }
  addDestinoAlt(){
    this.pontos.push({
      "address":this.endereco,
      "contact_person":{
        "name":this.nomeDestinatario,
        "phone":"telefoneAxé"
      }
    })
    this.endereco =''
    this.nomeDestinatario = ''
  }

}
