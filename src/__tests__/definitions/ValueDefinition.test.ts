import ValueDefinition from "../../definitions/ValueDefinition";

describe("ValueDefinition", () => {
    test("it resolves value", () => {
        const definition = new ValueDefinition("production");
        expect(definition.resolve()).toEqual("production");
    });
});
