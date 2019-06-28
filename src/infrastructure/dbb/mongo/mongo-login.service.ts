import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import {Ilogin} from '../i-login-service';
import {MongoConnectionService} from './mongo-connection.service';
import {LoginOutput} from '../../../domain/models/output/login-output.model';
import {ErrorOutput} from '../../../domain/models/output/error-output.model';
import {LoginInput} from '../../../domain/models/input/login-input.model';


export class LoginMongo implements Ilogin{

    public mConnec : MongoConnectionService = new MongoConnectionService();

    logUser(loginIn: LoginInput): Observable<LoginOutput | ErrorOutput>{
        let userToFind = {'login' : loginIn.login, 'password' : loginIn.password};
        let select = {_id:0, login:1};

        return this.mConnec.executeSelectRequest('users', userToFind, select).pipe(
            map(data => {
                    return new LoginOutput(true);
                },
                error =>{
                    return error;
                }
            )
        );
    }
}

