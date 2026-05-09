/**
 * API client for application authentication and data operations.
 *
 * Provides a simple, localStorage-based authentication implementation
 * without external SDK dependencies.
 */

export const apiClient = {
  auth: {
    /**
     * Check if a user is currently authenticated.
     *
     * :return: User object if authenticated
     * :rtype: Promise<Object>
     * :raises: Error if no user is authenticated
     */
    me: async () => {
      const user = localStorage.getItem('app_user');
      if (!user) {
        throw new Error('No user authenticated');
      }
      return JSON.parse(user);
    },

    /**
     * Log out the current user and clear authentication data.
     *
     * Removes user and token from localStorage.
     */
    logout: () => {
      localStorage.removeItem('app_user');
      localStorage.removeItem('app_token');
    },
  },
};
