import { Collection, HttpMethod, IModel } from './index';

/**
 * A Collection that loads and manages items by parts (pages).
 *
 * @todo Split into two classes: ServerCollection and PageableCollection
 * @todo Write documentation for params/returns
 * @todo Merge this.updatePagination() with this.recalculatePages();
 * @todo Publish as separate package or include in "oldscull"
 */
export class PageableCollection<M extends IModel<object>> extends Collection<M> {
  /**
   * Number of items from the beginning to skip on load.
   */
  public offset: number = 0;

  /**
   * Number of items to load and store at one time.
   */
  public limit: number = 5;

  /**
   * Total number of items available.
   */
  public total: number = 0;

  /**
   * Number of the currently loaded page.
   */
  public currentPage = 1;

  /**
   * Total number of pages available.
   */
  public totalPages = 1;

  /**
   * A Constructor for the managed Model.
   */
  Model: { new(m: any): M };

  constructor(Model: { new(m: any): M }) {
    super();
    this.Model = Model;
  }

  /**
   * Get Collection URL (like "/api/items");
   */
  getUrl(): string {
    throw new Error('Collection.getUrl() needs to be implemented');
  }

  /**
   * Load items from server.
   */
  public async load(params?: { [key:string]: any }, reset = false) {
    let url = this.getUrl();
    if (params) {
      const usp = new URLSearchParams();
      Object.keys(params).forEach((key) => usp.append(key, params[key]));
      url += `?${usp.toString()}`;
    }
    const headers: { [key:string]: any } = {
      'Content-Type': 'application/json',
    };
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      headers.Authorization = `Token ${jwt}`;
    }
    const response = await fetch(url, {
      method: HttpMethod.GET,
      credentials: 'include',
      headers,
    });
    const data = await response.json();
    this.updatePagination(data);
    this.recalculatePages();
    const items = this.deserialize(data);
    if (this.Model) {
      const models = items.map((item: object) => new this.Model(item));
      this.set(models, reset);
    } else {
      throw new Error('[OSF] Cannot instantiate new models without Collection.Model property set');
    }
  }

  /**
   * Convert server response to list of item.
   */
  protected deserialize(data: { [key:string]: any }) {
    return data;
  }

  /**
   * Load a page of items.
   */
  async loadPage(pageNumber: number, params: { [key:string]: any } = {}, reset = false) {
    this.offset = (pageNumber * this.limit) - this.limit;
    Object.assign(params, this.getPaginationParams());
    await this.load(params, reset);
  }

  /**
   * Get an object with pagination GET-parameters to pass on this.load().
   */
  protected getPaginationParams() {
    return {
      offset: this.offset,
      limit: this.limit,
    };
  }

  /**
   * Extract and save total items count from server response.
   */
  protected updatePagination(data: { [key:string]: any } = {}) {
    this.total = data.total;
  }

  /**
   * Calculate new values for current/total page number.
   */
  protected recalculatePages() {
    this.totalPages = Math.ceil(this.total / this.limit);
    this.currentPage = this.offset / this.limit + 1;
    this.trigger('pageChanged');
  }
}
