import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  let loginService = inject(LoginService);
  if(loginService.hasRole("USER") && state.url == '/admin/carros'){
    alert("Você não tem permissão de acesso!")
    return false;
  }

  return true;
};
