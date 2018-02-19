// package: 
// file: xy.proto

import * as jspb from "google-protobuf";

export class TimeRequestFilter extends jspb.Message {
  getStart(): number;
  setStart(value: number): void;

  getEnd(): number;
  setEnd(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimeRequestFilter.AsObject;
  static toObject(includeInstance: boolean, msg: TimeRequestFilter): TimeRequestFilter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TimeRequestFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimeRequestFilter;
  static deserializeBinaryFromReader(message: TimeRequestFilter, reader: jspb.BinaryReader): TimeRequestFilter;
}

export namespace TimeRequestFilter {
  export type AsObject = {
    start: number,
    end: number,
    count: number,
  }
}

export class SelectionTimeRequestFilter extends jspb.Message {
  getStart(): number;
  setStart(value: number): void;

  getEnd(): number;
  setEnd(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  clearItemsList(): void;
  getItemsList(): Array<number>;
  setItemsList(value: Array<number>): void;
  addItems(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SelectionTimeRequestFilter.AsObject;
  static toObject(includeInstance: boolean, msg: SelectionTimeRequestFilter): SelectionTimeRequestFilter.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SelectionTimeRequestFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SelectionTimeRequestFilter;
  static deserializeBinaryFromReader(message: SelectionTimeRequestFilter, reader: jspb.BinaryReader): SelectionTimeRequestFilter;
}

export namespace SelectionTimeRequestFilter {
  export type AsObject = {
    start: number,
    end: number,
    count: number,
    itemsList: Array<number>,
  }
}

export class XYSeries extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  clearXList(): void;
  getXList(): Array<number>;
  setXList(value: Array<number>): void;
  addX(value: number, index?: number): number;

  clearYList(): void;
  getYList(): Array<number>;
  setYList(value: Array<number>): void;
  addY(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): XYSeries.AsObject;
  static toObject(includeInstance: boolean, msg: XYSeries): XYSeries.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: XYSeries, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): XYSeries;
  static deserializeBinaryFromReader(message: XYSeries, reader: jspb.BinaryReader): XYSeries;
}

export namespace XYSeries {
  export type AsObject = {
    name: string,
    xList: Array<number>,
    yList: Array<number>,
  }
}

export class XYModelResponse extends jspb.Message {
  clearModelList(): void;
  getModelList(): Array<XYSeries>;
  setModelList(value: Array<XYSeries>): void;
  addModel(value?: XYSeries, index?: number): XYSeries;

  getStatus(): string;
  setStatus(value: string): void;

  getStatusmessage(): string;
  setStatusmessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): XYModelResponse.AsObject;
  static toObject(includeInstance: boolean, msg: XYModelResponse): XYModelResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: XYModelResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): XYModelResponse;
  static deserializeBinaryFromReader(message: XYModelResponse, reader: jspb.BinaryReader): XYModelResponse;
}

export namespace XYModelResponse {
  export type AsObject = {
    modelList: Array<XYSeries.AsObject>,
    status: string,
    statusmessage: string,
  }
}

export class XYTree extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getParentid(): number;
  setParentid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): XYTree.AsObject;
  static toObject(includeInstance: boolean, msg: XYTree): XYTree.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: XYTree, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): XYTree;
  static deserializeBinaryFromReader(message: XYTree, reader: jspb.BinaryReader): XYTree;
}

export namespace XYTree {
  export type AsObject = {
    id: number,
    parentid: number,
  }
}

export class TreeXYModelResponse extends jspb.Message {
  clearModelList(): void;
  getModelList(): Array<XYTree>;
  setModelList(value: Array<XYTree>): void;
  addModel(value?: XYTree, index?: number): XYTree;

  getStatus(): string;
  setStatus(value: string): void;

  getStatusmessage(): string;
  setStatusmessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TreeXYModelResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TreeXYModelResponse): TreeXYModelResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TreeXYModelResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TreeXYModelResponse;
  static deserializeBinaryFromReader(message: TreeXYModelResponse, reader: jspb.BinaryReader): TreeXYModelResponse;
}

export namespace TreeXYModelResponse {
  export type AsObject = {
    modelList: Array<XYTree.AsObject>,
    status: string,
    statusmessage: string,
  }
}

export class ProtoTrace extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getStart(): number;
  setStart(value: number): void;

  getEnd(): number;
  setEnd(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProtoTrace.AsObject;
  static toObject(includeInstance: boolean, msg: ProtoTrace): ProtoTrace.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ProtoTrace, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProtoTrace;
  static deserializeBinaryFromReader(message: ProtoTrace, reader: jspb.BinaryReader): ProtoTrace;
}

export namespace ProtoTrace {
  export type AsObject = {
    id: string,
    name: string,
    start: number,
    end: number,
  }
}

export class EmptyParameters extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyParameters.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyParameters): EmptyParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmptyParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyParameters;
  static deserializeBinaryFromReader(message: EmptyParameters, reader: jspb.BinaryReader): EmptyParameters;
}

export namespace EmptyParameters {
  export type AsObject = {
  }
}

export class TraceParameters extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getPath(): string;
  setPath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TraceParameters.AsObject;
  static toObject(includeInstance: boolean, msg: TraceParameters): TraceParameters.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TraceParameters, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TraceParameters;
  static deserializeBinaryFromReader(message: TraceParameters, reader: jspb.BinaryReader): TraceParameters;
}

export namespace TraceParameters {
  export type AsObject = {
    name: string,
    path: string,
  }
}

