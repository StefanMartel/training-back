export class TransformerService {

    public transformObjectArray(typeOfObject: { new() }, objectToTransform) {
        const objectArray = [];
        for (const object of objectToTransform) {
            objectArray.push(this.transformObject(typeOfObject, object));
        }
        return objectArray;
    }

    public transformObject(typeOfObject: { new() }, objectToTransform) {
        return !objectToTransform ?
            objectToTransform :
            new typeOfObject().fromJSON(objectToTransform);
    }

}

