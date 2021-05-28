import { Model, HttpMethod } from './index';

/**
 * A Model stored on a server.
 *
 * @todo Write documentation for params/returns
 * @todo Move JWT/Authorization logic outside
 * @todo Publish as separate package or include in "oldscull"
 */
export abstract class ServerModel<T extends object> extends Model<T> {
  /**
   * Get Model url (like "/api/item/1").
   */
  protected abstract getUrl(method: HttpMethod): string

  /**
   * Get model attributes from server.
   */
  public async load(params?: { [key:string]: any }) {
    let url = this.getUrl(HttpMethod.GET);
    if (params) {
      const usp = new URLSearchParams();
      Object.keys(params).forEach((key) => usp.append(key, params[key]));
      url += `?${usp.toString()}`;
    }
    const response = await this.request(HttpMethod.GET, url);
    const attributes = this.deserialize(response);
    this.set(attributes);
  }

  /**
   * Is this model created on server.
   */
  isNew(): boolean {
    return !this.getId();
  }

  /**
   * Create or update the model on server.
   */
  public async save(patch = false, validation = true) {
    if (validation) {
      const isValid = this.isValid();
      if (!isValid) {
        return;
      }
    }
    let method: HttpMethod;
    if (this.isNew()) {
      method = HttpMethod.POST;
    } else {
      method = patch ? HttpMethod.PATCH : HttpMethod.PUT;
    }
    const url = this.getUrl(method);
    const payload = this.serialize();
    const response = await this.request(method, url, payload);
    const attributes = this.deserialize(response);
    this.set(attributes);
    return response;
  }

  /**
   * Remove the model from server.
   */
  public async delete() {
    const url = this.getUrl(HttpMethod.DELETE);
    await this.request(HttpMethod.DELETE, url);
  }

  /**
   * Perform server request.
   */
  protected async request(method: string, url: string, payload?: object) {
    const headers: { [key:string]: any } = {
      'Content-Type': 'application/json',
    };
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      headers.Authorization = `Token ${jwt}`;
    }
    const response = await fetch(url, {
      method,
      credentials: 'include',
      body: payload ? JSON.stringify(payload) : undefined,
      headers,
    });
    return await response.json();
  }

  /**
   * Convert model attributes to the shape expected by server.
   */
  protected serialize(): any {
    return this.attrs;
  }

  /**
   * Convert server response to model attributes.
   */
  protected deserialize(data: object): T {
    return <T>data;
  }

  /**
   * Perform cliend-side validation of Model attributes
   */
  public isValid(): boolean {
    const errors = this.validate();
    if (errors) {
      this.trigger('invalid', errors);
    }
    return !errors;
  }

  /**
   * Validation logic.
   * Meant to be implemented by child classes.
   */
  protected validate(): any {
    return false;
  }
}
