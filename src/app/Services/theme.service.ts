import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string;

  constructor() { 
    this.currentTheme = 'dark';
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  toggleCurrentTheme(): void {
    if(this.currentTheme === 'light'){
      this.currentTheme = 'dark';
    }else{
      this.currentTheme = 'light';
    }
  }
}
