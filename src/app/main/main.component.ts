import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent {
  package1Type: number = 1; // 1: Starter Yıllık, 2: Starter Aylık
  package2Type: number = 3;
  model: SendMail = {
    mail: "",
    message: "",
  };
  isSended = false;
  error = "";
  constructor(private http: HttpClient) {}

  setValue(packag: number, type: number) {
    if (packag == 1) {
      this.package1Type = type;
    } else {
      this.package2Type = type;
    }
  }
  isValidEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  sendMail() {
    if (this.isValidEmail(this.model.mail!)) {
      this.http
        .post(
          "https://restapi.posfixmenu.com/api/Contact/AddContact",
          this.model
        )
        .subscribe((res) => {
          this.isSended = true;
        });
    } else {
      this.error = "Mail doğru formatta yazılmamış";
    }
  }
}

export class SendMail {
  mail?: string;
  message?: string;
}
