# Trace analysis server protocol specifications

The trace analysis server protocol is used between a trace viewer (client) and a trace analysis library (the server) to show high level analysis of a trace like
the disks I/O activity, the CPU usage, the callstack, etc. This document is a RESTful API specification of the protocol. This is only a quick view of endpoints
and a descrition of them. For more informations about parameters, return objects, errors, please see .

# Endpoints to handle traces

A trace is simply a collection of events.

> `GET /traces`
>
> Get the list of traces available on the server

> `POST /traces/`
>
> Upload a trace to the server

> `GET /traces/{traceID­}`
>
> Get informations about a specific trace on the server

> `DELETE /traces/{traceID­}`
> 
> Remove a trace from the server

# Endpoints to handle projects

A project contains one or many traces

> `GET /projects`
> 
> Get the list of projects available on the server

> `PUT /projects`
> 
> Create a project on the server

> `GET /projects/{projectID}`
> 
> Get informations about a specific project such as traces, creation date, etc.

> `DELETE /projects/{projectID}`
> 
> Remove a project from the server

> `PUT /projects/{projectID}/{traceID}`
> 
> Add a trace to a project

# Endpoints to handle xy

Following endpoints are used to retrieve xy ressources on the server

> `GET /projects/{projectID}/xy`
> 
> Get the list of all outputs that gives an XY model. For example, an output could be **cpu-usage** or **disks-activity**

> `GET /projects/{projectID}/xy/{outputID}/entries`
> 
> Get the entries of a specific output. Typically, entries are informations that can be shown either as a tree or a data table.

> `GET /projects/{projectID}/xy/{outputID}/chart`
> 
> Get the XY data chart

> `GET /projects/{projectID}/xy/{outputID}/presentation`
> 
> Get the presentation provider for a specific output. Presentation provider contains informations about colors, styles, etc.

> `POST /projects/{projectID}/xy/{outputID}/presentation`
> 
> If client offers to customize the presentation provider, this endpoint is used to push modifications to the server

> `GET /projects/{projectID}/xy/{outputID}/tooltip`
> 
> Get the tooltip provider for a specific output.

# Endpoints to handle timelines

Following endpoints are used to retrieve timeline ressources on the server

> `GET /projects/{projectID}/timelines`
> 
> Get the list of all outputs that gives a timeline model. For example, an output could be **control-flow* or **callstack**

> `GET /projects/{projectID}/timelines/{outputID}/entries`
> 
> Get the entries of a specific output. Typically, entries are informations that can be shown either as a tree or a data table.

> `GET /projects/{projectID}/timelines/{outputID}/chart`
> 
> Get the timeline data chart

> `GET /projects/{projectID}/timelines/{outputID}/arrow-series`
> 
> Get the list of arrows available

> `GET /projects/{projectID}/timelines/{outputID}/arrow-series/{arrowID}`
> 
> Get the data of an arrow series

> `GET /projects/{projectID}/timelines/{outputID}/arrow-series/{arrowID}/presentation`
> 
> Get the presentation provider of an arrow series

> `POST /projects/{projectID}/timelines/{outputID}/arrow-series/{arrowID}/presentation`
> 
> If client offers to customize the presentation provider, this endpoint is used to push modifications to the server

> `GET /projects/{projectID}/timelines/{outputID}/presentation`
> 
> Get the presentation provider for a specific output. Presentation provider contains informations about colors, styles, etc.

> `POST /projects/{projectID}/timelines/{outputID}/presentation`
> 
> If client offers to customize the presentation provider, this endpoint is used to push modifications to the server

> `GET /projects/{projectID}/timelines/{outputID}/tooltip`
> 
> Get the tooltip provider for a specific output.

# Endpoints to data tables

Following endpoints are used to retrieve data table ressources on the server

> `GET /projects/{projectID}/data-tables`
>
> Get the list of all outputs that gives a data table model. For example, an output could be **events-table**

> `GET /projects/{projectID}/data-tables/{dataTableID}`
>
> Get the data table data