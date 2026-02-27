export interface DefaultResponse{
    success: boolean,
    data: Array<any> | object,
    message: string,
    errors?: string | Array<any> | object,
    statusCode: number
}

export type ErrorResponse = Omit<DefaultResponse, "data">   
export type SuccessResponse = Omit<DefaultResponse, "errors">   