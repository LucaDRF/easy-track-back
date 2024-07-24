import { Router } from 'express';
import SchemaValidator from '../utils/schemaValidator.js';

class Base {
  constructor(path, Controller, Schema) {
    this.router = new Router();

    this.path = path;
    this.schema = Schema && new Schema();
    this.controller = Controller && new Controller();
    this.validateSchema = SchemaValidator.validate;
  }
}

export default Base;
