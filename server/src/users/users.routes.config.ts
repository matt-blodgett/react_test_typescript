import express from 'express';

import { CommonRoutesConfig } from '../common/common.routes.config';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'users');
  }

  configureRoutes (routePrefix: string) {
    this.app.route(`${routePrefix}/users`)
      .get((request: express.Request, response: express.Response) => {
        response.status(200).send(`List of users`);
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
        response.status(200).send(`DELETE requested for id ${request.params.id}`);
      });

    return this.app;
  }
}
