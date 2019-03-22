import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Ilogin } from '../bdd/i-login-service';
import { LoginOutput } from '../models/output/login-output.model';
import { ErrorOutput } from '../models/output/error-output.model';
import { GlobalFunction } from '../../shared/functions/global-function';
import { UserInputFields } from '../../shared/variables/global-variable';
import { LoginInput } from "../models/input/login-input.model";

export class LoginService {

    globalF = new GlobalFunction();
    loginO: LoginInput = new LoginInput('', '');

    constructor(public serviceCo: Ilogin) { }

    logUser(req: object): Observable<LoginOutput | ErrorOutput> {
        if (this.checkEntriesValues(req)) {
            return this.serviceCo.logUser(this.loginO).pipe(map(data => {
                if (data) {
                    return data;
                }
                return data;
            }));
        } else {
            return Observable.throw(new ErrorOutput('100', 'Paramétres incorrect'));
        }
    }

    checkEntriesValues(req: object): boolean {
        return this.globalF.checkInputKey(UserInputFields, req, this.loginO) === false ? false : true;
    }
}


