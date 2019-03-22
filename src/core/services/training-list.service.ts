import { Observable } from 'rxjs/Observable';

import { ITrainingListBddService } from "../bdd/i-training-list-service";
import { TrainingInput } from "../models/input/training-input.model";
import { TrainingOutput } from "../models/output/training-output.model";
import { ErrorOutput } from '../models/output/error-output.model';
import { TransformerService } from './transformer';

export class TrainingListService {

    constructor(
        private trainingListBddService: ITrainingListBddService,
        private transformerService: TransformerService
    ) {

    }

    addTraining(training: TrainingInput): Observable<TrainingOutput | ErrorOutput> {
        return this.trainingListBddService.addTraining(this.transformerService.transformObject(TrainingInput, training));
    }
}
