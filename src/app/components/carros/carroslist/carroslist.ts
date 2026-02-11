import { Component, Inject, inject, TemplateRef, ViewChild, viewChild } from '@angular/core';
import { Carro } from '../../../models/carro';
import { RouterLink } from "@angular/router";
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Carrosdetails } from '../carrosdetails/carrosdetails';
import { CarroService } from '../../../services/carroService';

@Component({
  selector: 'app-carroslist',
  imports: [RouterLink, MdbModalModule, Carrosdetails],
  templateUrl: './carroslist.html',
  styleUrl: './carroslist.scss',
})
export class Carroslist {

lista: Carro[] = [];
carroEdit: Carro = new Carro(0,"");

// ELEMENTOS DA MODAL
modalService = inject(MdbModalService); //para conseguir abrir a modal
@ViewChild('modalCarroDetalhe') modalCarroDetalhe!: TemplateRef<any>;
modalRef!: MdbModalRef<any>;

carrosService = inject(CarroService);
constructor(){
  this.findAll();

 

  let carroNovo = history.state.carroNovo;
  let carroEditado = history.state.carroEditado;

  if(carroNovo){
    carroNovo.id = 555;
    this.lista.push(carroNovo);
  }
  if(carroEditado){
    let indice = this.lista.findIndex(x => {return x.id == carroEditado.id});
    this.lista[indice] = carroEditado;
  }

}

findAll(){

  this.carrosService.findAll().subscribe({
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

deleteById(carro: Carro){

  Swal.fire({
          title: 'Tem certeza que deseja deletar este registro?',
          icon: 'warning',
          showConfirmButton: true,
          showDenyButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não'
        }).then((result) => {
          if(result.isConfirmed){


           this.carrosService.delete(carro.id).subscribe({
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
  this.carroEdit = new Carro(0,"");
  this.modalRef = this.modalService.open(this.modalCarroDetalhe);
}
edit(carro:Carro){
  this.carroEdit =  Object.assign({}, carro); // clonando para evitar referencia de objeto;
  this.modalRef = this.modalService.open(this.modalCarroDetalhe);
}

retornoDetalhe(carro:Carro){
  this.findAll();
  this.modalRef.close();
}

}
