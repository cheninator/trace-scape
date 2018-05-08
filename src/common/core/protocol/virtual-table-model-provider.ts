/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { VirtualTableQueryFilter } from './../filter/virtual-table-query-filter';
import { VirtualTableModel } from './../model/virtual-table-model';
import { ModelResponse } from './model-response';
import { ITreeModelProvider } from './tree-model-provider';

export interface IVirtualTableModelProvider extends ITreeModelProvider {
    fetchLines(filter: VirtualTableQueryFilter): Promise<ModelResponse<VirtualTableModel>>;
}
