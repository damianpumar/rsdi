import { Container } from "./Container";
import { IDIContainer } from "container/DIContainer";
import { build, buildSingleton } from "collaborators/DependencyBuilder";
import {
    diObject as object,
    diValue as value,
    diGet as get,
    diFactory as factory,
} from "definitions/definitionBuilders";

export default Container;
export { object, value, get, factory, IDIContainer };
export { build, buildSingleton };