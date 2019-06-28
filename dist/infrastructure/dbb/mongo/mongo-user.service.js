"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const mongo_connection_service_1 = require("./mongo-connection.service");
const global_variable_1 = require("../../../shared/global-variable");
class UserMongo {
    constructor() {
        this.mConnec = new mongo_connection_service_1.MongoConnectionService();
    }
    logUser(login, password) {
        let userToFind = { 'login': login, 'password': password };
        let select = { _id: 0, login: 1 };
        return this.mConnec.executeSelectRequest(global_variable_1.MongoDBB.userColl, userToFind, select).pipe(operators_1.map(data => {
            return data;
        }));
    }
}
exports.UserMongo = UserMongo;
