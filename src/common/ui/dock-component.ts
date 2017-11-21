import { IComponent } from "./component";

export class DockComponent implements IComponent {
    
    get html(): string {
        return `            
            <h2><img src="https://avatars1.githubusercontent.com/u/7333024?s=200&v=4" width="30" height="30"> trace2</h2>
            <h2><img src="https://avatars1.githubusercontent.com/u/7333024?s=200&v=4" width="30" height="30"> kernel vm</h2>
            <h2><img src="https://avatars1.githubusercontent.com/u/7333024?s=200&v=4" width="30" height="30"> kernel</h2>
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