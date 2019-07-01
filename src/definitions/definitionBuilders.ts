import ObjectDefinition, { Type } from "../definitions/ObjectDefinition";
import ValueDefinition from "../definitions/ValueDefinition";
import ExistingDefinition from "./ExistingDefinition";

export function diObject(
    classConstructor: Type<any>
) {
    return new ObjectDefinition(classConstructor);
}

export function diValue(value: any) {
    return new ValueDefinition(value);
}

export function diGet(name: string) {
    return new ExistingDefinition(name);
}