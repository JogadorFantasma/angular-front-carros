import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Acessoriodetails } from "../acessoriodetails/acessoriodetails";
import { Acessorio } from '../../../models/acessorio';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcessorioService } from '../../../services/acessorioService';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acessoriolist',
  imports: [RouterLink, MdbModalModule, Acessoriodetails],
  templateUrl: './acessoriolist.html',
  styleUrl: './acessoriolist.scss',
})
export class Acessoriolist {

  lista: Acessorio[] = [];
acessorioEdit: Acessorio = new Acessorio();

@Input('esconderBotoes') esconderBotoes: boolean = false;
@Output('retorno') retorno = new EventEmitter<any>();

modalService = inject(MdbModalService); //para conseguir abrir a modal
@ViewChild('modalAcessorioDetalhe') modalAcessorioDetalhe!: TemplateRef<any>;
modalRef!: MdbModalRef<any>;

acessorioService = inject(AcessorioService);
constructor(){
  this.findAll();

 

  let acessorioNovo = history.state.acessorioNovo;
  let acessorioEditado = history.state.acessorioEditado;

  if(acessorioNovo){
    acessorioNovo.id = 555;
    this.lista.push(acessorioNovo);
  }
  if(acessorioEditado){
    let indice = this.lista.findIndex(x => {return x.id == acessorioEditado.id});
    this.lista[indice] = acessorioEditado;
  }

}

findAll(){

  this.acessorioService.findAll().subscribe({
    next: lista =>{
      this.lista = lista;
    },
    error: err =>{
      Swal.fire({
        title: "Ocorreu um erro!",
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  });

}

deleteById(acessorio: Acessorio){

  Swal.fire({
          title: 'Tem certeza que deseja deletar este registro?',
          icon: 'warning',
          showConfirmButton: true,
          showDenyButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
        }).then((result) => {
          if(result.isConfirmed){


           this.acessorioService.delete(acessorio.id).subscribe({
              next: mensagem =>{
                 Swal.fire({
                    title: mensagem,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  });
                  this.findAll();
              },
              error: err =>{
                Swal.fire({
                    title: "Ocorreu um erro!",
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
              }
            });


           
          }
        })
}
new(){
  this.acessorioEdit = new Acessorio();
  this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
}
edit(acessorio:Acessorio){
  this.acessorioEdit=  Object.assign({}, acessorio); // clonando para evitar referencia de objeto;
  this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
}

retornoDetalhe(acessorio:Acessorio){
  this.findAll();
  this.modalRef.close();
}
select(acessorio: Acessorio){
  this.retorno.emit(acessorio);
}

}