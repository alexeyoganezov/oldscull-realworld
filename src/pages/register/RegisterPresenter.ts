import page from 'page';
import { Presenter } from '../../utils/framework';
import { RegisterView } from './RegisterView';
import { RegisterModel, RegisterData } from './RegisterModel';

export class RegisterPresenter extends Presenter<RegisterModel, RegisterView> {
  model: RegisterModel = new RegisterModel({
    username: '',
    email: '',
    password: '',
  });
  view: RegisterView = new RegisterView(this.model);
  viewEvents = [
    {
      on: 'submit',
      call: this.handleSubmit.bind(this),
    }
  ];
  async handleSubmit(data: unknown) {
    const registerData = <RegisterData>data;
    this.model.set(registerData);
    const response = await this.model.save();
    const jwt = response.user.token;
    localStorage.setItem('jwt', jwt);
    page('/');
  }
}
