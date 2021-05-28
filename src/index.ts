import page from 'page';
import axios from 'axios';

import { PageLayoutView } from './common/PageViewLayout';
import { Application } from './utils/framework';
import { config } from './config';

interface IRoute {
  path: string;
  action: (ctx: PageJS.Context) => Promise<void>
}

export class RealWorldApp extends Application {
  routes: IRoute[] = [
    {
      path: '/',
      action: this.initArticles.bind(this),
    },
    {
      path: '/login',
      action: this.initLogin.bind(this),
    },
    {
      path: '/register',
      action: this.initRegister.bind(this),
    },
    {
      path: '/settings',
      action: this.initSettings.bind(this),
    },
    {
      path: '/editor',
      action: this.initEditor.bind(this),
    },
    {
      path: '/editor/:id',
      action: this.initEditor.bind(this),
    },
    {
      path: '/article/:id',
      action: this.initArticle.bind(this),
    },
    {
      path: '*',
      action: this.initPageNotFound.bind(this),
    },
  ];
  layout: PageLayoutView = new PageLayoutView();
  async init(): Promise<any> {
    // Detect user
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const response = await axios.get(`${config.apiUrl}/user`, {
        headers: {
          Authorization: `Token ${jwt}`
        }
      });
      config.user = response.data.user;
    }
    // Link handler
    document.body.addEventListener('click', async (event) => {
      const element = event.target as HTMLElement;
      if (element.tagName === 'A') {
        let href = element.getAttribute('href');
        if (href && href.startsWith('/')) {
          event.preventDefault();
          page(href.replace('/#!', ''));
        }
      }
    });
    // Initialize page layout
    await this.mainRegion.show(this.layout);
    // Initialize router
    this.routes.forEach(route => page(route.path, route.action));
    page.start({
      hashbang: true,
    });
  }
  async initArticles(): Promise<void> {
    const { ArticlesPresenter } = await import('./pages/articles/ArticlesPresenter');
    await this.layout.content.show(new ArticlesPresenter());
  }
  async initLogin(): Promise<void> {
    const { LoginPresenter } = await import('./pages/login/LoginPresenter');
    await this.layout.content.show(new LoginPresenter());
  }
  async initRegister(): Promise<void> {
    const { RegisterPresenter } = await import('./pages/register/RegisterPresenter');
    await this.layout.content.show(new RegisterPresenter());
  }
  async initSettings(): Promise<void> {
    const { SettingsPresenter } = await import('./pages/settings/SettingsPresenter');
    await this.layout.content.show(new SettingsPresenter());
  }
  async initEditor(ctx: PageJS.Context): Promise<void> {
    const { EditorPresenter } = await import('./pages/editor/EditorPresenter');
    await this.layout.content.show(new EditorPresenter(ctx.params.id));
  }
  async initArticle(ctx: PageJS.Context): Promise<void> {
    const { ArticlePresenter } = await import('./pages/article/ArticlePresenter');
    await this.layout.content.show(new ArticlePresenter(ctx.params.id));
  }
  async initPageNotFound(): Promise<void> {
    const { PageNotFoundView } = await import('./common/PageNotFoundView');
    await this.layout.content.show(new PageNotFoundView());
  }
}

const app = new RealWorldApp('#root');
app.init();




