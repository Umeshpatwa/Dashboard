/**
 * API Service for handling all backend communication
 */

const API_BASE_URL = '/api'; // This will be proxied to http://localhost:5000/api

/**
 * Generic API request function
 * @param {string} endpoint - API endpoint (e.g., '/stats')
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - Response data
 */
const apiRequest = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Merge default headers with any provided headers
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API request failed with status ${response.status}`
      );
    }

    // For DELETE requests that might not return content
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API methods
export const statsAPI = {
  /**
   * Test the backend connection
   * @returns {Promise<Object>} Test response
   */
  testConnection: async () => {
    return apiRequest('/test');
  },

  /**
   * Get user statistics
   * @returns {Promise<Object>} User statistics
   */
  getUserStats: async () => {
    const response = await apiRequest('/stats');
    
    // If the response has a success flag and data, return the data
    if (response && response.success && response.data) {
      return response.data;
    }
    
    // If there's an error in the response, throw it
    if (response && !response.success) {
      throw new Error(response.message || 'Failed to fetch statistics');
    }
    
    // Fallback for unexpected response format
    return response;
  },

  // Add more API methods here as needed
};

export default {
  ...statsAPI,
  // Export other API modules here
};
