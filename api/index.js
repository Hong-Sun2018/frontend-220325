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
  GetH1List: '/products/get-h1-list/',
  // Sale
  ReadSaleFromFile: '/sales/read-from-file/',
  GetSaleNumMysql: '/sales/get-total-num-mysql/',
  ClearSale: '/sales/clear/',
  GetMinMaxDate: '/sales/get-min-max-date/',
  GetSum: '/sales/get-sum/',
  ListSales: '/sales/list-sales/',
  // Store
  ReadStoreFromFile: '/stores/read-from-file/',
  GetStoreNumMysql: '/stores/get-total-num-mysql/',
  ClearStore: '/stores/clear',
  GetCities: '/stores/get-cities/',
};

const API = (key) => {
  return `${HOST_NAME}${API_PATH[key]}`;
}


export default API;