import React, { useCallback } from "react";
import { useStore, useActions } from "easy-peasy";

import * as c from "./constants";

function Form({ id }) {
  const text = useStore(s => s[id], [id]);
  const updateInput = useActions(a => a.updateInput);
  const onChange = useCallback(
    e => updateInput({ inputId: id, text: e.target.value }),
    [updateInput]
  );

  const fillers = Array.from({
    length: c.NUMBER_OF_CHECKBOXES_PER_FORM
  }).map((item, i) => <input type="checkbox" key={i} />);

  return (
    <React.Fragment>
      <form style={{ display: "flex", alignItems: "flex-start" }}>
        Form {id}:
        <textarea id={`input-${id}`} value={text} onChange={onChange} />
      </form>
      <div>{fillers}</div>
    </React.Fragment>
  );
}

export default Form;
