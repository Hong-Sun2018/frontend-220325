const HOST_NAME = 'http://localhost:8000';

const API_PATH = {
  SignIn:'/user/signin',
  SignUp: '/user/signup',
  SignOut: '/user/signout',
  TokenSignIn: '/user/token-signin',
  CreateCategory: '/category/create-category',
  GetCategories: '/category',
  Product: '/product',
  Order: '/order',
  User: '/user',
  GetCategoryPath: '/category/get-cate-path',
  OrderAllUsers: '/order/get-orders-all-users',
  OrderById: '/order/get-order',
};

const API = (key) => {
  return `${HOST_NAME}${API_PATH[key]}`;
}


export default API;