import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Ilogin } from '../i-login-service';
import { MongoConnectionService } from './mongo-connection.service';
import { LoginOutput } from '../../models/output/login-output.model';
import { ErrorOutput } from '../../models/output/error-output.model';
import { LoginInput } from '../../models/input/login-input.model';


export class LoginMongo implements Ilogin {

    public mConnec: MongoConnectionService = new MongoConnectionService();

    logUser(loginIn: LoginInput): Observable<LoginOutput | ErrorOutput> {
        let userToFind = { 'login': loginIn.login, 'password': loginIn.password };
        let select = { _id: 0, login: 1 };

        return this.mConnec.executeSelectRequest('users', userToFind, select).pipe(map(
            data => {
                console.log(data);
                return new LoginOutput(data ? false : true);
            },
            error => {
                return error;
            }
        ));
    }
}

