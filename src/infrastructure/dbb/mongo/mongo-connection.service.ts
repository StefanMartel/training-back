var MongoClient = require('mongodb').MongoClient;

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';

import {Idbb} from "../i-dbb";
import {ErrorOutput} from "../../../domain/models/output/error-output.model";
import {MongoDBB} from '../../../shared/global-variable';

export class MongoConnectionService implements Idbb{


    dbConnect: any = null;

    constructor(){

    }

    initConnexion(): Observable<boolean | Error>{
        return Observable.create(obs => {
            const URLChain = MongoDBB.server+':'+MongoDBB.port+'/'+MongoDBB.dbb;
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

    executeSelectRequest(collection: string, objToFind: object, objToSelect: object): Observable<any> {
        return this.initConnexion().flatMap( data =>{
            if(data === true) {
                return Observable.create(obs =>{
                    this.dbConnect.collection(collection).find(objToFind, objToSelect).toArray(
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
        });
    }

    throwExceptionError(error): ErrorOutput{
        return new ErrorOutput(error.name, error.message);
    }

}