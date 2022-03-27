const HOST_NAME = 'http://localhost:8000';

const API_PATH = {
  // User
  SignIn:'/user/signin/',
  SignUp: '/user/signup/',
  SignOut: '/user/signout/',
  SessionSignIn: '/user/session-signin',
  // Product
  ReadProdFromFile: '/products/read-from-file/',
  GetProdNumMysql: '/products/get-total-num-mysql/',
  ClearProd: '/products/clear/',
  // Sale
  ReadSaleFromFile: '/sales/read-from-file/',
  GetSaleNumMysql: '/sales/get-total-num-mysql/',
  ClearSale: 'sales/clear/',
  // Store
  ReadStoreFromFile: '/stores/read-from-file/',
  GetStoreNumMysql: '/stores/get-total-num-mysql/',
  ClearStore: '/stores/clear',
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