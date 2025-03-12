export interface Meta {
    page?: number;
    limit?: number;
    total?: number;
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    statusCode: number;
    data: T | null;
    meta?: Meta;
    message?: string;
    errors?: { [key: string]: string[] };
}
