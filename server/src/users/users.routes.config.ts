import express from 'express';

import { CommonRoutesConfig } from '../common/common.routes.config';

import mysql from 'mysql';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'users');
  }

  configureRoutes (routePrefix: string) {
    this.app.route(`${routePrefix}/users`)
      .get((request: express.Request, response: express.Response) => {

        let connectionConfig: mysql.ConnectionConfig = {
          host: '',
          user: '',
          password: '',
          database: 'test_mb'
        };
        let connection: mysql.Connection = mysql.createConnection(connectionConfig);
        connection.connect(error => {
          if (error) {
            console.error(error);
            process.exit(-1);
          }
        });

        let sql: string = 'SELECT id, name FROM Users';
        type Row = {
          name: string
        }
        let resultsList: Array<Row> = [];
        connection.query(sql, (error: mysql.MysqlError, results: Array<Row>, fields: Array<mysql.FieldInfo>) => {
          if (error) {
            throw error;
          }
          results.forEach(row => {
            resultsList.push({name: row.name});
          })
          response.status(200).json(resultsList);
        })
      })
      .post((request: express.Request, response: express.Response) => {
        response.status(200).send(`Post to users`);
      });

    this.app.route(`${routePrefix}/users/:id`)
      .all((request: express.Request, response: express.Response, next: express.NextFunction) => {
        next();
      })
      .get((request: express.Request, response: express.Response) => {
        response.status(200).send(`GET requested for id ${request.params.id}`);
      })
      .put((request: express.Request, response: express.Response) => {
        response.status(200).send(`PUT requested for id ${request.params.id}`);
      })
      .patch((request: express.Request, response: express.Response) => {
        response.status(200).send(`PATCH requested for id ${request.params.id}`);
      })
      .delete((request: express.Request, response: express.Response) => {
        response.status(204).send(`DELETE requested for id ${request.params.id}`);
      });

    return this.app;
  }
}
