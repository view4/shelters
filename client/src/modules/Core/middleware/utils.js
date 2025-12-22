/**
 * REST API Client Utilities
 * 
 * Usage Examples:
 * 
 * Import the client:
 *   import { restClient } from 'modules/Core/middleware'
 * 
 * GET request:
 *   const data = await restClient.get('/api/users', { page: 1, limit: 10 })
 * 
 * POST request:
 *   const result = await restClient.post('/api/users', { name: 'John', email: 'john@example.com' })
 * 
 * PUT request:
 *   const updated = await restClient.put('/api/users/123', { name: 'Jane' })
 * 
 * DELETE request:
 *   await restClient.delete('/api/users/123')
 * 
 * PATCH request:
 *   const patched = await restClient.patch('/api/users/123', { status: 'active' })
 * 
 * With custom headers:
 *   const data = await restClient.get('/api/data', {}, { headers: { 'X-Custom': 'value' } })
 * 
 * Update auth token:
 *   restClient.setAuthToken('new-token-here')
 */

import config from "../config/index.js";
import { getToken } from '../utils/auth.js';

const { backendUrl } = config;

/**
 * REST API Client for making HTTP requests
 */
class RestClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = getToken();
    }

    /**
     * Set authentication token
     */
    setAuthToken(token) {
        this.token = token;
    }

    /**
     * Get default headers
     */
    getHeaders(customHeaders = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders
        };

        if (this.token) {
            headers['authorization'] = `Bearer ${this.token}`;
        }

        return headers;
    }

    /**
     * Make HTTP request
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            ...options,
            headers: this.getHeaders(options.headers)
        };

        try {
            const response = await fetch(url, config);

            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                throw {
                    status: response.status,
                    statusText: response.statusText,
                    data
                };
            }

            return data;
        } catch (error) {
            console.error('REST API Error:', error);
            throw error;
        }
    }

    /**
     * GET request
     */
    async get(endpoint, params = {}, options = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;

        return this.request(url, {
            method: 'GET',
            ...options
        });
    }

    /**
     * POST request
     */
    async post(endpoint, data = {}, options = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options
        });
    }

    /**
     * PUT request
     */
    async put(endpoint, data = {}, options = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            ...options
        });
    }

    /**
     * DELETE request
     */
    async delete(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'DELETE',
            ...options
        });
    }

    /**
     * PATCH request
     */
    async patch(endpoint, data = {}, options = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
            ...options
        });
    }

    /**
     * Check if client has authentication token
     */
    get hasToken() {
        return Boolean(this.token);
    }
}

// Export singleton instance
export const restClient = new RestClient(backendUrl);

// Export class for custom instances
export { RestClient };

