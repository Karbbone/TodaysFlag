/**
 * Interface defining the structure of an API response
 * @interface ApiResponse
 * @template T - The type of data included in the response
 * @property {boolean} success - Whether the request was successful
 * @property {string} message - A message describing the result
 * @property {T} [data] - Optional data returned with the response
 */
export interface ApiResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * Service for handling HTTP responses in a standardized way
 * @class ResponseService
 * @description Provides methods to create consistent HTTP responses for the API
 */
export class ResponseService {
  /**
   * Creates a successful HTTP response
   * @static
   * @template T - The type of data to include in the response
   * @param {string} message - Success message
   * @param {T} [data] - Optional data to include in the response
   * @returns {Response} A formatted HTTP response with status 200
   * @example
   * ResponseService.success("Operation successful", { id: 1, name: "Test" });
   */
  public static success<T = void>(message: string, data?: T): Response {
    return new Response(
      JSON.stringify({
        success: true,
        message,
        data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * Creates an error HTTP response
   * @static
   * @param {string} message - Error message
   * @param {number} [status=404] - HTTP status code (defaults to 404)
   * @returns {Response} A formatted HTTP error response
   * @example
   * ResponseService.error("Resource not found", 404);
   */
  public static error(message: string, status: number = 404): Response {
    return new Response(
      JSON.stringify({
        success: false,
        message,
      }),
      {
        status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  /**
   * Formate une réponse de succès avec des données
   */
  public static formatSuccessResponse<T>(
    message: string,
    data: T
  ): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
    };
  }

  /**
   * Formate une réponse d'erreur
   */
  public static formatErrorResponse(message: string): ApiResponse {
    return {
      success: false,
      message,
    };
  }
}
