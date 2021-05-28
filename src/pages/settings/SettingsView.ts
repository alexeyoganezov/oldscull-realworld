import { ModelView, Reference } from '../../utils/framework';
import { UserModel } from '../../entities/User';
import { config } from '../../config';

export class SettingsView extends ModelView<UserModel> {
  getHTML(): string {
    const user = this.model.attrs;
    return `
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
              Your Settings
          </h1>
          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input
                    class="image-input form-control"
                    value="${user.image}"
                    type="text"
                    placeholder="URL of profile picture"
                  >
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="username-input form-control form-control-lg"
                    value="${user.username}"
                    type="text"
                    placeholder="Your Name"
                  >
                </fieldset>
                <fieldset class="form-group">
                  <textarea
                    class="bio-input form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                  >${user.bio}</textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input
                    class="email-input form-control form-control-lg"
                    value="${user.email}"
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
                <button class="btn btn-lg btn-primary pull-xs-right update-btn">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <hr>
          <button class="btn btn-outline-danger btn-logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    `;
  }
  form = new Reference(this, 'form');
  imageInput = new Reference(this, '.image-input');
  usernameInput = new Reference(this, '.username-input');
  bioInput = new Reference(this, '.bio-input');
  emailInput = new Reference(this, '.email-input');
  passwordInput = new Reference(this, '.password-input');
  updateButton = new Reference(this, '.update-btn');
  domEvents = [
    {
      el: 'form',
      on: 'submit',
      call: this.handleSubmit.bind(this),
    },
    {
      el: '.btn-logout',
      on: 'click',
      call: this.handleLogout.bind(this),
    },
  ];
  handleSubmit(event: Event) {
    event.preventDefault();
    const imageInput = <HTMLInputElement>this.imageInput.get();
    const usernameInput = <HTMLInputElement>this.usernameInput.get();
    const bioInput = <HTMLInputElement>this.bioInput.get();
    const emailInput = <HTMLInputElement>this.emailInput.get();
    const passwordInput = <HTMLInputElement>this.passwordInput.get();
    const updateButton = <HTMLInputElement>this.updateButton.get();
    imageInput.disabled = true;
    usernameInput.disabled = true;
    bioInput.disabled = true;
    emailInput.disabled = true;
    passwordInput.disabled = true;
    updateButton.disabled = true;
    this.trigger('submit', {
      image: imageInput.value,
      username: usernameInput.value,
      bio: bioInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    });
  }
  handleLogout() {
    // TODO: move to presenter
    localStorage.removeItem('jwt');
    config.user = null;
    location.href = '/';
  }
}
