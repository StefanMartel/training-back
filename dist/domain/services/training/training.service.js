"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrainingService {
    constructor(trainingDBBService) {
        this.trainingDBBService = trainingDBBService;
    }
    addTraining(training) {
        return this.trainingDBBService.addTraining(training);
    }
    getTraining(idUser) {
    }
}
exports.TrainingService = TrainingService;
