import {Bar, Foo} from "../fakeClasses";
import {diObject} from "../../";
import ObjectDefinition from "../../definitions/ObjectDefinition";
import ValueDefinition from "../../definitions/ValueDefinition";
import DIContainer from "../../DIContainer";


describe("definitionBuilders", () => {
    const container = new DIContainer();
    test("it creates object of correct class", () => {
        const bar = new ObjectDefinition("Bar", Bar);
        const definition = diObject(Foo, "Foo").construct("a", bar);

        expect(definition).toBeInstanceOf(ObjectDefinition);
        expect(definition.name()).toEqual("Foo");
        const foo = definition.resolve(container);
        expect(foo).toBeInstanceOf(Foo);
    });

    test("it names dependency using class name", () => {
        const definition = diObject(Foo);
        expect(definition).toBeInstanceOf(ObjectDefinition);
        expect(definition.name()).toEqual("Foo");
    });

    test("it create value definition", () => {
        const definition = new ValueDefinition("foo", "bar");
        expect(definition.name()).toEqual("foo");
        expect(definition.resolve()).toEqual("bar");
    });
});
