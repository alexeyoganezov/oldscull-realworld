import type { User } from './entities/User';

class Config {
  apiUrl: string = 'https://conduit.productionready.io/api';
  user: User | null = null;
}

const config = new Config();

export { config };
