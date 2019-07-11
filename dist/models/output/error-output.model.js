"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorOutput {
    constructor(error) {
        this.errorCode = error.code;
        this.errorDescription = error.message;
    }
}
exports.ErrorOutput = ErrorOutput;
