export class UserAux {
    public title: string;
    public currentId: any;
    public action: string;
    public breadcrumb: { title: string, url: string }[];
    public list = [
        { action: 'new', active: true },
        { action: 'edit' },
        { action: 'show' },
        { action: 'delete' }
    ];
    public new = [
        { action: 'list', active: true }
    ];
    public edit = [
        { action: 'list', active: true },
        { action: 'new', active: true },
        { action: 'show' }
    ];
    public show = [
        { action: 'list', active: true },
        { action: 'new', active: true },
        { action: 'edit' },
        { action: 'delete' }
    ];

    constructor() {
        this.title = "workers";
    }
}