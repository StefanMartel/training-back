import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Iuser } from '../i-user-service';
import { MongoConnectionService } from './mongo-connection.service';
import { MongoDBB } from '../../../shared/global-variable';


export class UserMongo implements Iuser {

    public mConnec: MongoConnectionService = new MongoConnectionService();

    logUser(login: string, password: string): Observable<any> {
        let userToFind = { 'login': login, 'password': password };
        let select = { _id: 0, login: 1 };

        return this.mConnec.executeSelectRequest(MongoDBB.userColl, userToFind, select).pipe(map(data => {
            return data;
        }));
    }
}

