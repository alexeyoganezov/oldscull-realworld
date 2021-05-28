import page from 'page';
import { Presenter } from '../../utils/framework';
import { EditorView } from './EditorView';
import { Article, ArticleModel } from '../../entities/Article';

export class EditorPresenter extends Presenter<ArticleModel, EditorView> {
  model = new ArticleModel();
  view: EditorView = new EditorView(this.model);
  viewEvents = [
    {
      on: 'submit',
      call: this.handleSubmit.bind(this),
    },
  ];
  constructor(articleId?: string) {
    super();
    if (articleId) {
      this.model.setAttribute('slug', articleId);
    }
  }
  async beforeInit() {
    if (this.model.attrs.slug) {
      await this.model.load();
    }
  }
  async handleSubmit(data: unknown) {
    const article = <Article>data;
    this.model.set(article);
    await this.model.save();
    page.redirect(`/article/${this.model.attrs.slug}`);
  }
}
