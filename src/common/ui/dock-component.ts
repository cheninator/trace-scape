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