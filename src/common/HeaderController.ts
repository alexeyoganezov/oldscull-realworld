import { Presenter } from '../utils/framework';
import { HeaderView } from './HeaderView';
import { config } from '../config';
import { UserModel } from '../entities/User';

export class HeaderController extends Presenter<UserModel, HeaderView> {
  model: UserModel = new UserModel();
  view: HeaderView = new HeaderView(this.model);
  protected beforeInit(): void {
    if (config.user) {
      this.model.set(config.user);
    }
  }
}
