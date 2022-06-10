import { ITodo } from './interfaces';

export type Action =
  | {
      type: 'ADD';
      payload: string;
    }
  | { type: 'DELETE'; payload: number }
  | { type: 'EDIT'; payload: { id: number; todo: string } }
  | { type: 'DONE'; payload: number }
  | { type: 'INIT'; payload: State };

export type State = {
  activeTodos: ITodo[];
  completedTodos: ITodo[];
};

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD': {
      return {
        activeTodos: [
          { todo: action.payload, id: Date.now(), isDone: false },
          ...state.activeTodos,
        ],
        completedTodos: state.completedTodos,
      };
    }
    case 'DELETE': {
      return {
        activeTodos: state.activeTodos.filter(
          (todo) => todo.id !== action.payload
        ),
        completedTodos: state.completedTodos.filter(
          (todo) => todo.id !== action.payload
        ),
      };
    }
    case 'EDIT': {
      return {
        activeTodos: state.activeTodos.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, todo: action.payload.todo }
            : todo;
        }),
        completedTodos: state.completedTodos.map((todo) => {
          return todo.id === action.payload.id
            ? { ...todo, todo: action.payload.todo }
            : todo;
        }),
      };
    }
    case 'DONE': {
      const doneTodo = state.activeTodos.find(
        (todo) => todo.id === action.payload
      );
      if (doneTodo) {
        return {
          activeTodos: state.activeTodos.filter(
            (todo) => todo.id !== action.payload
          ),
          completedTodos: [
            ...state.completedTodos,
            { ...doneTodo, isDone: true },
          ],
        };
      }
      return state;
    }
    case 'INIT': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default todoReducer;
