import { ServerModel } from '../utils/framework';
import { config } from '../config';

export type User = {
  email: string,
  token: string,
  username: string,
  bio: string,
  image: string
};

export class UserModel extends ServerModel<User> {
  constructor(attributes?: User) {
    super(attributes || {
      email: '',
      token: '',
      username: '',
      bio: '',
      image: '',
    });
  }
  getId(): string {
    return this.attrs.username;
  }
  getUrl(): string {
    return `${config.apiUrl}/user`;
  }
  protected serialize() {
    return {
      user: this.attrs,
    };
  }
  protected deserialize(data: { [key:string]: any }) {
    return <User>data.user;
  }
}
