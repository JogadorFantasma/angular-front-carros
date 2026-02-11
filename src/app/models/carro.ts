import { Acessorio } from "./acessorio";
import { Marca } from "./marca";

export class Carro {

    id!: number;
    nome!: string;
    marca!: Marca;
    acessorios: Acessorio[] = [];

    constructor(id?: number, nome?: string, marca?: Marca){
        if (id) this.id = id;
        if (nome) this.nome = nome;
        if (marca) this.marca = marca;

    }
}
