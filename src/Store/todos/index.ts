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
    reset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {hardSetTodos, setNewTodo, reset} = slice.actions;

export default slice.reducer;
