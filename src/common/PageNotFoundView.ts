import { View } from '../utils/framework';

export class PageNotFoundView extends View {
  getHTML(): string {
    return `
      <h2>
        Page not found
      </h2>
    `;
  }
}
