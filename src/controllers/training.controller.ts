import { Request, Response } from "express";

import { AddUpdateOutput } from "../models/output/add-update-output.model";
import { ErrorOutput } from "../models/output/error-output.model";
import { TrainingService } from "../services/training/training.service";
import { TrainingDBBMongo } from "../infrastructure/dbb/mongo/mongo-training.service";



export const getTrainingByUser = (req: Request, res:Response) => {

    const trainingService = new TrainingService(new TrainingDBBMongo());

    trainingService.addTraining(req.body).subscribe(
        (data: AddUpdateOutput) => {
            res.json(data);
        },
        (error : ErrorOutput) => {
            res.json(error)
        }
    );
}

