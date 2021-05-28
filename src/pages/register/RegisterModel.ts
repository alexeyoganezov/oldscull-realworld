import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { ServerModel } from '../../utils/framework';
import { config } from '../../config';

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

const ajv = new Ajv({
  allErrors: true,
});
addFormats(ajv);

const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 2,
      maxLength: 32,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 2,
      maxLength: 32,
    },
  },
  required: [
    'username',
    'email',
    'password',
  ],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

export class RegisterModel extends ServerModel<RegisterData> {
  protected getUrl(method: string): string {
    return `${config.apiUrl}/users`;
  }
  isNew() {
    return true;
  }
  validate() {
    const isValid = validate(this.attrs);
    if (!isValid) {
      return validate.errors;
    }
  }
  protected serialize() {
    return {
      user: this.attrs,
    }
  }
}
