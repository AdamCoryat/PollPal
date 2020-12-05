import express from "express";
import { favoritesService } from "../services/FavoritesService.js";

export class FavoritesController {
  constructor() {
    this.router = express.Router();
    // api/profile/favorites
    this.router
      .get("", this.getAllfavorites)
      .post("", this.addToFav)
      .delete("/:id", this.removeFav);
  }
  // Makes a call to service to retrieve all the animals that are linked to that profile
  async getAllfavorites(req, res, next) {
    try {
      let data = await favoritesService.findAll({
        creatorEmail: req.userInfo.email,
      });
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
// Makes a call to service to create many to many relationship
  async addToFav(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      let data = await favoritesService.addFav(req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
// Makes a call to service to delete the many to many relationship
  async removeFav(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      await favoritesService.remove(req.params.id, req.body.creatorEmail);
      return res.send("Successfully Removed Favorite");
    } catch (error) {
      next(error);
    }
  }
}
