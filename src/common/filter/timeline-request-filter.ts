import { BaseRequestFilter } from "./base-request-filter";

export interface TimelineRequestFilter extends BaseRequestFilter{
    entries: Array<number>;
}
