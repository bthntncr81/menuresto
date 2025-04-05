import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from './register.service';

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

  message: string = '';
  errorMessage: string = '';
  language = 'tr'; // veya 'en'
  constructor(private route: ActivatedRoute, private router: Router, private registerService: RegisterService) { }

  ngOnInit() {
    window.scrollTo(0, 0); // 👈 Sayfa en üste çıksın
    // URL'den paket bilgisini al
    this.route.queryParams.subscribe(params => {
      this.packageType = params['packageType'] || 'standart';
    });
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmit() {
    // Form doluluk kontrolü
    if (
      !this.formData.name ||
      !this.formData.surname ||
      !this.formData.email ||
      !this.formData.phone
    ) {
      this.errorMessage =
        this.language === 'en'
          ? 'Please fill out all required fields.'
          : 'Lütfen tüm alanları doldurunuz.';
      return;
    }

    // E-mail doğrulama
    if (!this.isValidEmail(this.formData.email)) {
      this.errorMessage =
        this.language === 'en'
          ? 'Please enter a valid email address.'
          : 'Lütfen geçerli bir e-posta adresi giriniz.';
      return;
    }

    // Arka plan işaretleme
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('page-loaded');

    // Register API çağrısı
    this.registerService.register(this.formData).subscribe({
      next: (res) => {
        this.message =
          this.language === 'en'
            ? 'Registration successful. Please check your email to verify.'
            : 'Kayıt başarılı. Lütfen e-postanızı kontrol ederek doğrulayınız.';
      },
      error: (err) => {
        this.errorMessage =
          this.language === 'en'
            ? 'Registration failed: ' + err.error.message
            : 'Kayıt başarısız: ' + err.error.message;
      },
      complete: () => {
        setTimeout(() => {
          body.classList.add('page-loaded');
          body.style.overflowY = '';
        }, 500);
      },
    });
  }
  goBackToPlans() {
    this.router.navigateByUrl('/').then(() => {
      location.reload(); // 👈 Sayfayı tamamen yenile
    });
  }
}
