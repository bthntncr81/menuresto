import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  packageType: string = '';
  formData = {
    name: '',
    surname: '',
    email: '',
    phone: ''
  };

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    window.scrollTo(0, 0); // 👈 Sayfa en üste çıksın
    // URL'den paket bilgisini al
    this.route.queryParams.subscribe(params => {
      this.packageType = params['packageType'] || 'standart';
    });
  }

  onSubmit() {
    console.log('Form Gönderildi:', this.formData);
    alert(`Teşekkürler, ${this.formData.name}! Seçtiğiniz paket: ${this.packageType}`);
  }

  goBackToPlans() {
    this.router.navigateByUrl('/').then(() => {
      location.reload(); // 👈 Sayfayı tamamen yenile
    });
  }
}
