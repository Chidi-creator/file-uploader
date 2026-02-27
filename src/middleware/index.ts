import Middleware from "./middleware";
import express from "express";
import cors from "cors";
import { set } from "mongoose";
import authRoutes from "@routes/auth.route";
import uploadRoutes from "@routes/upload.route";

const middleware = new Middleware(express());

const setUpRoutes = (middleware: Middleware) =>{
    middleware.addMiddleware("/api/auth", authRoutes);
    middleware.addMiddleware("/api/upload", uploadRoutes);

}

const setUpMiddlewares = () => {
    middleware.addMiddleware(cors())
  middleware.addMiddleware(express.json());
  middleware.addMiddleware(express.urlencoded({ extended: true }));


  middleware.addMiddleware('/healthcheck', (req, res) => {
    res.send("file uploader api is running")
   
  }
  )
  setUpRoutes(middleware);
}

setUpMiddlewares()

export default middleware