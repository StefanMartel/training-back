import {ErrorOutput} from '../../models/output/error-output.model';

export interface Idbb {
    executeSelectRequest(dbb: string, requete: string, objToFind: object, objToSelect: object);
    throwExceptionError(error): ErrorOutput;
}