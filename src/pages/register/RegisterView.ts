import { ErrorObject } from 'ajv';
import { ModelView, Reference } from '../../utils/framework';
import { RegisterModel } from './RegisterModel';

export class RegisterView extends ModelView<RegisterModel> {
  getHTML(data?: object): string {
    return `
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Have an account?</a>
          </p>
          <form>
            <fieldset class="form-group">
              <input
                class="username-input form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="email-input form-control form-control-lg"
                type="text"
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="password-input form-control form-control-lg"
                type="password"
                placeholder="Password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    `;
  }
  form = new Reference(this, 'form');
  usernameInput = new Reference(this, '.username-input');
  emailInput = new Reference(this, '.email-input');
  passwordInput = new Reference(this, '.password-input');
  domEvents = [
    {
      el: 'form', on: 'submit', call: this.handleSubmit.bind(this),
    },
  ];
  modelEvents = [
    {
      on: 'invalid',
      call: this.handleValidationErrors,
    },
  ];
  handleSubmit(event: Event) {
    event.preventDefault();
    const usernameInput = <HTMLInputElement>this.usernameInput.get();
    const emailInput = <HTMLInputElement>this.emailInput.get();
    const passwordInput = <HTMLInputElement>this.passwordInput.get();
    this.trigger('submit', {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    });
  }
  handleValidationErrors(errors?: unknown) {
    if (errors) {
      const ers = <ErrorObject[]>errors;
      ers.forEach((error) => {
        if (error.instancePath == '/username') {
          const input = <HTMLInputElement>this.usernameInput.get();
          if (input.parentElement) {
            input.parentElement.classList.add('has-danger');
          }
        }
        if (error.instancePath == '/email') {
          const input = <HTMLInputElement>this.emailInput.get();
          if (input.parentElement) {
            input.parentElement.classList.add('has-danger');
          }
        }
        if (error.instancePath == '/password') {
          const input = <HTMLInputElement>this.passwordInput.get();
          if (input.parentElement) {
            input.parentElement.classList.add('has-danger');
          }
        }
      });
    }
  }
}
