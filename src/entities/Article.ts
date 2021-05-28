import {ServerModel, PageableCollection, HttpMethod} from '../utils/framework';
import { config } from '../config';
import axios from "axios";

export type Article = {
  slug: string,
  title: string,
  description: string,
  body: string,
  tagList: string[],
  createdAt: string,
  updatedAt: string,
  favorited: boolean,
  favoritesCount: number,
  author: {
    username: string,
    bio: string,
    image: string,
    following: boolean,
  }
}

export class ArticleModel extends ServerModel<Article> {
  constructor(attrs?: Article) {
    super(attrs || {
      slug: '',
      title: '',
      description: '',
      body: '',
      tagList: [],
      createdAt: '',
      updatedAt: '',
      favorited: false,
      favoritesCount: 0,
      author: {
        username: '',
        bio: '',
        image: '',
        following: false,
      },
    });
  }
  getId(): string {
    return this.attrs.slug;
  }
  getUrl(method: string) {
    switch (method) {
      case 'GET':
      case 'DELETE':
      case 'PUT':
      case 'PATCH':
        return `${config.apiUrl}/articles/${this.getId()}`;
      case 'POST':
        return `${config.apiUrl}/articles`;
    }
    return `${config.apiUrl}/articles`;
  }
  deserialize(data: { [key: string]: any }) {
    return <Article>data.article;
  }
  async favorite() {
    const response = await this.request(
      HttpMethod.POST,
      `${config.apiUrl}/articles/${this.getId()}/favorite`,
    );
    this.set(response.article);
  }
  async unfavorite() {
    const response = await this.request(
      HttpMethod.DELETE,
      `${config.apiUrl}/articles/${this.getId()}/favorite`,
    );
    this.set(response.article);
  }
}

export class ArticleCollection extends PageableCollection<ArticleModel> {
  getUrl() {
    return `${config.apiUrl}/articles`;
  }
  protected updatePagination(data: { [key:string]: any } = {}) {
    this.total = data.articlesCount;
  }
  protected deserialize(data: { [key:string]: any }) {
    return <Article[]>data.articles;
  }
}
