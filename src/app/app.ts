import * as express from 'express';
import * as cors from 'cors';
import { LoginService } from '../core/services/login.service';
import { LoginOutput } from '../core/models/output/login-output.model';
import { ErrorOutput } from '../core/models/output/error-output.model';
import { OptionsCors } from '../shared/variables/global-variable';
import { LoginMongo } from '../core/bdd/mongo/mongo-login.service';
import { TrainingListService } from '../core/services/training-list.service';
import { TrainingOutput } from '../core/models/output/training-output.model';

var bodyParser = require('body-parser');

class App {
  public express;
  public logServ: LoginService
  private loginService: LoginMongo
  private trainingListService: TrainingListService

  constructor() {
    this.loginService = new LoginMongo();
    this.logServ = new LoginService(this.loginService);
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes(): void {
    const options: cors.CorsOptions = OptionsCors;
    const router = express.Router();


    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({
      extended: true
    }))
    router.use(cors(options));
    router.options("*", cors(options));

    router.all('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    })

    router.post('/login', (req, res) => {
      this.logServ.logUser(req.body).subscribe(
        (data: LoginOutput) => {
          res.json(data);
        },
        (error: ErrorOutput) => {
          res.json(error)
        }
      );
    });

    router.post('/training', (req, res) => {
      this.trainingListService.addTraining(req.body).subscribe(
        (data: TrainingOutput) => {
          res.json(data);
        },
        (error: ErrorOutput) => {
          res.json(error)
        }
      );
    });

    this.express.use('/', router);
  }
}

export default new App().express
