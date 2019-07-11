"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const training_service_1 = require("../services/training/training.service");
const mongo_training_service_1 = require("../infrastructure/dbb/mongo/mongo-training.service");
exports.getTrainingByUser = (req, res) => {
    const trainingService = new training_service_1.TrainingService(new mongo_training_service_1.TrainingDBBMongo());
    trainingService.addTraining(req.body).subscribe((data) => {
        res.json(data);
    }, (error) => {
        res.json(error);
    });
};
