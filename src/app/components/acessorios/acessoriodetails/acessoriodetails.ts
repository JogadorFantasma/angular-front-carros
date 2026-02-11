import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { ActivatedRoute, Router } from '@angular/router';
import { AcessorioService } from '../../../services/acessorioService';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acessoriodetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessoriodetails.html',
  styleUrl: './acessoriodetails.scss',
})
export class Acessoriodetails {

 @Input('acessorio') acessorio: Acessorio = new Acessorio();
  @Output('retorno') retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  acessorioService = inject(AcessorioService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }else{
    }
  }

  findById(id: number){
    this.acessorioService.findById(id).subscribe({
      next: retorno =>{
        this.acessorio = retorno;
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
    if(this.acessorio.id > 0){
      console.log(this.acessorio); //return;
      this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
      next: mensagem =>{
        Swal.fire({
        title: mensagem,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/acessorios'], {state: {acessorioEditado: this.acessorio}});
      this.retorno.emit(this.acessorio);
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
      this.acessorioService.save(this.acessorio).subscribe({
     
      next: mensagem =>{
        Swal.fire({
        title: mensagem,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/acessorios'], {state: {acessorioNovo: this.acessorio}});
      this.retorno.emit(this.acessorio);
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
}
