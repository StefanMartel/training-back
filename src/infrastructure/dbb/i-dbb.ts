import {ErrorOutput} from '../../models/output/error-output.model';
import { Observable } from 'rxjs';

export interface Idbb {
    executeSelectRequest(dbb: string, requete: string, objToFind: object, objToSelect: object);
    throwExceptionError(error): Observable<ErrorOutput>;
}