import {Observable} from 'rxjs';
import {LoginOutput} from '../../models/output/login-output.model';
import {ErrorOutput} from '../../models/output/error-output.model';
import {LoginInput} from '../../models/input/login-input.model';

export interface Ilogin{
    logUser(login : LoginInput) : Observable<LoginOutput | ErrorOutput>
}