import * as actions from './actions';
  let initialState = {
    "id": '',
    "password": "",
    "name": "",
    "contact": "",
    "active": 0,
    "email": "",
    "token": null,
    "isLoggedIn": false,
    "isLoginViaFb": false,
    "isFirstTimeLogin": false,
    "firstName": "",
    "lastName": "",
    "city": {},
    "roleId": "",
    "categories": [],
    "description": "",
    "imageUrl": "",
    "portfoliopicture1":"",
    "portfoliopicture2":"",
    "portfoliopicture3":"",
    "portfoliopicture4":"",
    "headerImage":"",
    "bidArray": []
}
  export default (state = initialState, action) => {
    switch (action.type) {
      case actions.SIGNUP_SUCCESS:
        return Object.assign({}, state, {
          id: action.payload.id,
          token: action.payload.token,
          active: action.payload.active,
          isLoggedIn: true,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          city: action.payload.city,
          roleId: action.payload.roleId,
          imageUrl: action.payload.imgUrl,
          portfoliopicture1:action.payload.portfoliopicture1,
          portfoliopicture2:action.payload.portfoliopicture2,
          portfoliopicture3:action.payload.portfoliopicture3,
          portfoliopicture4:action.payload.portfoliopicture4,
          headerImage:action.payload.headerImage,
        })
      case actions.SIGNUP_FAILURE:
        return Object.assign({}, state, initialState);

      case actions.ACTION_LOGOUT:
        return Object.assign({}, state, initialState)

      case actions.STEP_1_SUCCESS:
        return Object.assign({}, state, {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          city: action.payload.city,
          roleId: action.payload.roleId
        })
      case actions.STEP_2_SUCCESS:
        return Object.assign({}, state, {
          categories: action.payload.categories,
          description: action.payload.description
        })
      case actions.IMAGE_UPLOAD_SUCCESS:
        return Object.assign({}, state, {
          imageUrl: action.payload
        })
      case actions.PORTFOLIO_IMAGE_SUCCESS:
        return Object.assign({}, state, {
          ['portfoliopicture'+action.payload.imgNumber]: action.payload.imgUrl
        })
      case actions.HEADER_IMAGE_SUCCESS:
        return Object.assign({}, state, {
          headerImage: action.payload
        })
      case actions.LOGIN_WITH_FB_SUCCESS:
        return Object.assign({}, state, {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          imageUrl: action.payload.imageUrl,
          token: action.payload.token,
          email: action.payload.email,
          isLoginViaFb: true,
          active:1,
          isLoggedIn: true
        })
      case actions.POST_BID_SUCCESS:
       let bidArr = state.bidArray;
       bidArr.push(action.payload);
        return Object.assign({}, state, {
          bidArray: bidArr
        })
      default:
        return state;
    }
  
    return state;
  };