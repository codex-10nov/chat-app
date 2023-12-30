import { Response } from "express";

class ResponseServices {
    public createResponse(data: object | object[], res: Response) {
        return res.status(201).json({ success: true, data });
    }

    public updateResponse(data: object | object[], res: Response) {
        return res.status(200).json({ success: true });
    }

    public getResponse(data: object | object[], res: Response) {
        return res.status(200).json({ success: true, data });
    }

    public errorResponse(message: string | any = "Error! Something went wrong", statusCode: number = 500, res: Response) {
        return res.status(statusCode).json({ success: false, message });
    }
}

export default ResponseServices;
