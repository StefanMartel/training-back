"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoClient = require('mongodb').MongoClient;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const error_output_model_1 = require("../../../models/output/error-output.model");
const global_variable_1 = require("../../../shared/global-variable");
class MongoConnectionService {
    constructor() {
        this.dbConnect = null;
    }
    initConnexion(dbb) {
        return rxjs_1.Observable.create(obs => {
            const URLChain = global_variable_1.MongoDBB.server + ':' + global_variable_1.MongoDBB.port;
            MongoClient.connect(URLChain, { useNewUrlParser: true }, (error, db) => {
                if (error) {
                    obs.next(this.throwExceptionError(error));
                }
                else {
                    this.dbConnect = db.db(dbb);
                    obs.next(true);
                }
            });
        });
    }
    executeSelectRequest(dbb, collection, objToFind, objToSelect) {
        return this.initConnexion(dbb).pipe(operators_1.flatMap(data => {
            if (data === true) {
                return rxjs_1.Observable.create(obs => {
                    this.dbConnect.collection(collection).find(objToFind, { projection: objToSelect }).toArray((error, result) => {
                        if (error) {
                            obs.next(this.throwExceptionError(error));
                        }
                        else {
                            obs.next(result);
                        }
                    });
                });
            }
            else {
                return rxjs_1.Observable.throw(data);
            }
        }));
    }
    executeInsertRequest(dbb, collection, objToInsert) {
        return this.initConnexion(dbb).pipe(operators_1.flatMap(data => {
            if (data === true) {
                return rxjs_1.Observable.create(obs => {
                    this.dbConnect.collection(collection).insertOne(objToInsert, (error, result) => {
                        if (error) {
                            obs.next(this.throwExceptionError(error));
                        }
                        else {
                            obs.next(result);
                        }
                    });
                });
            }
            else {
                return rxjs_1.Observable.throw(data);
            }
        }));
    }
    executeDeleteRequest(dbb, collection, objToDelete) {
        return this.initConnexion(dbb).pipe(operators_1.flatMap(data => {
            if (data === true) {
                return rxjs_1.Observable.create(obs => {
                    this.dbConnect.collection(collection).deleteMany(objToDelete, (error, result) => {
                        if (error) {
                            obs.next(this.throwExceptionError(error));
                        }
                        else {
                            console.log('result: ', result.result.n);
                            obs.next(result);
                        }
                    });
                });
            }
            else {
                return rxjs_1.Observable.throw(data);
            }
        }));
    }
    throwExceptionError(error) {
        return new error_output_model_1.ErrorOutput({ code: error.name, message: error.message });
    }
}
exports.MongoConnectionService = MongoConnectionService;
