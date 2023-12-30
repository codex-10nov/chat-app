import { Request, Response, NextFunction } from "express";

class Logger {
    private logColors = {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
    };

    public apiLogs = (req: Request, res: Response, next: NextFunction) => {
        const color = this.logColors.green; // Choose the color you want

        console.log(
            `[${color}${new Date().toISOString()}${this.logColors.reset}] ${color}${req.method}${this.logColors.reset} ${req.url}`
        );

        next();
    }

    public errorLogs = (error: Error, req: Request, res: Response, next: NextFunction) => {
        
        const color = this.logColors.red; // Choose the color you want

        console.error(
            `[${color}${new Date().toISOString()}${this.logColors.reset}] ${color}${req.method} ${req.url} ${color}Error: ${error.message}${this.logColors.reset}`
        );

        next(error);
    }
}

export default Logger;
