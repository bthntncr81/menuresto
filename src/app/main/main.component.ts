import { Component } from '@angular/core';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',

})
export class MainComponent {
  package1Type: number = 1; // 1: Starter Yıllık, 2: Starter Aylık
  package2Type: number = 3;

  setValue(packag: number, type: number) {
    if (packag == 1) {
      this.package1Type = type;
    } else {
      this.package2Type = type;

    }
  }
}
