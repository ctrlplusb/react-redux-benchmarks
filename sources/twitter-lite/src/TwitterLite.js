import { useStore } from "easy-peasy";
import React, { Component } from "react";

class Internal extends Component {
  render() {
    return <div>barfoo</div>;
  }
}

function InternalContainer() {
  const foo = useStore(() => "foobar");
  return <Internal />;
}

function Example() {
  const foo = useStore(() => "foobar");
  return <InternalContainer />;
}

function ExampleContainer() {
  const foo = useStore(() => "foobar");
  return <Example />;
}

export default ExampleContainer;
