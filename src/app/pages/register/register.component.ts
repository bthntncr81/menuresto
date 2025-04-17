// register.component.ts
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RegisterService } from "./register.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  packageType: string = "";
  currentStep: number = 1; // 1: Kayıt, 2: Doğrulama, 3: Ödeme
  verificationCode: string = "";
  formData = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    businessName: "",
  };
  userId = 0;
  loading: boolean = false;
  loadingVerifie: boolean = false;
  loadingReSend: boolean = false;

  message: string = "";
  errorMessage: string = "";
  language = "tr";
  showTermsModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registerService: RegisterService,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.queryParams.subscribe((params) => {
      this.packageType = params["packageType"] || "standart";
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  openTermsModal(event: Event) {
    event.preventDefault();
    this.showTermsModal = true;
  }
  onSubmit() {
    if (
      !this.formData.name ||
      !this.formData.surname ||
      !this.formData.email ||
      !this.formData.phone ||
      !this.formData.businessName
    ) {
      this.errorMessage =
        this.language === "en"
          ? "Please fill out all required fields."
          : "Lütfen tüm alanları doldurunuz.";
      return;
    }

    if (!this.isValidEmail(this.formData.email)) {
      this.errorMessage =
        this.language === "en"
          ? "Please enter a valid email address."
          : "Lütfen geçerli bir e-posta adresi giriniz.";
      return;
    }
    this.loading = true;

    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("page-loaded");

    this.registerService.register(this.formData).subscribe({
      next: (res) => {
        this.userId = res.data.id;
        this.message =
          this.language === "en"
            ? "Registration successful. Please check your email for verification code."
            : "Kayıt başarılı. Lütfen e-postanızı kontrol ederek doğrulama kodunu giriniz.";
        this.currentStep = 2; // Doğrulama adımına geç
      },
      error: (err) => {
        this.errorMessage =
          this.language === "en"
            ? "Registration failed: " + err.error.message
            : "Kayıt başarısız: " + err.error.message;
      },
      complete: () => {
        this.loading = false;
        setTimeout(() => {
          body.classList.add("page-loaded");
          body.style.overflowY = "";
        }, 500);
      },
    });
  }

  verifyCode() {
    if (!this.verificationCode) {
      this.errorMessage =
        this.language === "en"
          ? "Please enter verification code."
          : "Lütfen doğrulama kodunu giriniz.";
      return;
    }
    const payload: VerifieEmailDTO = {
      Email: this.formData.email,
      VerificationCode: this.verificationCode,
    };
    this.loadingVerifie = true;

    this.registerService.verifyEmail(payload).subscribe({
      next: (res) => {
        this.currentStep = 3; // Ödeme adımına geç
        if (+this.packageType == 6) {
          this.goPaymentDone();
        }
        this.errorMessage = "";
        this.loadingVerifie = false;
      },
      error: (err) => {
        this.errorMessage =
          this.language === "en"
            ? "Invalid verification code."
            : "Geçersiz doğrulama kodu.";
      },
    });
  }
  reSend() {
    this.loadingReSend = true;
    this.registerService.ReSendVerificationCode(this.formData).subscribe({
      next: (res) => {
        this.message =
          this.language === "en"
            ? "Please check your email for verification code."
            : "Lütfen e-postanızı kontrol ederek doğrulama kodunu giriniz.";
        this.currentStep = 2; // Doğrulama adımına geç
      },
      error: (err) => {
        this.errorMessage =
          this.language === "en"
            ? "Registration failed: " + err.error.message
            : "Kayıt başarısız: " + err.error.message;
      },
      complete: () => {
        this.loadingReSend = false;
      },
    });
  }
  proceedToPayment() {
    // Ödeme sayfasına yönlendirme veya ödeme modal'ını açma

    const paymentUrl = `https://pay.posfixmenu.com?email=${encodeURIComponent(
      this.formData.email
    )}&packageId=${this.packageType}`;
    window.location.href = paymentUrl;
  }
  goPaymentDone() {
    var model = {
      userId: this.userId,
      transactionId: 12345678,
      subscriptionType: 6,
      amount: 0,
    };
    return this.httpClient
      .post("https://restapi.posfixmenu.com/api/Payment/PaymentDone", model)
      .subscribe((res) => {});
  }

  goBackToPlans() {
    this.router.navigateByUrl("/").then(() => {
      location.reload();
    });
  }
}
interface VerifieEmailDTO {
  Email: string;
  VerificationCode: string;
}
