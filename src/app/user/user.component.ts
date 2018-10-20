import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducers';
import * as fromUser from './store/user.reducer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  userState:Observable<fromUser.State>

  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userState = this.store.select('user');
  }

}
