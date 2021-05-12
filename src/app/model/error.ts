export interface ErrorLogin {
    code: string;
    data: object;
    details: string;
    message: string;
    validationErrors: Data[];
}
export interface Data{
    message: string;
    member: string;
}
