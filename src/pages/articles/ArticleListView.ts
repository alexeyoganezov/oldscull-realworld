import {
  CollectionView,
  ICollection,
  ALL_EVENTS,
  COLLECTION_RESETED_EVENT,
} from '../../utils/framework';
import { ArticleModel } from '../../entities/Article';
import { ArticleView } from './ArticleView';
import { NoArticlesView } from './NoArticlesView';

export class ArticleListView extends CollectionView<ArticleModel, ArticleView, NoArticlesView> {
  collectionEvents = [
    {
      on: COLLECTION_RESETED_EVENT,
      call: this.handleReset.bind(this),
    },
  ];
  viewEvents = [
    {
      on: ALL_EVENTS,
      call: this.retrigger.bind(this),
    },
  ];
  constructor(collection: ICollection<ArticleModel>) {
    super(collection, ArticleView, NoArticlesView);
  }
  getHTML(): string {
    return '<div></div>';
  }
  async handleReset() {
    this.removeAllChildViews();
    await this.addChildView(this.collection.models);
    const content = document.getElementById('content');
    if (content) {
      content.scrollIntoView();
    }
  }
}
