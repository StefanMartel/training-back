import * as express from 'express';
import * as cors from 'cors';
import {LoginService} from '../domain/services/login/login.service';
import {LoginMongo} from '../infrastructure/dbb/mongo/mongo-login.service';
import {LoginOutput} from '../domain/models/output/login-output.model';
import {ErrorOutput} from '../domain/models/output/error-output.model';
import {OptionsCors} from "../shared/global-variable";

var bodyParser = require('body-parser');

class App {
  public express;
  public logServ : LoginService
  public loginService : LoginMongo

  constructor () {
    this.loginService = new LoginMongo()
    this.logServ = new LoginService(this.loginService);
    this.express = express()
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
          (error : ErrorOutput) => {
            res.json(error)
          }
      );
    });

    this.express.use('/', router);
  }
}

export default new App().express
