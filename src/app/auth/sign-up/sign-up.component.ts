import { Component, OnInit, Injectable, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs/Subscription';

import * as fromStore from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

@Injectable()
export class SignUpComponent implements OnInit, OnDestroy {
  userSignUpForm:FormGroup;
  showError:boolean = false;
  emailErrorMsg;
  passErrorMsg;
  subscription:Subscription;

  constructor(private store:Store<fromStore.AppState>, private authService:AuthService) { }

  ngOnInit() {
    this.initForm();
    this.subscription = this.authService.errMsg.subscribe(
      (err:{emailErr,passErr}) => {
        this.emailErrorMsg = err.emailErr;
        this.passErrorMsg = err.passErr;
      }
    )
  }

  submitSignUp(form:FormGroup) {
    this.emailErrorMsg = undefined;
    this.passErrorMsg = undefined;
    if (this.userSignUpForm.valid) {
      this.store.dispatch(
        new AuthActions.TrySignup({
          email: form.controls.email.value,
          password: form.controls.password.value,
          username: form.controls.username.value
        })
      ); 
    }
    else {
      this.showError = true;
    }
  }

  isFieldValid(field) {
    return  this.userSignUpForm.get(field).invalid && 
            this.userSignUpForm.invalid && this.showError;
  }

  isConditionMet(field) {
    return  this.userSignUpForm.get(field).errors &&
            this.userSignUpForm.get(field).dirty && 
            this.userSignUpForm.get(field).value !== (null || '');
  }
  
  initForm() {
    this.userSignUpForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'username' : new FormControl(null, [Validators.required]),
      'password' : new FormControl(null, Validators.required),
      'rePassword': new FormControl(null, [Validators.required])
    }, {validators:this.passMatch, updateOn:'submit'})
  }

  passMatch(control:FormGroup): {[s:string]:boolean} {
    if (control.get('password').value === control.get('rePassword').value) {
      return null;
    }
    return {'passDontMatch': true}
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}