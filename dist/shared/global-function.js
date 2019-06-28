"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
class GlobalFunction {
    checkInputKey(goodObject, ObjectToCheck, objectToPutIn) {
        for (let key in goodObject) {
            objectToPutIn[key] = ObjectToCheck[goodObject[key]] == util_1.isNullOrUndefined ? null : ObjectToCheck[goodObject[key]];
            if (objectToPutIn[key] == null) {
                return false;
            }
        }
        return objectToPutIn;
    }
}
exports.GlobalFunction = GlobalFunction;
