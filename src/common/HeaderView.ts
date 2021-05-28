import { ModelView } from '../utils/framework';
import { UserModel } from '../entities/User';

export class HeaderView extends ModelView<UserModel> {
  getHTML() {
    const user = this.model.attrs;
    return `
      <nav class="navbar navbar-light">
        <div class="container">
          <a class="navbar-brand" href="/#!/">conduit</a>
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <a class="nav-link active" href="/#!/">Home</a>
            </li>
            ${
              user.email ? `
                <li class="nav-item">
                  <a class="nav-link" href="/#!/editor">
                    <i class="ion-compose"></i>&nbsp;New Article
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#!/settings">
                    <i class="ion-gear-a"></i>&nbsp;Settings
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#!/@${ user.username }">
                    ${ user.username }
                  </a>
                </li>
              ` : `
                <li class="nav-item">
                  <a class="nav-link" href="/#!/login">Sign in</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/#!/register">Sign up</a>
                </li>
              `
            }
          </ul>
        </div>
      </nav>
    `;
  }
}
