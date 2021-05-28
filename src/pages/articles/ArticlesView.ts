import { ModelView, Region } from '../../utils/framework';
import { ArticleListView } from './ArticleListView';
import { ArticlesPageModel } from './ArticlesPresenter';
import { TagsView } from './tags/TagsView';

export class ArticlesView extends ModelView<ArticlesPageModel> {
  getHTML() {
    return `
      <div class="home-page row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>
          <div class="articles"></div>
          <ul class="pagination">
            ${ this.getPagination() }
          </ul>
        </div>
        <div class="col-md-3">
          <div class="sidebar">

          </div>
        </div>
      </div>
    `;
  }
  mainRegion =  new Region(this, '.articles');
  sidebarRegion =  new Region(this, '.sidebar');
  domEvents = [
    { el: '.page-link', on: 'click', call: this.changePage.bind(this) },
  ];
  articleListView: ArticleListView = new ArticleListView(this.model.attrs.articles);
  constructor(model: ArticlesPageModel) {
    super(model);
    this.retrigger = this.retrigger.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
  }
  async afterInit() {
    this.articleListView.on('like', this.retrigger);
    this.model.attrs.articles.on('pageChanged', this.updatePagination);
    await this.mainRegion.show(this.articleListView);
    this.sidebarRegion.show(new TagsView(this.model));

  }
  afterRemove(): void {
    this.articleListView.off('like', this.retrigger);
    this.model.attrs.articles.off('pageChanged', this.updatePagination);
  }
  changePage(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const el = event.target as HTMLElement;
    const dataNumber = el.getAttribute('data-number');
    if (dataNumber) {
      this.trigger('changePage', {
        page: parseInt(dataNumber),
      });
    }
  }
  updatePagination() {
    const active = this.el?.querySelector('.page-item.active');
    if (active) {
      active.classList.remove('active');
    }
    const next = this.el?.querySelector(`.page-item:nth-child(${this.model.attrs.articles.currentPage})`);
    if (next) {
      next.classList.add('active');
    }
  }
  getPagination() {
    let markup = '';
    for (let i = 1; i <= this.model.attrs.articles.totalPages; i += 1) {
      markup += `
        <li class="page-item ${ i === this.model.attrs.articles.currentPage ? 'active' : '' }">
          <a class="page-link" data-number="${i}" href="/">
            ${i}
          </a>
        </li>
      `;
    }
    return markup;
  }
}
