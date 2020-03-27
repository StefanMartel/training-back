import { Observable } from "rxjs";

import { TrainingAddInputModel } from "../../models/input/training-add-input.model";
import { AddUpdateOutput } from "../../models/output/add-update-output.model";
import { ErrorOutput } from "../../models/output/error-output.model";
import { ITrainingDDBService } from "../../infrastructure/dbb/i-training-service";
import { TrainingOutput, TrainingList } from "../../models/output/training-output.model";
import { map } from "rxjs/operators";

export class TrainingService{

    constructor(
        public trainingDBBService: ITrainingDDBService
    ){
    }

    addTraining(training: TrainingAddInputModel): Observable<AddUpdateOutput | ErrorOutput>{
        return this.trainingDBBService.addTraining(training);
    }

    deleteTraining(trainingId: number): Observable<AddUpdateOutput | ErrorOutput>{
        return this.trainingDBBService.deleteTraining(trainingId);
    }

    getTraining(idUser: string): Observable<Array<TrainingOutput> | ErrorOutput>{
        return this.trainingDBBService.getTrainings(idUser).pipe(
            map( (data: TrainingList) => {
                return data.trainings;
            })
        );
    }

}