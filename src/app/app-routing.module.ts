import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";
import { RegisterComponent } from "./pages/register/register.component";

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  {
    path: "",
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
