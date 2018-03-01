/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { Server } from './express-server';
import * as http from 'http';

let server = new Server();

let httpServer: http.Server;
httpServer = http.createServer(server.app);

httpServer.listen(server.port);

httpServer.on("error", (error: NodeJS.ErrnoException) => {
    if (error.syscall !== "listen") {
        throw error;
    }

    let bind = (typeof server.port === "string") ? "Pipe " + server.port : "Port " + server.port;

    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
});

httpServer.on("listening", () => {
    let addr = httpServer.address();
    let bind: string = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
});
