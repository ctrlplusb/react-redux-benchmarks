import React, { Component } from "react";
import "./App.css";
import { useStore } from "easy-peasy";
import Slice from "./Slice";

function App() {
  const slices = useStore(state => Array(Object.keys(state).length).fill(0));
  return (
    <div className="row">
      {slices.map((slice, idx) => {
        return (
          <div className="col-lg-4" key={idx}>
            <Slice idx={idx} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
