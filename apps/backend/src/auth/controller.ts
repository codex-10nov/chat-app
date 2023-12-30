import { Request, Response, NextFunction } from "express";

import UserServices from "../services/user";
import ResponseServices from "../responses";

import { generateAPIKey } from "../services/auth";
import { notFoundError, validateRequest } from "../services/common";
import { Schema } from "mongoose";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  
  const responseService = new ResponseServices();

  try {

    validateRequest(req,res,next);

    const userServices = new UserServices();

    const body = req.body;

    const user: any = await userServices.findUserByUsername((body.username as string)).then(notFoundError("User"));

    const checkPassword = await user.comparePassword(body.password);

    if (!checkPassword) throw new Error("Invalid password");

    const api_key = generateAPIKey(user);

    if (!api_key || api_key === '') throw new Error("Error while generating api key.");

    return responseService.getResponse({ x_api_key: api_key }, res);

  } catch (error: any) {

    responseService.errorResponse(error.message, error.statusCode, res);
    next(error);
    
  }
};

export const signup = async (req: Request, res: Response, next: NextFunction) => {

    const responseService = new ResponseServices();

    try {

      validateRequest(req,res,next);
      
      const userServices = new UserServices();

      const user = await userServices.create(req.body);

      const api_key = generateAPIKey((user as any));

      return responseService.createResponse({ x_api_key: api_key }, res);

    } catch (error: any) {
      
      responseService.errorResponse(error.message, error.statusCode, res);
      next(error);

    }
}
 