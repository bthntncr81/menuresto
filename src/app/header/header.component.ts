import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public router: Router) { }
  get showHeader(): boolean {
    return this.router.url === '/' || this.router.url.includes('#');
  }
}
