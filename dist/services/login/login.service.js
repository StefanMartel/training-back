"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const error_output_model_1 = require("../../models/output/error-output.model");
const global_function_1 = require("../../shared/global-function");
const global_variable_1 = require("../../shared/global-variable");
const login_input_model_1 = require("../../models/input/login-input.model");
class LoginService {
    constructor(serviceCo) {
        this.serviceCo = serviceCo;
        this.globalF = new global_function_1.GlobalFunction();
        this.loginO = new login_input_model_1.LoginInput('', '');
    }
    logUser(req) {
        if (this.checkEntriesValues(req)) {
            return this.serviceCo.logUser(this.loginO).pipe(operators_1.map(data => {
                if (data) {
                    return data;
                }
                return data;
            }));
        }
        else {
            return rxjs_1.throwError(new error_output_model_1.ErrorOutput({ code: '100', message: 'Paramétres incorrect' }));
        }
    }
    checkEntriesValues(req) {
        return this.globalF.checkInputKey(global_variable_1.UserInputFields, req, this.loginO) === false ? false : true;
    }
}
exports.LoginService = LoginService;
