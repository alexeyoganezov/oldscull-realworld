import marked from 'marked';
import { ModelView } from '../../utils/framework';
import { ArticleModel } from '../../entities/Article';
import { config } from '../../config';

export class ArticleView extends ModelView<ArticleModel> {
  getHTML(): string {
    const article = this.model.attrs;
    let dtf = new Intl.DateTimeFormat();
    return `
      <div class="article-page">
        <div class="banner">
          <div class="container">
            <h1>
              ${ article.title }
            </h1>
            <div class="article-meta">
              <a href="/#!/@${ article.author.username }">
                <img src="${ article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg' }" />
              </a>
              <div class="info">
                <a href="/#!/@${ article.author.username }" class="author">
                  ${ article.author.username }
                </a>
                <span class="date">
                  ${ dtf.format(new Date(article.createdAt)) }
                </span>
              </div>
              ${
                config.user?.username === article.author.username ? `
                  <a class="btn btn-outline-secondary btn-sm" href="/#!/editor/${article.slug}">
                    <i class="ion-edit"></i> Edit Article
                  </a>
                  <button class="btn btn-delete btn-outline-danger btn-sm">
                    <i class="ion-trash-a"></i> Delete Article
                  </button>
                ` : `
                  <button class="btn btn-sm btn-outline-secondary">
                    <i class="ion-plus-round"></i>
                    Follow ${ article.author.username }
                  </button>
                  <button class="btn btn-sm btn-outline-primary">
                    <i class="ion-heart"></i>
                    Favorite Post <span class="counter">(${ article.favoritesCount })</span>
                  </button>
                `
              }
            </div>
          </div>
        </div>
        <div class="container page">
          <div class="row article-content">
            <div class="col-md-12">
              ${ marked(article.body) }
            </div>
          </div>
          <hr />
          <div class="article-actions">
            <div class="article-meta">
              <a href="/#!/@${ article.author.username }">
                <img src="${ article.author.image || 'https://static.productionready.io/images/smiley-cyrus.jpg' }" />
              </a>
              <div class="info">
                <a href="/#!/@${ article.author.username }" class="author">
                  ${ article.author.username }
                </a>
                <span class="date">
                  ${ dtf.format(new Date(article.createdAt)) }
                </span>
              </div>
              ${
                config.user?.username === article.author.username ? `
                  <a class="btn btn-outline-secondary btn-sm" href="/#!/editor/${article.slug}">
                    <i class="ion-edit"></i> Edit Article
                  </a>
                  <button class="btn btn-delete btn-outline-danger btn-sm">
                    <i class="ion-trash-a"></i> Delete Article
                  </button>
                ` : `
                  <button class="btn btn-sm btn-outline-secondary">
                    <i class="ion-plus-round"></i>
                    Follow ${ article.author.username }
                  </button>
                  <button class="btn btn-sm btn-outline-primary">
                    <i class="ion-heart"></i>
                    Favorite Post <span class="counter">(${ article.favoritesCount })</span>
                  </button>
                `
              }
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">
              <form class="card comment-form">
                <div class="card-block">
                  <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                </div>
                <div class="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                  <button class="btn btn-sm btn-primary">
                   Post Comment
                  </button>
                </div>
              </form>
              <div class="card">
                <div class="card-block">
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div class="card-footer">
                  <a href="" class="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="" class="comment-author">Jacob Schmidt</a>
                  <span class="date-posted">Dec 29th</span>
                </div>
              </div>
              <div class="card">
                <div class="card-block">
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div class="card-footer">
                  <a href="" class="comment-author">
                    <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="" class="comment-author">Jacob Schmidt</a>
                  <span class="date-posted">Dec 29th</span>
                  <span class="mod-options">
                    <i class="ion-edit"></i>
                    <i class="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  domEvents = [
    {
      el: '.btn-delete',
      on: 'click',
      call: this.handleDelete.bind(this),
    },
  ];
  handleDelete(event: Event) {
    this.trigger('delete');
  }
}
