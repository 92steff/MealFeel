import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromUser from '../../user/store/user.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;
  userState: Observable<fromUser.State>;

  constructor(private store:Store<fromApp.AppState>) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.userState = this.store.select('user');
  }

  logout() {
    this.store.dispatch(
      new AuthActions.Logout()
    )
  }
}
