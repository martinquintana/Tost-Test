import { GenericResponse } from "./response";

export interface ApiResponse <T> {
    success: boolean;
    response: GenericResponse <T>;
}