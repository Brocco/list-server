import express = require('express');
let router = express.Router();

import DataStore from '../data/data-store';
import {List} from '../data/models';

export default class LinkRoute {
  public getRoutes(){
    router.get('/', this.getLists.bind(this));
    router.get('/:listId', this.getList.bind(this));
    router.post('/', this.newList.bind(this));
    router.post('/:listId/rename', this.renameList.bind(this));
    router.delete('/:listId', this.deleteList.bind(this));
    return router;
  }

  public getLists (req: express.Request, res: express.Response, next?: Function) {
    res.status(200).json(DataStore.getLists());
  }

  public getList (req: express.Request, res: express.Response, next?: Function) {
    let id = parseInt(req.params.listId);
    res.status(200).json(DataStore.getList(id));
  }

  public newList (req: express.Request, res: express.Response, next?: Function) {
    let listName = <string>req.body.name;
    let list = DataStore.newList(listName);
    res.status(201).json(list);
  }

  public renameList (req: express.Request, res: express.Response, next?: Function) {
    let id = parseInt(req.params.listId);
    let listName = <string>req.body.name;
    let list = DataStore.renameList(id, listName);

    if (list){
      res.status(200).json(list);
    } else {
      res.status(404);
    }
  }

  public deleteList (req: express.Request, res: express.Response, next?: Function) {
    let id = parseInt(req.params.listId);
    let deleted = DataStore.deleteList(id);
    res.status(deleted ? 200 : 404);
  }
}