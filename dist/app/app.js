"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_service_1 = require("../domain/services/login/login.service");
const mongo_login_service_1 = require("../infrastructure/dbb/mongo/mongo-login.service");
const global_variable_1 = require("../shared/global-variable");
var bodyParser = require('body-parser');
class App {
    constructor() {
        this.server = express_1.default();
        this.loginService = new mongo_login_service_1.LoginMongo();
        this.logServ = new login_service_1.LoginService(this.loginService);
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
        router.post('/login', (req, res) => {
            this.logServ.logUser(req.body).subscribe((data) => {
                res.json(data);
            }, (error) => {
                console.log(error);
                res.json(error);
            });
        });
        this.server.use('/', router);
    }
}
exports.default = new App().server;
