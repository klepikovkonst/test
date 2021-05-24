export interface IRouteRespose<T>
{
    message: string;
    code: number;
    successful: boolean;
    payload: T;
}
