const domain = 'http://18.191.35.127:3000';
export const LOGIN_URL = domain+'/users/login';
export const SIGNUP_URL = domain+'/users/signup';
export const VERIFY_EMAIL_URL = domain+'/users/verifyEmail';
export const STATIC_PAGE_URL = domain+'/api/static-content';
export const REGISTER_STEP_1_URL = domain+'/users/register-step-1';
export const REGISTER_STEP_2_URL = domain+'/users/register-step-2';
export const UPLOAD_IMAGE_URL = domain+'/users/uploadProfilePicture';
export const LOGIN_WITH_FB_URL = domain+'/users/auth/facebook';
export const FETCH_CATEGORY_URL = domain+'/api/alerts';
export const FETCH_SUB_CATEGORY_URL = domain+'/api/categories';
export const POST_A_TASK_URL = domain+'/market/postTask';
export const UPLOAD_PORTFOLIO_IMAGE_1_URL = domain+'/users/uploadPortfolioPicture-1';
export const UPLOAD_PORTFOLIO_IMAGE_2_URL = domain+'/users/uploadPortfolioPicture-2';
export const UPLOAD_PORTFOLIO_IMAGE_3_URL = domain+'/users/uploadPortfolioPicture-3';
export const UPLOAD_PORTFOLIO_IMAGE_4_URL = domain+'/users/uploadPortfolioPicture-4';
export const HEADER_IMAGE_URL = domain+'/users/uploadHeaderImage';
export const UPDATE_PASSWROD_URL = domain+'/users/updatePassword';
export const GET_TASK_URL = domain+'/market/getTasks';
export const BID_TASK_URL = domain+'/market/bid-a-task';
export const FETCH_MY_TASK_URL = domain+'/market/getTasksAsAUser';
export const FETCH_MY_SKILLS_URL = domain+'/users/getUserSkills';
export const UPLOAD_MY_SKILLS_URL = domain+'/users/uploadSkills';
export const GET_USERS_SELECTED_SKILLS_URL = domain+'/users/getUserAlerts';
export const SET_UPDATE_USER_ALERT_URL = domain+'/users/setAlerts';
export const GET_BID_LIST_URL = domain+'/market/getBids';
export const ACCEPT_BID_URL = domain+'/market/acceptBid'

export const ERROR_MESSAGES = {
    FETCH_TASK_ERROR: 'Error while fetching task for you !! Please try again by regreshing the page.',
    FETCH_CATEGORY_ERROR: 'Error while fetching Content for you !! Please try again by regreshing the page.',
    SOMETHING_WENT_WRONG: 'Oops !! Something Went Wrong. Please try again.',
    BID_API_ERROR: 'Oops !! Error while fetching bid information. Please try again',
    NO_BID_AVAIALABLE: 'Currently there is no bid on this task',
    ERROR_ACCEPT_BID: 'Oops !! Accept bid request could not be completed. Please try aagain.',
    SUCCESS_ACCEPT_BID: 'You awarded this bid Successfully'
}

export const INFO_MESSAGES = {
  LOGIN_REQUEST: 'Please Login to Continue'
}

export const staticScreenName = [
    {
      "id": 1,
      "category": "Accounting Services"
    },
    {
      "id": 2,
      "category": "Administrative Services"
    },
    {
      "id": 3,
      "category": "Alteration Services"
    },
    {
      "id": 4,
      "category": "Appliances Services"
    },
    {
      "id": 5,
      "category": "Assembly Services"
    },
    {
      "id": 6,
      "category": "Audio Visual Services"
    },
    {
      "id": 7,
      "category": "Auto Services"
    },
    {
      "id": 8,
      "category": "Beauty Services"
    },
    {
      "id": 9,
      "category": "Bricklaying Services"
    },
    {
      "id": 10,
      "category": "Building & Construction Services"
    },
    {
      "id": 11,
      "category": "Business Services"
    },
    {
      "id": 12,
      "category": "Carpentry Services"
    },
    {
      "id": 13,
      "category": "Cleaning Services"
    },
    {
      "id": 14,
      "category": "Computers & IT Services"
    },
    {
      "id": 15,
      "category": "Concreting Services"
    },
    {
      "id": 16,
      "category": "Cooking Services"
    },
    {
      "id": 17,
      "category": "Decking Services"
    },
    {
      "id": 18,
      "category": "Delivery Services"
    },
    {
      "id": 19,
      "category": "Domestic Services"
    },
    {
      "id": 20,
      "category": "Driving Services"
    },
    {
      "id": 21,
      "category": "Electrical Services"
    },
    {
      "id": 22,
      "category": "Entertainment-Party Services"
    },
    {
      "id": 23,
      "category": "Events-Catering Services"
    },
    {
      "id": 24,
      "category": "Fencing Services"
    },
    {
      "id": 25,
      "category": "Fitness Services"
    },
    {
      "id": 26,
      "category": "Flooring Services"
    },
    {
      "id": 27,
      "category": "Food Delivery Services"
    },
    {
      "id": 28,
      "category": "Gardening Services"
    },
    {
      "id": 29,
      "category": "Handyman Services"
    },
    {
      "id": 30,
      "category": "Home Theatre Services"
    },
    {
      "id": 31,
      "category": "Immigration Services"
    },
    {
      "id": 32,
      "category": "Landscaping Services"
    },
    {
      "id": 33,
      "category": "Legal Services"
    },
    {
      "id": 34,
      "category": "Locksmith Services"
    },
    {
      "id": 35,
      "category": "Marketing Services"
    },
    {
      "id": 36,
      "category": "Painting Services"
    },
    {
      "id": 37,
      "category": "Paving Services"
    },
    {
      "id": 38,
      "category": "Pest Control Services"
    },
    {
      "id": 39,
      "category": "Pet Care Services"
    },
    {
      "id": 40,
      "category": "Photography Services"
    },
    {
      "id": 41,
      "category": "Plastering Services"
    },
    {
      "id": 42,
      "category": "Plumbing Services"
    },
    {
      "id": 43,
      "category": "Real Estate Services"
    },
    {
      "id": 44,
      "category": "Removals Services"
    },
    {
      "id": 45,
      "category": "Roofing Services"
    },
    {
      "id": 46,
      "category": "Staffing Services"
    },
    {
      "id": 47,
      "category": "Surveyor Services"
    },
    {
      "id": 48,
      "category": "Tiling Services"
    },
    {
      "id": 49,
      "category": "Translation Services"
    },
    {
      "id": 50,
      "category": "Tree Removal Services"
    },
    {
      "id": 51,
      "category": "Tutoring Services"
    },
    {
      "id": 52,
      "category": "Same-day Services"
    },
    {
      "id": 53,
      "category": "Videography Services"
    },
    {
      "id": 54,
      "category": "Welding Services"
    },
    {
      "id": 55,
      "category": "Writing Services"
    }
  ];

