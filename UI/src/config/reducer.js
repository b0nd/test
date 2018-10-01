import User from '../screens/sign-up/reducer';
import PostedTask from '../screens/post-a-task/reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    User,
    PostedTask
});