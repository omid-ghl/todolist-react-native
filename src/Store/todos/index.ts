import {todo} from '@Models';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type TodosType = {
  todosList: todo[];
};

const initialState: TodosType = {
  todosList: [],
};

const slice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    hardSetTodos: (state, action: PayloadAction<todo[]>) => {
      state.todosList = action.payload;
    },
    setNewTodo: (state, action: PayloadAction<todo>) => {
      state.todosList = state.todosList.concat(action.payload);
    },
    removeTodo: (
      state,
      action: PayloadAction<{title: string; creationDate: string}>,
    ) => {
      state.todosList = state.todosList.filter(
        (todo: todo) => todo.title !== action.payload.title,
      );
    },
    reset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {hardSetTodos, setNewTodo, removeTodo, reset} = slice.actions;

export default slice.reducer;
