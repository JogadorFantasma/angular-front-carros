import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carroService';
import { Marcaslist } from "../../marcas/marcaslist/marcaslist";
import { Marca } from '../../../models/marca';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Acessoriolist } from "../../acessorios/acessoriolist/acessoriolist";
import { Acessorio } from '../../../models/acessorio';

@Component({
  selector: 'app-carrosdetails',
  imports: [MdbFormsModule, FormsModule, Marcaslist, Acessoriolist],
  templateUrl: './carrosdetails.html',
  styleUrl: './carrosdetails.scss',
})
export class Carrosdetails {

  @Input('carro') carro: Carro = new Carro();
  @Output('retorno') retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  carroService = inject(CarroService);

  // ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); //para conseguir abrir a modal
  @ViewChild('modalMarcas') modalMarcas!: TemplateRef<any>;
  @ViewChild('modalAcessorios') modalAcessorios!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }else{

    }
  }

  findById(id: number){
    
    this.carroService.findById(id).subscribe({
      next: retorno =>{
        this.carro = retorno;
      },
      error: erro => {
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    });


  }

  salvar(){
    if(this.carro.id > 0){
      console.log(this.carro); //return;
      this.carroService.update(this.carro, this.carro.id).subscribe({
      next: mensagem =>{
        Swal.fire({
        title: mensagem,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/carros'], {state: {carroEditado: this.carro}});
      this.retorno.emit(this.carro);
    },
      error: erro => {
        Swal.fire({
                title: "Ocorreu um erro!",
                icon: 'error',
                confirmButtonText: 'Ok'
              })
      }
    }); 
    }else{
      // console.log(this.carro); return;
      
      this.carroService.save(this.carro).subscribe({
     
      next: mensagem =>{
        Swal.fire({
        title: mensagem,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/carros'], {state: {carroNovo: this.carro}});
      this.retorno.emit(this.carro);
    },
      error: erro => {
        Swal.fire({
                title: "Ocorreu um erro!",
                icon: 'error',
                confirmButtonText: 'Ok'
              })
      }
    });
    
    }
    
  }
  buscarMarca(){
    this.modalRef = this.modalService.open(this.modalMarcas, {modalClass: 'modal-lg'});
  }

  buscarAcessorio(){
    this.modalRef = this.modalService.open(this.modalAcessorios, {modalClass: 'modal-lg'});
  }

  retornoMarca(marca: Marca){
    this.carro.marca = marca;
    this.modalRef.close();
  }

  retornoAcessorio(acessorio: Acessorio){

    if(this.carro.acessorios == null)
      this.carro.acessorios = [];
    this.carro.acessorios.push(acessorio);

    this.modalRef.close();
  }

  desvincularAcessorioCarro(acessorio: Acessorio){

    let posicao = this.carro.acessorios.findIndex(x => {return x.id == acessorio.id});
    this.carro.acessorios.splice(posicao,1);
  }

}
