import _ from "lodash";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const notFoundError = (name: string = "Entity") => (entity: any) => {

    if((entity)) return entity;

    const error = new Error(`${name} not found.`);

    (error as any).statusCode = 404;

    throw error;
}

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {

        const validationError = new Error();

        const resultArray = result.array();

        const resultMessage = _.map(resultArray, each => each.msg).join(' ');

        (validationError as any).message = `Validation Failed! Message: ${resultMessage}`;

        (validationError as any).statusCode = 400;

        throw validationError;

    }

    next();
}