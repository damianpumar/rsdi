import CustomError from "./CustomError";
import DependencyIsAlreadyDeclared from "./DependencyIsAlreadyDeclared";

export default class DependencyIsMissingError extends CustomError {
    constructor(name: string) {
        super(
            DependencyIsMissingError.name,
            `Dependency with name ${name} is not defined`
        );
    }
}
