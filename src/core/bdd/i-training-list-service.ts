import { Observable } from 'rxjs/Observable';

import { TrainingOutput } from './../models/output/training-output.model';
import { ErrorOutput } from '../models/output/error-output.model';
import { TrainingInput } from '../models/input/training-input.model';

export interface ITrainingListBddService {
    addTraining(training: TrainingInput): Observable<TrainingOutput | ErrorOutput>
}