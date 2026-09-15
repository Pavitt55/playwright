export class ApiUtils {
  apiContext: any;
  loginPayload: any;
  constructor(apiContext: any, loginPayload: any) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayload,
      }
    );
    const loginResponseJSON = await loginResponse.json();
    const token = loginResponseJSON.token;
    return token;
  }
  async createOrder(orderPayload: any) {
    let response: any = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayload,
        headers: {
          Authorization: response.token,
          'Content-Type': 'application/json',
        },
      }
    );
    const orderResponseJSON = await orderResponse.json();

    const orderID = orderResponseJSON.orders[0];
    response.orderID = orderID;
    return response;
  }
}
