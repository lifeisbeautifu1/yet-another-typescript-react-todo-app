import React, { useEffect } from 'react';
import { Action } from '../reducer';
import { MdDone } from 'react-icons/md';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Draggable } from 'react-beautiful-dnd';

import { ITodo } from '../interfaces';

interface Props {
  todo: ITodo;
  dispatch: React.Dispatch<Action>;
  id: number;
  index: number;
}

const Todo: React.FC<Props> = ({
  todo,
  dispatch,
  index,
  id,
}) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const [editTodo, setEditTodo] = React.useState<string>(todo.todo);

  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo-single ${snapshot.isDragging ? 'drag' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: 'EDIT',
              payload: { todo: editTodo, id: todo.id },
            });
            setEdit(false);
          }}
        >
          {edit ? (
            <input
              ref={inputRef}
              className="todo-single-text"
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          ) : todo.isDone ? (
            <s className="todo-single-text">{todo.todo}</s>
          ) : (
            <span className="todo-single-text">{todo.todo}</span>
          )}
          <div>
            <span className="icon">
              <AiFillEdit
                onClick={() => {
                  if (!todo.isDone && !edit) {
                    setEdit(true);
                  }
                }}
              />
            </span>
            <span className="icon">
              <AiFillDelete
                onClick={() => {
                  dispatch({ type: 'DELETE', payload: todo.id });
                }}
              />
            </span>
            <span className="icon">
              <MdDone
                onClick={() => {
                  dispatch({ type: 'DONE', payload: todo.id });
                }}
              />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default Todo;
