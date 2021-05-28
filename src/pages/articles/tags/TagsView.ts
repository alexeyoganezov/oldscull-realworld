import { ModelView } from '../../../utils/framework';
import { ArticlesPageModel } from '../ArticlesPresenter';

export class TagsView extends ModelView<ArticlesPageModel> {
  getHTML() {
    const tags = this.model.attrs.tags.models;
    return `
      <div class="home-page row">
        <p>Popular Tags</p>
        <div class="tag-list">
          ${ tags.map(tag => `<a href="" class="tag-pill tag-default">${tag.attrs.value}</a>`).join('') }
        </div>
      </div>
    `;
  }
}
