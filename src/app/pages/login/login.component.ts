import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers:[
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForms!: FormGroup

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService : ToastrService
  )
  {
    this.loginForms = new FormGroup({
      //name: new FormControl("",[Validators.nullValidator]),
      email :new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('',[Validators.required, Validators.minLength(6)])
    })
  }

  submit(){
    this.loginService.login(this.loginForms.value.email, this.loginForms.value.password).subscribe({
        next:() => this.toastrService.success("Login fetio do sucesso!"),
        error:() => this.toastrService.error("ERRO!! Senha ou usuario incorretos!!")

    })
  }
  navegate(){
    this.router.navigate(["signup"])
  }
}
