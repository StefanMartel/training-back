"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const mongo_connection_service_1 = require("./mongo-connection.service");
const login_output_model_1 = require("../../../domain/models/output/login-output.model");
const global_variable_1 = require("../../../shared/global-variable");
class LoginMongo {
    constructor() {
        this.mConnec = new mongo_connection_service_1.MongoConnectionService();
    }
    logUser(loginIn) {
        let userToFind = { 'login': loginIn.login, 'password': loginIn.password };
        let select = { _id: 0, login: 1 };
        return this.mConnec.executeSelectRequest(global_variable_1.MongoDBB_training.dbb, global_variable_1.MongoDBB_training.collec_users, userToFind, select).pipe(operators_1.map(data => {
            return new login_output_model_1.LoginOutput(true);
        }, error => {
            return error;
        }));
    }
}
exports.LoginMongo = LoginMongo;
