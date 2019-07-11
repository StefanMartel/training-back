"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBB = {
    'server': 'mongodb://127.0.0.1',
    'port': 27017
};
exports.MongoDBB_training = {
    'dbb': 'training',
    'collec_training_list': 'training_list',
    'collec_users': 'training_user'
};
exports.UserInputFields = {
    'login': 'login',
    'password': 'password'
};
exports.OptionsCors = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:4200",
    preflightContinue: false
};
exports.returnCode = {
    bddError: { code: 100, message: 'Probléme BDD' },
    inserted: { code: 201, message: 'OK' },
    deleted: { code: 204, message: 'OK' },
    badRequest: { code: 400, message: 'Bad Request' }
};
