import express from 'express';

export abstract class CommonRoutesConfig {
  app: express.Application;
  name: string;
  routePrefix: string;

  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.routePrefix = '/api'
    this.configureRoutes(this.routePrefix);
  }

  getName () {
    return this.name;
  }

  abstract configureRoutes (routePrefix: string): express.Application;
}
