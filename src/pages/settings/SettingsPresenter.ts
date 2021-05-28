import page from 'page';
import { Presenter } from '../../utils/framework';
import { config } from '../../config';
import { User, UserModel } from '../../entities/User';
import { SettingsView } from './SettingsView';

export class SettingsPresenter extends Presenter<UserModel, SettingsView> {
  model: UserModel = new UserModel();
  view: SettingsView = new SettingsView(this.model);
  viewEvents = [
    {
      on: 'submit',
      call: this.handleSubmit.bind(this),
    },
  ];
  protected beforeInit(): void {
    if (config.user) {
      this.model.set(config.user);
    }
  }
  async handleSubmit(data: unknown) {
    this.model.set(<User>data);
    await this.model.save();
    page.redirect(`/#!/@${this.model.attrs.username}`);
  }
}
