// register.component.ts
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
  currentStep: number = 1; // 1: Kayıt, 2: Doğrulama, 3: Ödeme
  verificationCode: string = '';
  formData = {
    name: '',
    surname: '',
    email: '',
    phone: ''
  };

  message: string = '';
  errorMessage: string = '';
  language = 'tr';

  constructor(private route: ActivatedRoute, private router: Router, private registerService: RegisterService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe(params => {
      this.packageType = params['packageType'] || 'standart';
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmit() {
    if (!this.formData.name || !this.formData.surname || !this.formData.email || !this.formData.phone) {
      this.errorMessage = this.language === 'en' ? 'Please fill out all required fields.' : 'Lütfen tüm alanları doldurunuz.';
      return;
    }

    if (!this.isValidEmail(this.formData.email)) {
      this.errorMessage = this.language === 'en' ? 'Please enter a valid email address.' : 'Lütfen geçerli bir e-posta adresi giriniz.';
      return;
    }

    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('page-loaded');

    this.registerService.register(this.formData).subscribe({
      next: (res) => {
        this.message = this.language === 'en'
          ? 'Registration successful. Please check your email for verification code.'
          : 'Kayıt başarılı. Lütfen e-postanızı kontrol ederek doğrulama kodunu giriniz.';
        this.currentStep = 2; // Doğrulama adımına geç
      },
      error: (err) => {
        this.errorMessage = this.language === 'en'
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

  verifyCode() {
    if (!this.verificationCode) {
      this.errorMessage = this.language === 'en'
        ? 'Please enter verification code.'
        : 'Lütfen doğrulama kodunu giriniz.';
      return;
    }
    const payload: VerifieEmailDTO = {
      Email: this.formData.email,
      VerificationCode: this.verificationCode
    };
    this.registerService.verifyEmail(payload).subscribe({
      next: (res) => {
        this.currentStep = 3; // Ödeme adımına geç
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = this.language === 'en'
          ? 'Invalid verification code.'
          : 'Geçersiz doğrulama kodu.';
      }
    });
  }

  proceedToPayment() {
    // Ödeme sayfasına yönlendirme veya ödeme modal'ını açma
    const paymentUrl = `https://pay.posfixmenu.com?email=${encodeURIComponent(this.formData.email)}&packageId=${this.packageType}`;
    window.location.href = paymentUrl;
  }

  goBackToPlans() {
    this.router.navigateByUrl('/').then(() => {
      location.reload();
    });
  }
}
interface VerifieEmailDTO {
  Email: string;
  VerificationCode: string;
}