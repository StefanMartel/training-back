import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import {Ilogin} from '../i-login-service';
import {MongoConnectionService} from './mongo-connection.service';
import {LoginOutput} from '../../../models/output/login-output.model';
import {ErrorOutput} from '../../../models/output/error-output.model';
import {LoginInput} from '../../../models/input/login-input.model';
import { MongoDBB_training } from '../../../shared/global-variable';


export class LoginMongo implements Ilogin{

    public mConnec : MongoConnectionService = new MongoConnectionService();

    logUser(loginIn: LoginInput): Observable<LoginOutput | ErrorOutput>{
        let userToFind = {'login' : loginIn.login, 'password' : loginIn.password};
        let select = {_id:0, login:1};

        return this.mConnec.executeSelectRequest(MongoDBB_training.dbb, MongoDBB_training.collec_users, userToFind, select).pipe(
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

