import page from 'page';
import { Presenter } from '../../utils/framework';
import { ArticleView } from './ArticleView';
import { ArticleModel } from '../../entities/Article';

export class ArticlePresenter extends Presenter<ArticleModel, ArticleView> {
  model = new ArticleModel();
  view: ArticleView = new ArticleView(this.model);
  viewEvents = [
    {
      on: 'delete', call: this.handleDelete.bind(this)
    },
  ];
  constructor(articleId: string) {
    super();
    this.model.setAttribute('slug', articleId);
  }
  async beforeInit() {
    await this.model.load();
  }
  async handleDelete() {
    await this.model.delete();
    page.redirect('/');
  }
}
