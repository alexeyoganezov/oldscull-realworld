import { View } from '../../utils/framework';

export class NoArticlesView extends View {
  getHTML(): string {
    return `
      <div class="article-preview">
        No articles
       </div>
    `;
  }
}
