import { View } from '../utils/framework';
import { Region } from '../utils/framework';
import { HeaderController } from './HeaderController';
import { FooterView } from './FooterView';

export class PageLayoutView extends View {
  getHTML() {
    return `
      <div class="page">
          <div class="header">

          </div>
          <div id="content" class="container">

          </div>
          <div class="footer">

          </div>
      </div>
     `;
  }
  header =  new Region(this, '.header');
  content = new Region(this,'#content');
  footer =  new Region(this, '.footer');
  async afterInit() {
    await this.header.show(new HeaderController());
    await this.footer.show(new FooterView());
  }
}
