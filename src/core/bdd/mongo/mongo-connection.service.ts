var MongoClient = require('mongodb').MongoClient;
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import { Ibdd } from "../i-bdd";
import { ErrorOutput } from "../../models/output/error-output.model";
import { MongoDBB } from '../../../shared/variables/global-variable';

export class MongoConnectionService implements Ibdd {


    dbConnect: any = null;

    constructor() {

    }

    initConnexion(): Observable<boolean | Error> {
        return Observable.create(obs => {
            const URLChain = MongoDBB.server + ':' + MongoDBB.port + '/' + MongoDBB.dbb;
            MongoClient.connect(URLChain, (error, db) => {
                if (error) {
                    obs.next(this.throwExceptionError(error));
                } else {
                    this.dbConnect = db;
                    obs.next(true);
                }
            });
        });
    }

    executeInsertRequest(collection: string, objToInsert: object): Observable<any> {
        return this.initConnexion().pipe(mergeMap(data => {
            if (data === true) {
                return Observable.create(obs => {
                    this.dbConnect.collection(collection).insert(objToInsert).toArray(
                        (error, result) => {
                            if (error) {
                                obs.next(this.throwExceptionError(error));
                            } else {
                                obs.next(result);
                            }
                        }
                    )
                });
            } else {
                return Observable.throw(data);
            }
        }));
    }

    executeSelectRequest(collection: string, objToFind: object, objToSelect: object): Observable<any> {
        return this.initConnexion().pipe(mergeMap(data => {
            if (data === true) {
                return Observable.create(obs => {
                    this.dbConnect.collection(collection).find(objToFind, objToSelect).toArray(
                        (error, result) => {
                            if (error) {
                                obs.next(this.throwExceptionError(error));
                            } else {
                                obs.next(result);
                            }
                        }
                    )
                });
            } else {
                return Observable.throw(data);
            }
        }));
    }

    throwExceptionError(error): ErrorOutput {
        return new ErrorOutput(error.name, error.message);
    }

}