import { Subject } from 'rxjs/Subject';

export class AuthService {
    errMsg = new Subject<{emailErr?,passErr?}>();
}