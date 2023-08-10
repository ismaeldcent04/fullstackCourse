import React from "react";

export const PersonForm = ({
  onSubmit,
  onChangeName,
  onChangeNumber,
  nameValue,
  phoneValue,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={onChangeName} value={nameValue} />
        </div>
        <div>
          number: <input onChange={onChangeNumber} value={phoneValue} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
