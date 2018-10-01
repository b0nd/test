import * as actions from './actions';
  let initialState = {
    "token": "",
    "taskDescription": "",
    "subCategory": null,
    "taskTypeId":null,
    "location": "",
    "dueDate":null,
    "expectedCost":"",
    "isPosted": false
    }
  export default (state = initialState, action) => {
    switch (action.type) {
      case actions.POST_A_TASK_LOCAL_SAVE:
        return Object.assign({}, state, {
            "token": action.payload.token,
            "taskDescription": action.payload.taskDescription,
            "subCategory": action.payload.subCategory,
            "taskTypeId":action.payload.taskTypeId,
            "location": action.payload.location,
            "dueDate":action.payload.dueDate,
            "expectedCost":action.payload.expectedCost,
            "isPosted": false
            })
      
      default:
        return state;
    }
  
    return state;
  };