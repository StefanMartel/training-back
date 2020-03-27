"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoClient = require('mongodb').MongoClient;
const rxjs_1 = require("rxjs");
const error_output_model_1 = require("../../../models/output/error-output.model");
const global_variable_1 = require("../../../shared/global-variable");
class MongoConnectionService {
    constructor() {
        this.dbConnect = null;
    }
    initConnexion(dbb) {
        return rxjs_1.Observable.create(obs => {
            const URLChain = global_variable_1.MongoDBB.server + ':' + global_variable_1.MongoDBB.port;
            MongoClient.connect(URLChain, { useNewUrlParser: true, useUnifiedTopology: true }, (error, db) => {
                if (error) {
                    obs.error(error);
                }
                else {
                    this.dbConnect = db.db(dbb);
                    obs.next(true);
                }
            });
        });
    }
    executeSelectRequest(dbb, collection, objToFind, objToSelect) {
        return rxjs_1.Observable.create(obs => {
            this.initConnexion(dbb).subscribe(data => {
                this.dbConnect.collection(collection).find(objToFind, { projection: objToSelect }).toArray((error, result) => {
                    if (error) {
                        this.throwExceptionError(error);
                    }
                    else {
                        return obs.next(result);
                    }
                });
            });
        });
    }
    executeInsertRequest(dbb, collection, objToInsert) {
        return rxjs_1.Observable.create(obs => {
            this.initConnexion(dbb).subscribe(data => {
                this.dbConnect.collection(collection).insertOne(objToInsert, (error, result) => {
                    if (error) {
                        this.throwExceptionError(error);
                    }
                    else {
                        return obs.next(result);
                    }
                });
            });
        });
    }
    executeDeleteRequest(dbb, collection, objToDelete) {
        return rxjs_1.Observable.create(obs => {
            this.initConnexion(dbb).subscribe(data => {
                this.dbConnect.collection(collection).deleteMany(objToDelete, (error, result) => {
                    if (error) {
                        this.throwExceptionError(error);
                    }
                    else {
                        return obs.next(result);
                    }
                });
            });
        });
    }
    throwExceptionError(error) {
        return rxjs_1.throwError(new error_output_model_1.ErrorOutput({ code: global_variable_1.returnCode.bddError.code, message: global_variable_1.returnCode.bddError.message }));
    }
}
exports.MongoConnectionService = MongoConnectionService;
