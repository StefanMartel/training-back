import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

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

        return this.mConnec.executeSelectRequest('users', userToFind, select).map(
            data => {
                return new LoginOutput(data.length==0 ? false : true);
            },
            error =>{
                return error;
            }
        );
    }
}

