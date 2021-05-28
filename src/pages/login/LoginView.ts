import { ModelView, Reference } from '../../utils/framework';
import { LoginModel } from './LoginModel';

export class LoginView extends ModelView<LoginModel> {
  getHTML(): string {
    return `
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <a href="">Need an account?</a>
          </p>
          <form>
            <fieldset class="form-group">
              <input
                name="email"
                class="email-input form-control form-control-lg"
                type="text"
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                name="password"
                class="password-input form-control form-control-lg"
                type="password"
                placeholder="Password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    `;
  }
  form = new Reference(this, 'form');
  emailInput = new Reference(this, '.email-input');
  passwordInput = new Reference(this, '.password-input');
  domEvents = [
    {
      el: 'form',
      on: 'submit',
      call: this.handleSubmit.bind(this),
    },
  ];
  handleSubmit(event: Event) {
    event.preventDefault();
    const emailInput = <HTMLInputElement>this.emailInput.get();
    const passwordInput = <HTMLInputElement>this.passwordInput.get();
    this.trigger('submit', {
      email: emailInput.value,
      password: passwordInput.value,
    });
  }
}
