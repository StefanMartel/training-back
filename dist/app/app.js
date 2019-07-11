"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_service_1 = require("../services/login/login.service");
const mongo_login_service_1 = require("../infrastructure/dbb/mongo/mongo-login.service");
const error_output_model_1 = require("../models/output/error-output.model");
const global_variable_1 = require("../shared/global-variable");
const training_service_1 = require("../services/training/training.service");
const mongo_training_service_1 = require("../infrastructure/dbb/mongo/mongo-training.service");
const training_add_input_model_1 = require("../models/input/training-add-input.model");
var bodyParser = require('body-parser');
class App {
    constructor() {
        this.server = express_1.default();
        this.loginService = new login_service_1.LoginService(new mongo_login_service_1.LoginMongo());
        this.trainingService = new training_service_1.TrainingService(new mongo_training_service_1.TrainingDBBMongo());
        this.mountRoutes();
    }
    mountRoutes() {
        const options = global_variable_1.OptionsCors;
        const router = express_1.default.Router();
        router.use(bodyParser.json());
        router.use(bodyParser.urlencoded({
            extended: true
        }));
        router.use(cors_1.default(options));
        router.options("*", cors_1.default(options));
        router.all('/', (req, res) => {
            res.json({
                message: 'Hello World!'
            });
        });
        router.post('api/user/login', (req, res) => {
            this.loginService.logUser(req.body).subscribe((data) => {
                res.json(data);
            }, (error) => {
                console.log(error);
                res.json(error);
            });
        });
        router.post('/api/training/add', (req, res) => {
            if (training_add_input_model_1.isTrainingAddInputModel(req.body)) {
                this.trainingService.addTraining(req.body).subscribe((data) => {
                    res.status(data.code).send(data);
                }, (error) => {
                    res.json(error);
                });
            }
            else {
                res.status(global_variable_1.returnCode.badRequest.code).send(new error_output_model_1.ErrorOutput(global_variable_1.returnCode.badRequest));
            }
        });
        router.get('/api/training/:userLogin/list', (req, res) => {
            if ((typeof req.params.userLogin) == 'string') {
                this.trainingService.getTraining(req.params.userLogin).subscribe((data) => {
                    res.json(data);
                }, (error) => {
                    res.json(error);
                });
            }
            else {
                res.status(global_variable_1.returnCode.badRequest.code).send(new error_output_model_1.ErrorOutput(global_variable_1.returnCode.badRequest));
            }
        });
        router.delete('/api/training/:trainingId/delete', (req, res) => {
            if (!isNaN(req.params.trainingId)) {
                this.trainingService.deleteTraining(parseInt(req.params.trainingId)).subscribe((data) => {
                    res.status(data.code).send(data);
                }, (error) => {
                    res.json(error);
                });
            }
            else {
                res.status(global_variable_1.returnCode.badRequest.code).send(new error_output_model_1.ErrorOutput(global_variable_1.returnCode.badRequest));
            }
        });
        this.server.use('/', router);
    }
}
exports.default = new App().server;
