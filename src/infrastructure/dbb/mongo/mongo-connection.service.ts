var MongoClient = require('mongodb').MongoClient;

import { Observable, throwError, of, observable, fromEvent} from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import {Idbb} from "../i-dbb";
import {ErrorOutput} from '../../../models/output/error-output.model';
import {MongoDBB, returnCode} from '../../../shared/global-variable';

export class MongoConnectionService implements Idbb{


    dbConnect: any = null;

    constructor(){

    }

    initConnexion(dbb: string): Observable<boolean | Error>{
        return Observable.create(obs => {
            const URLChain = MongoDBB.server+':'+MongoDBB.port;
            MongoClient.connect(URLChain, { useNewUrlParser: true, useUnifiedTopology: true }, (error, db) => {
                if (error) {
                    obs.error(error);
                } else {
                    this.dbConnect = db.db(dbb);
                    obs.next(true);
                }
            });
        });
    }

    executeSelectRequest(dbb: string, collection: string, objToFind: object, objToSelect: object): Observable<any> {
        return Observable.create(obs => {
            this.initConnexion(dbb).subscribe(
                data => {
                    this.dbConnect.collection(collection).find(objToFind, { projection: objToSelect }).toArray(
                        ( error, result ) => {
                            if(error) {
                                this.throwExceptionError(error);
                            } else {
                                return obs.next(result);
                            }
                        });
                }
            )
        });
    }

    executeInsertRequest(dbb: string, collection: string, objToInsert: object): Observable<any> {
        return Observable.create(obs => {
            this.initConnexion(dbb).subscribe(
                data => {
                    this.dbConnect.collection(collection).insertOne(objToInsert,
                        ( error, result ) => {
                            if(error) {
                                this.throwExceptionError(error);
                            } else {
                                return obs.next(result);
                            }
                        }
                    )
                }
            )
        });
    }

    executeDeleteRequest(dbb: string, collection: string, objToDelete: object): Observable<any> {
        return Observable.create(obs => {
            this.initConnexion(dbb).subscribe(
                data => {
                    this.dbConnect.collection(collection).deleteMany(objToDelete,
                        ( error, result ) => {
                            if(error) {
                                this.throwExceptionError(error);
                            } else {
                                return obs.next(result);
                            }
                        }
                    )
                }
            )
        });
    }

    throwExceptionError(error): Observable<ErrorOutput>{
        return throwError(new ErrorOutput({code: returnCode.bddError.code, message: returnCode.bddError.message}));
    }

}