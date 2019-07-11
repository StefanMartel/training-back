"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrainingAddInputModel {
}
exports.TrainingAddInputModel = TrainingAddInputModel;
exports.isTrainingAddInputModel = (trainingEntry) => {
    return trainingEntry.login
        && trainingEntry.id
        && trainingEntry.title
        && trainingEntry.creationDate ? true : false;
};
