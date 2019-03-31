import { action } from "easy-peasy";

const getAllDescendantIds = (state, nodeId) => {
  if (!state[nodeId]) {
    return [];
  }
  return state[nodeId].childIds.reduce(
    (acc, childId) => [...acc, childId, ...getAllDescendantIds(state, childId)],
    []
  );
};

const model = {
  increment: action((state, { nodeId }) => {
    state[nodeId].counter = state[nodeId].counter + 1;
  }),
  createNode: action((state, { nodeId }) => {
    console.log("createNodeId", nodeId);
    state[nodeId] = {
      id: nodeId,
      counter: 0,
      childIds: []
    };
  }),
  deleteNode: action((state, { nodeId }) => {
    const descendantIds = getAllDescendantIds(state, nodeId);
    descendantIds.forEach(id => delete state[id]);
  }),
  addChild: action((state, { nodeId, childId }) => {
    state[nodeId].childIds.push(childId);
  }),
  removeChild: action((state, { nodeId, childId }) => {
    state[nodeId].childIds = state[nodeId].childIds.filter(
      id => id !== childId
    );
  })
};

export default model;
