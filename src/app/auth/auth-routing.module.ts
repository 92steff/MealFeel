import { NgModule } from "@angular/core";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { Routes, RouterModule } from "@angular/router";

const authRoutes:Routes = [
    {path: 'sign-in', component: SignInComponent},
    {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
    imports:[        
       RouterModule.forChild(authRoutes)
    ],
    exports: [RouterModule]
})

export class AuthRoutingModule {}