import { Observable } from 'rxjs/Observable';
import { LoginInput } from "../models/input/login-input.model";
import { LoginOutput } from '../models/output/login-output.model';
import { ErrorOutput } from '../models/output/error-output.model';


export interface Ilogin {
    logUser(login: LoginInput): Observable<LoginOutput | ErrorOutput>
}