# TraceScape

TraceScape is a trace visualization tool built with web technologies. It queries a REST API where the specification is available at https://theia-ide.github.io/trace-server-protocol/. At the moment, TraceScape is using TraceCompass as the backend but any server that exposes the REST API can be used instead.

![alt text](https://raw.github.com/cheninator/trace-scape/master/docs/trace-scape.png)

# Prerequisites
- Node.js 8 (for Ubuntu):
```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- The trace server must be executed before the client:

If you have installed docker, you can start the server with the following command:
```bash
cd server/
docker build -t trace-server .
docker run -p 8080:8080 -d trace-server
```

Otherwise:
```bash
cd server/tracecompass
./tracecompass-server
```

# Quick start
```bash
git clone https://github.com/cheninator/trace-scape
cd trace-scape/
npm install && npm start
```

# Docker

TraceScape can be run as a Docker container. To avoid using `sudo`, add the current user to the docker group:

```bash
sudo usermod -a -G docker $USER
```

Building TraceScape from the Docker file by using the following commands:

```bash
docker build -t trace-scape .
docker run -p 3000:3000 -d trace-scape
```

You can then access the trace-scape application on your browser by going to http://localhost:3000