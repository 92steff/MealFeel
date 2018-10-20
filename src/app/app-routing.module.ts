import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    {path:'', component: HomeComponent},
    {path:'restaurants', loadChildren: './restaurants/restaurants.module#RestaurantsModule'},
    {path:'myProfile', canActivate: [AuthGuard], component:UserComponent}
]


@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports:[RouterModule]
})

export class AppRoutingModule {

}