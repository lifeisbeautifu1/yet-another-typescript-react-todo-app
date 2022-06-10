import React from 'react';
import Todo from './Todo';

import { State, Action } from '../reducer';
import { ITodo } from '../interfaces';
import { Droppable } from 'react-beautiful-dnd';
import { stat } from 'fs';

interface Props {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const TodoList: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <div className="container">
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos-heading">Active Tasks</span>
            {state.activeTodos.map((todo, index) => {
              return (
                <Todo
                  index={index}
                  key={index}
                  todo={todo}
                  dispatch={dispatch}
                  id={todo.id}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodoRemove">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos ${
              snapshot.isDraggingOver ? 'dragcomplete' : 'remove'
            }`}
          >
            <span className="todos-heading">Completed Tasks</span>
            {state.completedTodos.map((todo, index) => {
              return (
                <Todo
                  index={index}
                  key={index}
                  todo={todo}
                  dispatch={dispatch}
                  id={todo.id}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
