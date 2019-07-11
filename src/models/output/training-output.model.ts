export class TrainingList{
    trainings: Array<TrainingOutput>;

    constructor(trainings: Array<TrainingOutput>){
        this.trainings = trainings;
    }

}

export class TrainingOutput{
    login: string;
    id: number;
    title: string;
    creationDate: Date;
}