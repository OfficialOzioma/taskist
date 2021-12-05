/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'
import Url from 'url-parse';

const DATABASE_URL = new Url(Env.get('DATABASE_URL'));

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql
    |
    */
    mysql: {
      client: Env.get('DB_CONNECTION', 'pg'),
      connection: {
        host: Env.get('MYSQL_HOST', DATABASE_URL.hostname),
        port: Env.get('MYSQL_PORT', DATABASE_URL.port),
        user: Env.get('MYSQL_USER', DATABASE_URL.username),
        password: Env.get('MYSQL_PASSWORD', DATABASE_URL.password),
        database: Env.get('MYSQL_DB_NAME', DATABASE_URL.pathname.substr(1)),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },

  }
}

export default databaseConfig
