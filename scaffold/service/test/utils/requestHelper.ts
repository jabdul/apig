import { factory } from 'factory-girl';
import { jwt } from '@ctt/service-utils';
import server, { Map } from '../../src/server';
import config, { configFiles } from '../../src/utils/loadconfig';
import { Server } from 'hapi';

config.loadFile(configFiles);

export default async (): Promise<Server> => await server();

export const bearerToken = async (): Promise<Map<string>> => {
  const user = {
    fullname: 'test Test',
    email: 'bolatan.ibrahim${n}@craftturf.com',
    role: '5eb01d542a78e8e74c3ff56c',
  }
  const { email, fullname, role } = user;
  const token = jwt.generateToken(
    {
      fullname,
      role,
      email,
    },
    config,
  );

  return { authorization: token };
};

export const parsedResponse = ({ payload }): object | any => JSON.parse(payload);
