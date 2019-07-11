export class TrainingAddInputModel{
    login: string;
    id: string;
    title: string;
    creationDate: string;
}

export const isTrainingAddInputModel= (trainingEntry): boolean => {
    return trainingEntry.login 
        && trainingEntry.id 
        && trainingEntry.title
        && trainingEntry.creationDate ? true : false;
}