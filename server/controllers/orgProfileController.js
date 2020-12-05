import express from "express";
import BaseController from "../utils/BaseController";
import { orgProService } from "../services/OrgProfileService";
import auth0Provider from "@bcwdev/auth0provider";
import { animalsService } from "../services/AnimalsService";

//NOTE Future Feature!

export class OrgProfileController extends BaseController {
  constructor() {
    super("api/org");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      //All calls below require bearer token
      .get("", this.getAll)
      .get("/:id", this.getOrgProfile)
      .post("", this.createOrg)
      .put("/:id", this.editOrg);
  }
//Makes a call to service to get all OrgProfiles (requries Bearer Token)
  async getAll(req, res, next) {
    try {
      let data = await orgProService.findAll(req.query);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
//Makes a call to service to retrieve OrgProfile by its Id (requires Bearer Token)
  async getOrgProfile(req, res, next) {
    try {
      let orgProfile = await orgProService.getOrgProfile(
        req.params.id,
        // @ts-ignore
        req.userInfo.email
      );
      res.send(orgProfile);
    } catch (error) {
      next(error);
    }
  }
//Makes a call to service to create a new OrgProfile (requries Bearer Token)
  async createOrg(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email;
      let data = await orgProService.createOrg(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
//Makes a call to service to Edit an OrgProfile Object (requires Bearer Token)
  async editOrg(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email.toLowerCase();
      let data = await orgProService.edit(
        req.params.id,
        req.body.creatorEmail,
        req.body
      );
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
