import { NgModule } from "@angular/core";
import { AuthService } from "./auth.service";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { ValidationErrorMsgComponent } from "./validation-error-msg/validation-error-msg.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./auth.interceptor";
import { AuthRoutingModule } from "./auth-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[
        SignInComponent,
        SignUpComponent,
        ValidationErrorMsgComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule
    ],
    providers:[
        AuthService,
        {provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true}
    ]
})

export class AuthModule {}