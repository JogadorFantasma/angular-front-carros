import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../../services/marca-service';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-marcasdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './marcasdetails.html',
  styleUrl: './marcasdetails.scss',
})
export class Marcasdetails {

  @Input('marca') marca: Marca = new Marca();
  @Output('retorno') retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);
  marcaService = inject(MarcaService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }else{
    }
  }

  findById(id: number){
    this.marcaService.findById(id).subscribe({
      next: retorno =>{
        this.marca = retorno;
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
    if(this.marca.id > 0){
      console.log(this.marca); //return;
      this.marcaService.update(this.marca, this.marca.id).subscribe({
      next: mensagem =>{
        Swal.fire({
        title: mensagem,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/marcas'], {state: {marcaEditado: this.marca}});
      this.retorno.emit(this.marca);
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
      this.marcaService.save(this.marca).subscribe({
     
      next: mensagem =>{
        Swal.fire({
        title: mensagem,
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.router2.navigate(['admin/marcas'], {state: {marcaNovo: this.marca}});
      this.retorno.emit(this.marca);
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
