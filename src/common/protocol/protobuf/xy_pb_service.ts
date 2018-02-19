// package: 
// file: xy.proto

import * as xy_pb from "./xy_pb";
export class CpuUsageService {
  static serviceName = "CpuUsageService";
}
export namespace CpuUsageService {
  export class fetchTree {
    static readonly methodName = "fetchTree";
    static readonly service = CpuUsageService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = xy_pb.TimeRequestFilter;
    static readonly responseType = xy_pb.TreeXYModelResponse;
  }
  export class fetchXY {
    static readonly methodName = "fetchXY";
    static readonly service = CpuUsageService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = xy_pb.SelectionTimeRequestFilter;
    static readonly responseType = xy_pb.XYModelResponse;
  }
}
export class TraceService {
  static serviceName = "TraceService";
}
export namespace TraceService {
  export class getTraces {
    static readonly methodName = "getTraces";
    static readonly service = TraceService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = xy_pb.EmptyParameters;
    static readonly responseType = xy_pb.Trace;
  }
  export class openTrace {
    static readonly methodName = "openTrace";
    static readonly service = TraceService;
    static readonly requestStream = false;
    static readonly responseStream = false;
    static readonly requestType = xy_pb.TraceParameters;
    static readonly responseType = xy_pb.Trace;
  }
}
