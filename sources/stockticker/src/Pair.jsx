import React, { useState, useEffect } from "react";
import { useStore } from "easy-peasy";

function Pair({ sliceId, pairId }) {
  const { name, value } = useStore(state => state[sliceId][pairId], [
    sliceId,
    pairId
  ]);
  const [prevValue, setPrevValue] = useState(value);
  useEffect(() => {
    setPrevValue(value);
  }, [value]);
  const direction =
    value === prevValue ? "up" : value > prevValue ? "up" : "down";
  return (
    <li className="list-group-item">
      <span>{name}</span>
      <span
        className={
          "pull-right " + (direction === "up" ? "text-success" : "text-warning")
        }
      >
        <span
          className={
            "glyphicon " +
            (direction === "up" ? "glyphicon-arrow-up" : "glyphicon-arrow-down")
          }
        />
        <span>{value}</span>
      </span>
    </li>
  );
}
Pair.displayName = "Pair";

export default Pair;
