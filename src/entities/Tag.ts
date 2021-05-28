import {Model, Collection} from '../utils/framework';
import { config } from '../config';

export type Tag = {
  value: string,
};

export class TagModel extends Model<Tag> {
  getId(): any {
    return this.attrs.value;
  }
}

export class TagCollection extends Collection<TagModel> {
  async load() {
    const response = await fetch(`${config.apiUrl}/tags`, {
      method: 'GET',
    });
    const data = await response.json();
    const models = data.tags.map((value: string) => new TagModel({ value }));
    this.set(models);
  }
}
