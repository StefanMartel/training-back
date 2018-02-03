import {Observable} from 'rxjs/Observable';
import {LoginOutput} from '../../domain/models/output/login-output.model';
import {ErrorOutput} from '../../domain/models/output/error-output.model';
import {LoginInput} from '../../domain/models/input/login-input.model';

export interface Ilogin{
    logUser(login : LoginInput) : Observable<LoginOutput | ErrorOutput>
}