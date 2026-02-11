import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Marcasdetails } from '../marcasdetails/marcasdetails';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcaslist',
  imports: [RouterLink, MdbModalModule, Marcasdetails],
  templateUrl: './marcaslist.html',
  styleUrl: './marcaslist.scss',
})
export class Marcaslist {
lista: Marca[] = [];
marcaEdit: Marca = new Marca();

@Input('esconderBotoes') esconderBotoes: boolean = false;
@Output('retorno') retorno = new EventEmitter<any>();

modalService = inject(MdbModalService); //para conseguir abrir a modal
@ViewChild('modalMarcaDetalhe') modalMarcaDetalhe!: TemplateRef<any>;
modalRef!: MdbModalRef<any>;

marcaService = inject(MarcaService);
constructor(){
  this.findAll();

 

  let marcaNovo = history.state.marcaNovo;
  let marcaEditado = history.state.marcaEditado;

  if(marcaNovo){
    marcaNovo.id = 555;
    this.lista.push(marcaNovo);
  }
  if(marcaEditado){
    let indice = this.lista.findIndex(x => {return x.id == marcaEditado.id});
    this.lista[indice] = marcaEditado;
  }

}

findAll(){

  this.marcaService.findAll().subscribe({
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

deleteById(marca: Marca){

  Swal.fire({
          title: 'Tem certeza que deseja deletar este registro?',
          icon: 'warning',
          showConfirmButton: true,
          showDenyButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
        }).then((result) => {
          if(result.isConfirmed){


           this.marcaService.delete(marca.id).subscribe({
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
  this.marcaEdit = new Marca();
  this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
}
edit(marca:Marca){
  this.marcaEdit=  Object.assign({}, marca); // clonando para evitar referencia de objeto;
  this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
}

retornoDetalhe(marca:Marca){
  this.findAll();
  this.modalRef.close();
}
select(marca: Marca){
  this.retorno.emit(marca);
}

}
