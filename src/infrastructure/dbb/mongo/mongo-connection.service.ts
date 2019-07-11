var MongoClient = require('mongodb').MongoClient;

import {Observable} from 'rxjs';
import { flatMap } from 'rxjs/operators';

import {Idbb} from "../i-dbb";
import {ErrorOutput} from '../../../models/output/error-output.model';
import {MongoDBB} from '../../../shared/global-variable';

export class MongoConnectionService implements Idbb{


    dbConnect: any = null;

    constructor(){

    }

    initConnexion(dbb: string): Observable<boolean | Error>{
        return Observable.create(obs => {
            const URLChain = MongoDBB.server+':'+MongoDBB.port;
            MongoClient.connect(URLChain, { useNewUrlParser: true }, (error, db) => {
                if (error) {
                    obs.next(this.throwExceptionError(error));
                } else {
                    this.dbConnect = db.db(dbb);
                    obs.next(true);
                }
            });
        });
    }

    executeSelectRequest(dbb: string, collection: string, objToFind: object, objToSelect: object): Observable<any> {
        return this.initConnexion(dbb).pipe(
            flatMap( data =>{
                if(data === true) {
                    return Observable.create(obs =>{
                        this.dbConnect.collection(collection).find(objToFind, { projection: objToSelect }).toArray(
                            ( error, result ) => {
                                if(error) {
                                    obs.next(this.throwExceptionError(error));
                                } else {
                                    obs.next(result);
                                }
                            }
                        )
                    });
                }else{
                    return Observable.throw(data);
                }
            })
        );
    }

    executeInsertRequest(dbb: string, collection: string, objToInsert: object): Observable<any> {
        return this.initConnexion(dbb).pipe(
            flatMap( data =>{
                if(data === true) {
                    return Observable.create(obs =>{
                        this.dbConnect.collection(collection).insertOne(objToInsert,
                            ( error, result ) => {
                                if(error) {
                                    obs.next(this.throwExceptionError(error));
                                } else {
                                    obs.next(result);
                                }
                            }
                        )
                    });
                }else{
                    return Observable.throw(data);
                }
            })
        );
    }

    executeDeleteRequest(dbb: string, collection: string, objToDelete: object): Observable<any> {
        return this.initConnexion(dbb).pipe(
            flatMap( data =>{
                if(data === true) {
                    return Observable.create(obs =>{
                        this.dbConnect.collection(collection).deleteMany(objToDelete,
                            ( error, result ) => {
                                if(error) {
                                    obs.next(this.throwExceptionError(error));
                                } else {
                                    console.log('result: ',result.result.n);
                                    obs.next(result);
                                }
                            }
                        )
                    });
                }else{
                    return Observable.throw(data);
                }
            })
        );
    }

    throwExceptionError(error): ErrorOutput{
        return new ErrorOutput({code: error.name, message: error.message});
    }

}