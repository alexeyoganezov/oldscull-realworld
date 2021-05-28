import { ModelView, Reference } from '../../utils/framework';
import { ArticleModel } from '../../entities/Article';

export class ArticleView extends ModelView<ArticleModel> {
  getHTML(): string {
    const article = this.model.attrs;
    let dtf = new Intl.DateTimeFormat();
    return `
      <div class="article-preview">
        <div class="article-meta">
          <a href="profile.html">
            <img src="${ article.author.image }" />
          </a>
          <div class="info">
            <a href="/@${ article.author.username }" class="author">
              ${ article.author.username }
            </a>
            <span class="date">
              ${ dtf.format(new Date(article.createdAt)) }
            </span>
          </div>
          <button class="like-btn btn ${ article.favorited ? 'btn-primary' : 'btn-outline-primary' } btn-sm pull-xs-right">
            <i class="ion-heart"></i>
            <span class="like-count">
              ${ article.favoritesCount }
            </span>
          </button>
        </div>
        <a href="/article/${ article.slug }" class="preview-link">
          <h1>${ article.title }</h1>
          <p>${ article.description }</p>
          <span>Read more...</span>
          <ul class="tag-list">
            ${
              article.tagList.map(tag => `
                <li class="tag-default tag-pill tag-outline">
                  ${tag}
                </li>
              `).join('')
            }
          </ul>
        </a>
       </div>
    `;
  }
  domEvents = [
    {
      el: '.like-btn',
      on: 'click',
      call: this.handleLike.bind(this)
    },
  ];
  modelEvents = [
    {
      on: 'change favoritesCount',
      call: this.updateFavoritesCount.bind(this),
    },
    {
      on: 'change favorited',
      call: this.updateFavorited.bind(this),
    },
  ];
  likeCount = new Reference(this, '.like-count');
  likeButton = new Reference(this, '.like-btn');
  handleLike() {
    this.trigger('like', this.model);
  }
  updateFavoritesCount() {
    const likeCount = this.likeCount.get();
    if (likeCount) {
      likeCount.textContent = `${this.model.attrs.favoritesCount}`;
    }
  }
  updateFavorited() {
    const likeButton = this.likeButton.get();
    if (likeButton && likeButton instanceof Element) {
      if (this.model.attrs.favorited) {
        likeButton.classList.add('btn-primary');
        likeButton.classList.remove('btn-outline-primary');
      } else {
        likeButton.classList.add('btn-outline-primary');
        likeButton.classList.remove('btn-primary');
      }
    }
  }
}
