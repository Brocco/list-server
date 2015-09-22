import express = require('express');
let router = express.Router();
import {Req, Res} from './types';

import DataStore from '../data/data-store';
import {List} from '../data/models';

export default class LinkRoute {
  public getRoutes(): express.Router {
    // list routes
    router.get('/', this.getLists.bind(this));
    router.get('/:listId', this.getList.bind(this));
    router.post('/', this.newList.bind(this));
    router.post('/:listId/rename', this.renameList.bind(this));
    router.delete('/:listId', this.deleteList.bind(this));
    // item routes
    router.get('/:listId/item', this.getItems.bind(this));
    router.get('/:listId/item/:itemId', this.getItem.bind(this));
    router.post('/:listId/item', this.newItem.bind(this));
    router.post('/:listId/item/:itemId/rename', this.renameItem.bind(this));
    router.post('/:listId/item/:itemId/toggle', this.toggleItemCompletion.bind(this));
    return router;
  }

  public getLists (req, res, next) {
    let lists = DataStore.getLists();
    res.status(200).json(lists);
  }

  public getList (req: Req, res: Res, next?: Function) {
    try{
      let id = parseInt(req.params.listId);
      let list = DataStore.getList(id);
      res.status(200).json(list);
    } catch(err){
      res.status(404);
    }
  }

  public newList (req: Req, res: Res, next?: Function) {
    let listName = <string>req.body.name;
    let list = DataStore.newList(listName);
    res.status(201).json(list);
  }

  public renameList (req: Req, res: Res, next?: Function) {
    let id = parseInt(req.params.listId);
    let listName = <string>req.body.name;
    let list = DataStore.renameList(id, listName);

    if (list){
      res.status(200).json(list);
    } else {
      res.status(404);
    }
  }

  public deleteList (req: Req, res: Res, next?: Function) {
    let id = parseInt(req.params.listId);
    let deleted = DataStore.deleteList(id);
    res.status(deleted ? 200 : 404);
  }

  public getItems (req: Req, res: Res, next?: Function) {
    try{
      let listId = parseInt(req.params.listId);
      let items = DataStore.getItems(listId);
      res.status(200).json(items);
    } catch (err){
      res.status(404);
    }
  }

  public getItem (req: Req, res: Res, next?: Function) {
    let listId = parseInt(req.params.listId);
    let itemId = parseInt(req.params.itemId);
    try{
      let item = DataStore.getItem(listId, itemId);
      res.status(200).json(item);
    } catch (err){
      res.status(404);
    }
  }

  public newItem (req: Req, res: Res, next?: Function) {
    let listId = parseInt(req.params.listId);
    let name = <string>req.body.name
    try{
      let item = DataStore.addItem(listId, name);
      res.status(200).json(item);
    } catch (err){
      res.status(404);
    }
  }

  public renameItem (req: Req, res: Res, next?: Function) {
    let listId = parseInt(req.params.listId);
    let itemId = parseInt(req.params.itemId);
    let name = <string>req.body.name
    try{
      let item = DataStore.renameItem(listId, itemId, name);
      res.status(200).json(item);
    } catch (err){
      res.status(404);
    }
  }

  public toggleItemCompletion (req: Req, res: Res, next?: Function) {
    let listId = parseInt(req.params.listId);
    let itemId = parseInt(req.params.itemId);
    try{
      let item = DataStore.toggleItemCompletion(listId, itemId);
      res.status(200).json(item);
    } catch (err){
      res.status(404);
    }

  }
}