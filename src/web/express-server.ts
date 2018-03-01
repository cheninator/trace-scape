/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as http from 'http';

import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as path from 'path';
import * as cors from 'cors';

import { IRoutes, Routes } from './routes';

/*
 * Defines a server web application.
 * Encapsulates an Express application, configure middlewares, routes, errors, etc.
 */
export class Server {

    private readonly port_: number | string | boolean;
    private readonly apiRoutes_: IRoutes;
    private readonly internalError = 500;

    private httpServer_: http.Server;
    private express_: express.Application;

    constructor() {
        this.port_ = this.normalizePort(process.env.PORT || "3000");
        this.apiRoutes_ = new Routes();
        this.init();
    }

    get app(): express.Application {
        return this.express_;
    }

    get port(): number | string | boolean {
        return this.port_;
    }

    private init(): void {
        this.express_ = express();
        this.configureMiddlewares();
        this.configureRoutes();
    }

    private configureMiddlewares() {
        this.express_.use(logger("dev"));
        this.express_.use(bodyParser.json());
        this.express_.use(bodyParser.urlencoded({ extended: true }));
        this.express_.use(cookieParser());
        this.express_.use(express.static(path.join(__dirname, "../../")));
        this.express_.use(cors());
    }

    private configureRoutes() {
        const router = express.Router();
        router.use(this.apiRoutes_.routes);
        this.express_.use(router);
        this.errorHandeling();
    }

    private errorHandeling(): void {
        this.express_.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
            const err: Error = new Error("Not Found");
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.express_.get("env") === "development") {
            // tslint:disable-next-line:no-any
            this.express_.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
                res.status(err.status || this.internalError);
                res.send({
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user (in production env only)
        // tslint:disable-next-line:no-any
        this.express_.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            res.status(err.status || this.internalError);
            res.send({
                message: err.message,
                error: {}
            });
        });
    }

    private normalizePort(val: number | string): number | string | boolean {
        let port = (typeof val === "string") ? parseInt(val, 10) : val;
        if (isNaN(port)) {
            return val;
        }
        else if (port >= 0) {
            return port;
        }
        else {
            return false;
        }
    }
}
