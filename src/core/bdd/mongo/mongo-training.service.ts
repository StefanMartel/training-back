import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { MongoConnectionService } from './mongo-connection.service';
import { ErrorOutput } from '../../models/output/error-output.model';
import { ITrainingListBddService } from '../i-training-list-service';
import { TrainingOutput } from './../../models/output/training-output.model';
import { TrainingInput } from './../../models/input/training-input.model';


export class TrainingMongo implements ITrainingListBddService {

    public mConnec: MongoConnectionService = new MongoConnectionService();

    addTraining(training: TrainingInput): Observable<TrainingOutput | ErrorOutput> {
        let userToFind = { 'login': training.owner, 'password': training.owner };
        let select = { _id: 0, login: 1 };

        return this.mConnec.executeInsertRequest('training', userToFind).pipe(map(
            data => {
                console.log(data);
                return new TrainingOutput(data ? false : true);
            },
            error => {
                return error;
            }
        ));
    }
}

