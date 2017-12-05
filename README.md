# TracEscape

TracEscape is a trace visualization tool built with web technologies. It queries a REST API where the specification is available at https://git.eclipse.org/r/#/c/103719/. For the moment, TracEscape is using TraceCompass as the backend but any server that exposes the REST API can be used instead.

# Prerequisites
- Node.js 6

https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
- A server that expose the REST API. TraceCompass Incubator project offers an implementation of the REST API. You can find it at https://git.eclipse.org/r/#/admin/projects/tracecompass.incubator/org.eclipse.tracecompass.incubator

# Quick start
```bash
git clone https://github.com/cheninator/trace-scape
cd trace-scape/
npm install && npm start
```
