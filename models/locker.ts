// locker.ts

/**
 * Represents a locker in the system.
 * This interface defines the structure of a locker document in the Firestore 'lockers' collection.
 */

/**
 * Comments on Data Model Choices...
 * 
 * lockerId: Unique identifier as the document ID allows direct access to locker information.
 * status: Key for determining availability; critical for booking logic and real-time status updates.
 * currentUserId: Associates the locker with the user who has booked it; null when unoccupied.
 * bookingStart & bookingEnd: Track booking periods, essential for managing bookings and calculating usage durations.
 * location: Provides context about where the locker is situated, improving user experience and operational logistics.
 */

export interface Locker {
    /**
     * A unique identifier for the locker.
     * This serves as the document ID in Firestore.
     */
    lockerId: string;
  
    /**
     * The current status of the locker.
     * Indicates whether the locker is available, occupied, or under maintenance.
     */
    status: 'available' | 'occupied' | 'maintenance';
  
    /**
     * The userId of the user who has currently booked the locker.
     * Null when the locker is available.
     */
    currentUserId: string | null;
  
    /**
     * The timestamp when the current booking started.
     * Null when the locker is available.
     */
    bookingStart: Date | null;
  
    /**
     * The timestamp when the current booking ended.
     * Null if the booking is ongoing.
     */
    bookingEnd: Date | null;
  
    /**
     * The physical location of the locker.
     * Useful for users to find the locker and for administrative purposes.
     */
    location: string;
  }
  