import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import {Iuser} from '../i-user-service';
import {MongoConnectionService} from './mongo-connection.service';
import {MongoDBB, MongoDBB_training} from '../../../shared/global-variable';


export class UserMongo implements Iuser{

    public mConnec : MongoConnectionService = new MongoConnectionService();

    logUser(login: string, password: string): Observable<any>{
        let userToFind = {'login' : login, 'password' : password};
        let select = {_id:0, login:1};

        return this.mConnec.executeSelectRequest(MongoDBB_training.dbb, MongoDBB_training.collec_users, userToFind, select).pipe(
            map(data => {
                return data;
            })
        )
    }
}

