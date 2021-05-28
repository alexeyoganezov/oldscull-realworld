import page from 'page';
import { Presenter, Model } from '../../utils/framework';
import { ArticlesView } from './ArticlesView';
import { config } from '../../config';
import { ArticleModel, ArticleCollection } from '../../entities/Article';
import { TagCollection } from '../../entities/Tag';


type HomeData = {
  articles: ArticleCollection;
  tags: TagCollection
}

export class ArticlesPageModel extends Model<HomeData> {}

export class ArticlesPresenter extends Presenter<ArticlesPageModel, ArticlesView> {
  model: ArticlesPageModel = new ArticlesPageModel({
    tags: new TagCollection(),
    articles: new ArticleCollection(ArticleModel),
  });
  view: ArticlesView = new ArticlesView(this.model);
  viewEvents = [
    {
      on: 'like',
      call: this.handleLike.bind(this),
    },
    {
      on: 'changePage',
      call: this.handlePageChange.bind(this),
    },
  ];
  async beforeInit() {
    await this.model.attrs.articles.loadPage(1);
    await this.model.attrs.tags.load();
  }
  async handleLike(data: unknown) {
    if (!config.user) {
      page.redirect('/login');
      return;
    }
    const article = <ArticleModel>data;
    if (article.attrs.favorited) {
      await article.unfavorite();
    } else {
      await article.favorite();
    }
  }
  async handlePageChange(data: { page: number }) {
    await this.model.attrs.articles.loadPage(data.page, {}, true);
  }
}
