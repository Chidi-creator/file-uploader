import Middleware from "./middleware";
import express from "express";
import cors from "cors";
import { set } from "mongoose";

const middleware = new Middleware(express());

const setUpMiddlewares = () => {
    middleware.addMiddleware(cors())
  middleware.addMiddleware(express.json());
  middleware.addMiddleware(express.urlencoded({ extended: true }));


  middleware.addMiddleware('/healthcheck', (req, res) => {
    res.send("file uploader api is running")
   
  }
  )
}

setUpMiddlewares()

export default middleware