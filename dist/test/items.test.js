"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const items_1 = __importDefault(require("../items"));
describe('Items', () => {
    it('should return the first item', () => {
        expect(items_1.default.getFirstItem()).toBe('Item1');
    });
});
