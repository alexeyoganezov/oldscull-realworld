import axios from 'axios';
import { LoginView } from './LoginView';
import { LoginModel } from './LoginModel';
import { Presenter } from '../../utils/framework';
import { config } from '../../config';

export class LoginPresenter extends Presenter<LoginModel, LoginView> {
  model: LoginModel = new LoginModel();
  view: LoginView = new LoginView(this.model);
  viewEvents = [
    {
      on: 'submit',
      call: this.handleSubmit.bind(this),
    },
  ];
  async handleSubmit(data: unknown) {
    const request = await axios.post(`${config.apiUrl}/users/login`, {
      user: data,
    });
    if (request.data.user) {
      const jwt = request.data.user.token;
      localStorage.setItem('jwt', jwt);
      window.location.href = '/';
    }
  }
}
