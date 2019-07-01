import {Bar, Foo} from "../fakeClasses";

import ObjectDefinition from "../../definitions/ObjectDefinition";
import ValueDefinition from "../../definitions/ValueDefinition";
import DIContainer from "../../DIContainer";
import {diGet, diObject} from "../../definitions/definitionBuilders";

describe("definitionBuilders", () => {
    const container = new DIContainer();
    test("it creates object of correct class", () => {
        const bar = new ObjectDefinition(Bar);
        const definition = diObject(Foo).construct("a", bar);

        expect(definition).toBeInstanceOf(ObjectDefinition);
        expect( definition.resolve(container)).toBeInstanceOf(Foo);
    });

    test("it names dependency using class name", () => {
        const definition = diObject(Foo);

        expect(definition).toBeInstanceOf(ObjectDefinition);
    });

    test("it create value definition", () => {
        const definition = new ValueDefinition("bar");

        expect(definition.resolve()).toEqual("bar");
    });

    test("it resolves existing definition", () => {
        const container = new DIContainer();
        container.addDefinition("key1", new ValueDefinition("value1"));
        const definition = diGet("key1");

        expect(definition.resolve(container)).toEqual("value1");
    })
});
