/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Router, Request, Response, NextFunction } from 'express';
import * as path from 'path';
/*
 * Defines API routes for the web application
 */
export interface IRoutes {
    readonly routes: Router;
}

export class Routes implements IRoutes {

    get routes(): Router {
        let router: Router = Router();

        /* Define path and services here */
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.sendFile(path.resolve(__dirname + "../../../index.html"));
        });

        return router;
    }
}
