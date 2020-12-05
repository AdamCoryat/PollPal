import express from "express";
import BaseController from "../utils/BaseController";
import { animalsService } from "../services/AnimalsService.js";
import auth0Provider from "@bcwdev/auth0provider";

export class AnimalsController extends BaseController {
  constructor() {
    super("api/animals");
    this.router
      .get("", this.getAllAnimals)
      // NOTE: Beyond this point all routes require Authorization tokens (no restrictions)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.editAnimal)
      .delete("/:id", this.deleteAnimal);
  }
  // Makes a call through to the Service to get all animals (requires bearer token)
  async getAllAnimals(req, res, next) {
    try {
      let data = await animalsService.findAll(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // Makes a call to to the Service to reterive an object by its id (requires bearer token)
  async getById(req, res, next) {
    try {
      let data = await animalsService.findById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // Makes a call to the Service to edit an animal object (requires bearer token)
  async editAnimal(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      let data = await animalsService.edit(
        req.params.id,
        req.body.creatorEmail,
        req.body
      );
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
// Makes a call to the Service to create a new Animal Object (requires bearer token)
  async create(req, res, next) {
    try {
      if (req.body == []) {
        let data = await animalsService.createMany(req.body);
        return res.status(201).send(data);
      }
      let data = await animalsService.create(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
// Makes a call to the Service to delete an Animal Object by its Id (requires bearer token)
  async deleteAnimal(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      await animalsService.deleteById(req.params.id, req.body.creatorEmail);
      return res.send("Successfully Deleted!");
    } catch (error) {
      next(error);
    }
  }
}
