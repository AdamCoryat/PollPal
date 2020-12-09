import express from "express";
import Startup from "./Startup";
import DbContext from "./db/DbConfig";

//create server & socketServer
const app = express();
const port = process.env.PORT || 3000;

//Connect to Atlas MongoDB
DbContext.connect();

