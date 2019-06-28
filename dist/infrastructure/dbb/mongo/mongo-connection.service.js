"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoClient = require('mongodb').MongoClient;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const error_output_model_1 = require("../../../domain/models/output/error-output.model");
const global_variable_1 = require("../../../shared/global-variable");
class MongoConnectionService {
    constructor() {
        this.dbConnect = null;
    }
    initConnexion() {
        return rxjs_1.Observable.create(obs => {
            const URLChain = global_variable_1.MongoDBB.server + ':' + global_variable_1.MongoDBB.port + '/' + global_variable_1.MongoDBB.dbb;
            MongoClient.connect(URLChain, (error, db) => {
                if (error) {
                    obs.next(this.throwExceptionError(error));
                }
                else {
                    this.dbConnect = db;
                    obs.next(true);
                }
            });
        });
    }
    executeSelectRequest(collection, objToFind, objToSelect) {
        return this.initConnexion().pipe(operators_1.flatMap(data => {
            if (data === true) {
                return rxjs_1.Observable.create(obs => {
                    this.dbConnect.collection(collection).find(objToFind, objToSelect).toArray((error, result) => {
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
    throwExceptionError(error) {
        return new error_output_model_1.ErrorOutput(error.name, error.message);
    }
}
exports.MongoConnectionService = MongoConnectionService;
