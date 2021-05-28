import { Model } from '../../utils/framework';

export type LoginData = {
  email: string;
  password: string;
};

export class LoginModel extends Model<LoginData> {
  constructor(attrs?: LoginData) {
    super(attrs || {
      email: '',
      password: '',
    });
  }
}
