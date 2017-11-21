import { BaseRequestFilter } from './base-request-filter';

export interface XYRequestFilter extends BaseRequestFilter {
    ids: Array<number>;
}
