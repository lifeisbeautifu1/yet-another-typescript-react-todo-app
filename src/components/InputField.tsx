import React from 'react';

import { Action } from '../reducer';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  dispatch: React.Dispatch<Action>;
}

const InputField: React.FC<Props> = ({ todo, setTodo, dispatch }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    dispatch({ type: 'ADD', payload: todo });
    inputRef.current?.blur();
    setTodo('');
  };
  return (
    <form
      className="input-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        type="text"
        ref={inputRef}
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Enter a task..."
        className="input"
      />
      <button type="submit" className="submit-btn">
        ADD
      </button>
    </form>
  );
};

export default InputField;
