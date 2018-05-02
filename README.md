# TraceScape

TraceScape is a trace visualization tool built with web technologies. It queries a REST API where the specification is available at https://theia-ide.github.io/trace-server-protocol/. At the moment, TraceScape is using TraceCompass as the backend but any server that exposes the REST API can be used instead.

![alt text](https://raw.github.com/cheninator/trace-scape/master/docs/trace-scape.png)

# Prerequisites
- Node.js 8 (for Ubuntu):
```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- A server that expose the REST API. TraceCompass Incubator project offers an implementation of the REST API. You can find it at https://git.eclipse.org/r/#/admin/projects/tracecompass.incubator/org.eclipse.tracecompass.incubator

- You must change the path of the traces. At the moment, it is hardcoded in `src/common/app.ts`

# Quick start
```bash
git clone https://github.com/cheninator/trace-scape
cd trace-scape/
npm install && npm start
```
