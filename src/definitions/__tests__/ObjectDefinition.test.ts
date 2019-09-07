import ObjectDefinition from "../ObjectDefinition";
import { Bar, Foo } from "../../__tests__/fakeClasses";
import ConstructorArgumentError from "../../errors/ConstructorArgumentError";
import DIContainer, { get } from "../../index";
import MethodIsMissingError from "../../errors/MethodIsMissingError";

describe("ObjectDefinition", () => {
    const container = new DIContainer();
    test("it throws an error if constructor arguments are not provided", () => {
        expect(() => {
            new ObjectDefinition(Foo).construct("a");
        }).toThrow(new ConstructorArgumentError("Foo", 2));
    });

    test("it creates object of correct class and initiate constructor with deps", () => {
        const fakeName = "My name is Foo";
        const bar = new ObjectDefinition(Bar);
        const definition = new ObjectDefinition(Foo).construct(fakeName, bar);
        const instance = definition.resolve<Foo>(container);
        expect(instance).toBeInstanceOf(Foo);
        expect(instance.name).toEqual(fakeName);
    });

    test("it resolves Definition params passed in constructor", () => {
        const fakeName = "My name is Foo";
        const BarDefinition = new ObjectDefinition(Bar);
        const definition = new ObjectDefinition(Foo).construct(
            fakeName,
            BarDefinition
        );
        const instance = definition.resolve<Foo>(container);
        expect(instance).toBeInstanceOf(Foo);
        expect(instance.name).toEqual(fakeName);
        expect(instance.service.buzz()).toEqual("buzz");
    });

    test("it calls methods after object have been initiated", () => {
        const definition = new ObjectDefinition(Foo)
            .method("addItem", "item1")
            .method("addItem", "item2");
        const instance = definition.resolve<Foo>(container);
        expect(instance).toBeInstanceOf(Foo);
        expect(instance.items).toEqual(["item1", "item2"]);
    });

    test("it throws an error if method does not exist", () => {
        const definition = new ObjectDefinition(Foo).method(
            "undefinedMethod",
            "item1"
        );
        expect(() => {
            definition.resolve<Foo>(container);
        }).toThrow(new MethodIsMissingError("Foo", "undefinedMethod"));
    });

    test("it resolves deps while calling method", () => {
        container.addDefinition("key1", "value1");
        const definition = new ObjectDefinition(Foo).method(
            "addItem",
            get("key1")
        );
        const instance = definition.resolve<Foo>(container);
        expect(instance.items).toEqual(["value1"]);
    });
});
