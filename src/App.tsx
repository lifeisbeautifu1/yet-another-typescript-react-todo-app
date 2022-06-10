import React from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import todoReducer from './reducer';
import { ITodo } from './interfaces';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App = () => {
  const [todo, setTodo] = React.useState<string>('');
  const [state, dispatch] = React.useReducer(todoReducer, {
    activeTodos: [],
    completedTodos: [],
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    let add;
    let active = [...state.activeTodos];
    let complete = [...state.completedTodos];
    if (source.droppableId === 'TodoList') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === 'TodoList') {
      active.splice(destination.index, 0, { ...add, isDone: !add.isDone });
    } else {
      complete.splice(destination.index, 0, { ...add, isDone: !add.isDone });
    }
    dispatch({
      type: 'INIT',
      payload: { activeTodos: active, completedTodos: complete },
    });
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <span className="heading">Yet Another Todo App using TypeScript</span>
        <InputField todo={todo} setTodo={setTodo} dispatch={dispatch} />
        <TodoList state={state} dispatch={dispatch} />
      </div>
    </DragDropContext>
  );
};

export default App;
