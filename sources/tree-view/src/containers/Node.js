import React, { useCallback } from "react";
import { useStore, useActions } from "easy-peasy";

let nextId = 0;

export default function Node({ id, parentId }) {
  const node = useStore(state => state[id], [id]);
  if (!node) {
    return null;
  }
  const { counter, childIds } = node;
  const actions = useActions(actions => actions);
  const increment = useCallback(() => actions.increment({ nodeId: id }), [id]);
  const handleAddChildClick = useCallback(e => {
    e.preventDefault();
    const nodeId = `new_${nextId++}`;
    const childId = actions.createNode({ nodeId });
    actions.addChild({ nodeId: id, childId });
  }, [id]);
  const handleRemoveClick = useCallback(e => {
    e.preventDefault();
    actions.removeChild({ nodeId: parentId, childId: id });
    actions.deleteNode({ nodeId: id });
  }, [id, parentId]);
  return (
    <div>
      Counter #{id}: {counter}{" "}
      <button className="increment" onClick={increment}>
        +
      </button>{" "}
      {typeof parentId !== "undefined" && (
        <a
          href="#"
          className="deleteNode"
          onClick={handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
          style={{ color: "lightgray", textDecoration: "none" }}
        >
          Delete
        </a>
      )}
      <ul>
        {childIds.map(childId => {
          return (
            <li key={childId}>
              <Node id={childId} parentId={id} />
            </li>
          );
        })}
        <li key="add">
          <a
            href="#"
            className="addChild" // eslint-disable-line jsx-a11y/href-no-hash
            onClick={handleAddChildClick}
          >
            Add child
          </a>
        </li>
      </ul>
    </div>
  );
}
