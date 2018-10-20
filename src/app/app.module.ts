import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './recipes/store/recipes.effects';
import { AppRoutingModule } from './app-routing.module';
import { AuthEffects } from './auth/store/auth.effects';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './core/home/home.component';
import { HeaderComponent } from './core/header/header.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UserEffects } from './user/store/user.effects';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      RecipeEffects,
      AuthEffects,
      UserEffects
    ]),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
