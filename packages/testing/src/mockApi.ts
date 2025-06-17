// Mock API utility for testing
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Types for mock API handlers
type MockApiMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

interface MockApiOptions {
  method?: MockApiMethod;
  status?: number;
  delay?: number;
  once?: boolean;
}

// Default options
const defaultOptions: MockApiOptions = {
  method: 'get',
  status: 200,
  delay: 0,
  once: false,
};

/**
 * Creates a mock API handler for MSW
 * @param url The URL to mock
 * @param responseData The response data to return
 * @param options Options for the mock
 */
export const createMockHandler = (
  url: string,
  responseData: any,
  options: MockApiOptions = {}
) => {
  const { method, status, delay, once } = { ...defaultOptions, ...options };
  
  const handler = rest[method](url, (req, res, ctx) => {
    const response = res(
      ctx.status(status),
      ctx.json(responseData),
      delay ? ctx.delay(delay) : ctx.delay(0)
    );
    
    return response;
  });
  
  return once ? handler.once() : handler;
};

/**
 * Creates a mock API server with the provided handlers
 * @param handlers The MSW handlers to use
 */
export const createMockServer = (handlers: any[] = []) => {
  const server = setupServer(...handlers);
  
  // Start the server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  
  // Reset handlers after each test
  afterEach(() => server.resetHandlers());
  
  // Close the server after all tests
  afterAll(() => server.close());
  
  return server;
};

/**
 * Creates a mock API error handler
 * @param url The URL to mock
 * @param status The HTTP status code
 * @param errorData The error data to return
 * @param options Options for the mock
 */
export const createMockErrorHandler = (
  url: string,
  status: number = 500,
  errorData: any = { message: 'Server error' },
  options: Omit<MockApiOptions, 'status'> = {}
) => {
  return createMockHandler(url, errorData, { ...options, status });
};

/**
 * Creates a mock API response for testing
 * @param data The response data
 * @param meta Any metadata to include
 */
export const createMockResponse = <T>(data: T, meta: any = {}) => {
  return {
    data,
    meta,
    success: true,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Creates a mock API error response for testing
 * @param message The error message
 * @param code The error code
 * @param details Any additional error details
 */
export const createMockErrorResponse = (
  message: string = 'An error occurred',
  code: string = 'INTERNAL_SERVER_ERROR',
  details: any = {}
) => {
  return {
    error: {
      message,
      code,
      details,
    },
    success: false,
    timestamp: new Date().toISOString(),
  };
}; 