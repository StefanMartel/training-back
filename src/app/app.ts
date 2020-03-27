import express, { Request, Response } from 'express';
import cors from 'cors';

import {LoginService} from '../services/login/login.service';
import {LoginMongo} from '../infrastructure/dbb/mongo/mongo-login.service';
import {LoginOutput} from '../models/output/login-output.model';
import {ErrorOutput} from '../models/output/error-output.model';
import {OptionsCors, returnCode} from '../shared/global-variable';
import { AddUpdateOutput } from '../models/output/add-update-output.model';
import { TrainingService } from '../services/training/training.service';
import { TrainingDBBMongo } from '../infrastructure/dbb/mongo/mongo-training.service';
import { TrainingOutput } from '../models/output/training-output.model';
import { isTrainingAddInputModel } from '../models/input/training-add-input.model';

var bodyParser = require('body-parser');

class App {
  
  public server = express()
  public loginService : LoginService
  public trainingService: TrainingService

  constructor () {
    this.loginService = new LoginService(new LoginMongo());
    this.trainingService = new TrainingService(new TrainingDBBMongo())
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const options:cors.CorsOptions = OptionsCors;
    
    const router = express.Router();


    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({
      extended: true
    }))
    router.use(cors(options));
    router.options("*", cors(options));

    router.all('/', (req: Request, res: Response) => {
      res.json({
        message: 'Hello World!'
      })
    })

    router.post('api/user/login', (req: Request, res: Response) => {
      this.loginService.logUser(req.body).subscribe(
          (data: LoginOutput) => {
            res.json(data);
          },
          (error : ErrorOutput) => {
            console.log(error)
            res.json(error)
          }
      );
    });

    router.post('/api/training/add', (req: Request, res: Response) => {
      if(isTrainingAddInputModel(req.body)){
        this.trainingService.addTraining(req.body).subscribe(
            (data: AddUpdateOutput) => {
              res.status(data.code).send(data);
            },
            (error : ErrorOutput) => {
              res.status(error.errorCode).send(new ErrorOutput(error.errorDescription));
            }
        );
      }else{
        res.status(returnCode.badRequest.code).send(new ErrorOutput(returnCode.badRequest));
      }
    });

    router.get('/api/training/:userLogin/list', (req: Request, res: Response) => {
      if((typeof req.params.userLogin) == 'string'){
        this.trainingService.getTraining(req.params.userLogin).subscribe(
            (data: Array<TrainingOutput>) => {
              res.json(data);
            },
            (error : ErrorOutput) => {
              res.status(error.errorCode).send(new ErrorOutput(error.errorDescription));
            }
        );
      }else{
        res.status(returnCode.badRequest.code).send(new ErrorOutput(returnCode.badRequest));
      }
    });

    router.delete('/api/training/:trainingId/delete', (req: Request, res: Response) => {
      if(!isNaN(+req.params.trainingId) ){
        this.trainingService.deleteTraining(+req.params.trainingId).subscribe(
          (data: AddUpdateOutput) => {
            res.status(data.code).send(data);
          },
            (error : ErrorOutput) => {
              res.status(error.errorCode).send(new ErrorOutput(error.errorDescription));
            }
        );
      }else{
        res.status(returnCode.badRequest.code).send(new ErrorOutput(returnCode.badRequest));
      }
    });

    this.server.use('/', router);
  }
}

export default new App().server
