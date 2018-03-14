/*
 * Copyright (C) 2018 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ModelResponse } from './model-response';
import { VirtualTableQueryFilter } from './../filter/virtual-table-query-filter';
import { VirtualTableModel } from './../model/virtual-table-model';

export interface IVirtualTableModelProvider {
    fetch(filter: VirtualTableQueryFilter): Promise<ModelResponse<VirtualTableModel>>;
}
