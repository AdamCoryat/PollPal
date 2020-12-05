import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { FavoritesController } from "./FavoritesController";

export class ProfilesController extends BaseController {
  constructor() {
    super("api/profile");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      //Requires Bearer Token beyond this point
      .get("", this.getUserProfile)
      .put("/:id", this.edit)
      .use("/favorites", new FavoritesController().router)
  }
  //Makes a call to service to get a profile object by userinfo(requires Bearer Token)
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  //Makes a call to service to edit a profile object
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      let data = await profilesService.updateProfile(req.userInfo, req.body)
      res.send(data)
    } catch (error) {
      next(error);
    }
  }
//NOTE future feature
//Makes a call to service to add a Org to a Profile Object
  async giveOrg(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      let data = await profilesService.updateOrg(req.userInfo, req.body)
      res.send(data)
    } catch (error) {
      next(error);
    }
  }
//Makes a call to service to create a Fav realationship with an Animal Object
  async addFav(req, res, next) {
    try {
      req.body.creatorId = req.user.email
    } catch (error) {
      next(error)
    }
  }
}
