import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContextService {
  private user: any;

  setUser(user: any) {
    this.user = user;
  }

  getUser(): any {
    return this.user;
  }

  logoutUser(): void {
    this.user = null;
    localStorage.clear();
  }
}
