"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const mongo_connection_service_1 = require("./mongo-connection.service");
const global_variable_1 = require("../../../shared/global-variable");
const add_update_output_model_1 = require("../../../models/output/add-update-output.model");
const training_output_model_1 = require("../../../models/output/training-output.model");
class TrainingDBBMongo {
    constructor() {
        this.mConnec = new mongo_connection_service_1.MongoConnectionService();
    }
    getTrainings(userId) {
        const trainingsToFind = { 'login': userId };
        const select = { _id: 0, login: 1, id: 1, title: 2, creationDate: 3 };
        return this.mConnec.executeSelectRequest(global_variable_1.MongoDBB_training.dbb, global_variable_1.MongoDBB_training.collec_training_list, trainingsToFind, select).pipe(operators_1.map(data => new training_output_model_1.TrainingList(data)), operators_1.catchError(this.handleError));
    }
    addTraining(training) {
        return this.mConnec.executeInsertRequest(global_variable_1.MongoDBB_training.dbb, global_variable_1.MongoDBB_training.collec_training_list, training).pipe(operators_1.map(data => new add_update_output_model_1.AddUpdateOutput(global_variable_1.returnCode.inserted)), operators_1.catchError(this.handleError));
    }
    deleteTraining(trainingId) {
        const trainingsToDelete = { 'id': trainingId };
        return this.mConnec.executeDeleteRequest(global_variable_1.MongoDBB_training.dbb, global_variable_1.MongoDBB_training.collec_training_list, trainingsToDelete).pipe(operators_1.map(data => new add_update_output_model_1.AddUpdateOutput(global_variable_1.returnCode.deleted)), operators_1.catchError(this.handleError));
    }
    handleError(error) {
        return rxjs_1.throwError(error);
    }
}
exports.TrainingDBBMongo = TrainingDBBMongo;
