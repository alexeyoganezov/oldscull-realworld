import { ModelView, Reference } from '../../utils/framework';
import { ArticleModel } from '../../entities/Article';

export class EditorView extends ModelView<ArticleModel> {
  getHTML(): string {
    const article = this.model.attrs;
    return `
      <div class="editor-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset class="form-group">
                      <input
                        type="text"
                        class="form-control form-control-lg title-input"
                        placeholder="Article Title"
                        value="${article.title}"
                      >
                  </fieldset>
                  <fieldset class="form-group">
                      <input
                        type="text"
                        class="form-control description-input"
                        placeholder="What's this article about?"
                        value="${article.description}"
                      >
                  </fieldset>
                  <fieldset class="form-group">
                      <textarea
                        class="form-control body-input"
                        rows="8"
                        placeholder="Write your article (in markdown)"
                      >${article.title}</textarea>
                  </fieldset>
                  <fieldset class="form-group">
                      <input
                        type="text"
                        class="form-control tags-input"
                        placeholder="Enter tags"
                        value="${article.title}"
                      >
                      <div class="tag-list"></div>
                  </fieldset>
                  <button class="btn btn-lg pull-xs-right btn-primary btn-submit" type="button">
                      Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  titleInput = new Reference(this, '.title-input');
  descriptionInput = new Reference(this, '.description-input');
  bodyInput = new Reference(this, '.body-input');
  tagsInput = new Reference(this, '.tags-input');
  domEvents = [
    {
      el: '.btn-submit', on: 'click', call: this.handleSubmit.bind(this),
    },
  ];
  handleSubmit(event: Event) {
    event.preventDefault();
    const titleInput = <HTMLInputElement>this.titleInput.get();
    const descriptionInput = <HTMLInputElement>this.descriptionInput.get();
    const bodyInput = <HTMLInputElement>this.bodyInput.get();
    const tagsInput = <HTMLInputElement>this.tagsInput.get();
    titleInput.disabled = true;
    descriptionInput.disabled = true;
    bodyInput.disabled = true;
    tagsInput.disabled = true;
    this.trigger('submit', {
      title: titleInput.value,
      description: descriptionInput.value,
      body: bodyInput.value,
      tags: tagsInput.value,
    });
  }
}
