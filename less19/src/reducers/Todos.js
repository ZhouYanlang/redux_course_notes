import { combineReducers } from 'redux';

const Todo = (state,action) =>{
   switch(action.type){
     case 'ADD_TODO':
        return {
          id:action.id,
          text:action.text,
          completed:false
        }
     case 'TOGGLE_TODO':
        if(state.id !== action.id){
          return state;
        }
        return {
          ...state,
          completed:!state.completed
        }
     default:
       return state
   }
}


const byId = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_TODOS': // eslint-disable-line no-case-declarations
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  if (action.filter !== 'all') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
const activeIds = (state = [], action) => {
   if (action.filter !== 'active ') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};
const completedIds = (state = [], action) => {
  if (action.filter !== 'completed') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds,
});

const Todos = combineReducers({
  byId,
  idsByFilter
});

export default Todos

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
};


