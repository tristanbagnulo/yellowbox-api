// user.ts

/**
 * Represents a user profile in the system.
 * This interface defines the structure of a user document in the Firestore 'users' collection.
 */

/**
 * Comments on Data Model Choices...
 * 
 * userId: Using a unique identifier as the document ID allows for efficient retrieval and management of user profiles.
 * email: Essential for identifying users and potentially for communication or recovery processes.
 * apiTokenHash: Storing the API token as a hash ensures that sensitive information is not exposed, enhancing security.
 * createdAt: Timestamp helps in tracking when the account was created, useful for auditing.
 * status: Enables the system to easily activate or deactivate user accounts without deleting them.
 * lastLogin: Optional field that can provide insights into user engagement and can be used for security monitoring.
 */

export interface UserProfile {
    /**
     * A unique identifier for the user.
     * This serves as the document ID in Firestore.
     */
    userId: string;
  
    /**
     * The user's email address.
     */
    email: string;
  
    /**
     * The hashed API token used for authenticating API requests.
     * Storing the token as a hash enhances security by preventing token leakage.
     */
    apiTokenHash: string;
  
    /**
     * The timestamp when the user account was created.
     * Useful for auditing and account management.
     */
    createdAt: Date;
  
    /**
     * The current status of the user account.
     * For example: 'active', 'inactive'.
     * Allows for easy account control and management.
     */
    status: 'active' | 'inactive';
  
    /**
     * The timestamp of the user's last login.
     * Optional field that can be used for tracking user activity.
     */
    lastLogin?: Date;
  }



  