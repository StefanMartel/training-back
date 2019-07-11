import { Observable } from "rxjs";

import { TrainingAddInputModel } from "../../models/input/training-add-input.model";
import { AddUpdateOutput } from "../../models/output/add-update-output.model";
import { ErrorOutput } from "../../models/output/error-output.model";
import { TrainingList } from "../../models/output/training-output.model";

export interface ITrainingDDBService{
    addTraining(training: TrainingAddInputModel) : Observable<AddUpdateOutput | ErrorOutput>
    getTrainings(idUser: string) : Observable<TrainingList | ErrorOutput>;
    deleteTraining(trainingId: number) : Observable<AddUpdateOutput | ErrorOutput>
}
