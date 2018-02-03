import {ErrorOutput} from '../../domain/models/output/error-output.model';

export interface Idbb {
    executeSelectRequest(requete: string, objToFind: object, objToSelect: object);
    throwExceptionError(error): ErrorOutput;
}