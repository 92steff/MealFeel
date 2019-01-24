import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  userSignInForm:FormGroup;
  emailErrorMsg;
  passErrorMsg;
  isFormSubmitted:boolean = false;
  subscription:Subscription;

  constructor(private store:Store<fromApp.AppState>, private authService:AuthService) { }

  ngOnInit() {
    this.initForm();
    this.subscription = this.authService.errMsg.subscribe(
      (err:{emailErr,passErr}) => {
        this.emailErrorMsg = err.emailErr;
        this.passErrorMsg = err.passErr;
      }
    )
  }

  initForm() {
    this.userSignInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  submitSignIn(form:FormGroup) {
    this.isFormSubmitted = true;

    this.store.dispatch(
      new AuthActions.TrySignin({
        email: form.controls.email.value,
        password: form.controls.password.value
      })
    )
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
