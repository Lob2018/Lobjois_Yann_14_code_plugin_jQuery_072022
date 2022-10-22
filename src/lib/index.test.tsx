import React from "react";
import renderer from "react-test-renderer";
import Example from '../examples/App'

describe("Dropdown", () => {
  it("renders properly", async () => {
    const component = renderer.create(
      <Example></Example>,
    );  
    let tree = component.toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
  });
});
