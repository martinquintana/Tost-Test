export interface GenericResponse <T> { 
    current_page: number;
    data: T[];
}