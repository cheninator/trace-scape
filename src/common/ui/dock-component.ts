/*
 * Copyright (C) 2017 École Polytechnique de Montréal
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { IComponent } from "./component";

export class DockComponent implements IComponent {
    
    get html(): string {
        return `            
            <h3><img src="https://avatars1.githubusercontent.com/u/7333024?s=200&v=4" width="25" height="25"> trace2</h3>
            <h3><img src="https://avatars1.githubusercontent.com/u/7333024?s=200&v=4" width="25" height="25"> kernel vm</h3>
            <h3><img src="https://avatars1.githubusercontent.com/u/7333024?s=200&v=4" width="25" height="25"> kernel</h3>
        `;
    }
    
    get name(): string {
        return 'dock';
    }

    get title(): string {
        return "Trace Explorer";
    }

    public show() {
        
    }
}
