export class Route
{
    uuid: string;
    address: string;
    mask: string;
    gateway: string;
    interface: string;

    constructor(item: {[field: string]: string} | IRoute)
    {
        this.uuid = item.uuid || '';
        this.address = item.address || '';
        this.mask = item.mask || '';
        this.gateway = item.gateway || '';
        this.interface = item.interface || '';
    }
}

export interface IRoute
{
    uuid: string;
    address: string;
    mask: string;
    gateway: string;
    interface: string;
}