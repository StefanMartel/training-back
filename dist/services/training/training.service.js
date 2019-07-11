"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
class TrainingService {
    constructor(trainingDBBService) {
        this.trainingDBBService = trainingDBBService;
    }
    addTraining(training) {
        return this.trainingDBBService.addTraining(training);
    }
    deleteTraining(trainingId) {
        return this.trainingDBBService.deleteTraining(trainingId);
    }
    getTraining(idUser) {
        return this.trainingDBBService.getTrainings(idUser).pipe(operators_1.map((data) => {
            return data.trainings;
        }));
    }
}
exports.TrainingService = TrainingService;
