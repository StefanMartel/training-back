import { ErrorOutput } from '../models/output/error-output.model';

export interface Ibdd {
    executeSelectRequest(requete: string, objToFind: object, objToSelect: object);
    throwExceptionError(error): ErrorOutput;
}