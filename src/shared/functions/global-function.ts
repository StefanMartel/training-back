import { isNullOrUndefined } from "util";

export class GlobalFunction {

    checkInputKey(goodObject, ObjectToCheck, objectToPutIn): object | boolean {
        for (let key in goodObject) {
            objectToPutIn[key] = ObjectToCheck[goodObject[key]] == isNullOrUndefined ? null : ObjectToCheck[goodObject[key]];
            if (objectToPutIn[key] == null) {
                return false;
            }
        }
        return objectToPutIn;
    }
}