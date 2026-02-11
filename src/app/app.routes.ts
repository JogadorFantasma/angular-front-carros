import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login';
import { Principal } from './components/layout/principal/principal';
import { Carroslist } from './components/carros/carroslist/carroslist';
import { Carrosdetails } from './components/carros/carrosdetails/carrosdetails';
import { Marcaslist } from './components/marcas/marcaslist/marcaslist';
import { Marcasdetails } from './components/marcas/marcasdetails/marcasdetails';
import { Acessoriolist } from './components/acessorios/acessoriolist/acessoriolist';
import { Acessoriodetails } from './components/acessorios/acessoriodetails/acessoriodetails';
import { loginGuard } from './auth/login-guard';

export const routes: Routes = [

    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: LoginComponent},
    {path: "admin", component: Principal, canActivate: [loginGuard]  ,children: [
        {path: "carros", component: Carroslist},
        {path: "carros/new", component: Carrosdetails},
        {path: "carros/edit/:id", component: Carrosdetails},
        {path: "marcas", component: Marcaslist},
        {path: "marcas/new", component: Marcasdetails},
        {path: "marcas/edit/:id", component: Marcasdetails},
        {path: "acessorios", component: Acessoriolist},
        {path: "acessorios/new", component: Acessoriodetails},
        {path: "acessorios/edit/:id", component: Acessoriodetails}

    ]},


];
