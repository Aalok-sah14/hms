#  Hotel Management System (HMS)

A complete management solution designed to handle guest lifecycles, tiered room inventory, and ancillary service billing.

---

##  Phase 1: Core Foundation & Identity
*Focus: Security, Detailed Guest KYC, and Room Inventory.*

*   **Authentication:** Secure **Login/Logout** functionality for administrative and front-desk staff.
*   **Comprehensive Guest Profiles:** 
    *   Personal Details: Name, Address, Phone Number.
    *   Verification: **Photo of ID** upload and storage.
    *   Demographics: **Date of Birth (DOB)** and automatic **Age** calculation.
*   **Room Inventory Management:** 
    *   **Bed Types:** Single Bed, Double Bed, Family Room.
    *   **Classes:** Standard, Deluxe, Premium.
    *   **Identification:** Management by specific **Room Numbers**.

##  Phase 2: Operations & Reservation Engine
*Focus: Check-in workflows, Availability tracking, and Scheduling.*

*   **Availability Dashboard:** Real-time tracking of **Occupied Rooms** vs. Available rooms.
*   **Reservation Logic:** 
    *   Precise **Date & Time** logging for all bookings.
    *   Automatic calculation of **Stay Duration** (How many days occupied).
*   **Front Desk Workflow:** Simplified **Check-in and Check-out** modules.
*   **Dynamic Pricing:** Automatic calculation of **Room Price** based on room category and length of stay.

##  Phase 3: Service Ecosystem & UX
*Focus: Extra billing, User Experience, and Final Settlement.*

*   **Extra Billing (Add-on Services):** Integrated POS for non-room expenses:
    *   ??? **Food & Beverages**
    *   ?? **Laundry Services**
    *   ?? **Drinks & Minibar**
*   **User Experience (UX):**
    *   Intuitive, clean interface for fast data entry.
    *   Visual indicators (Color coding) for room statuses.
    *   Responsive design for use on tablets and desktops.
   *  Consolidated Invoicing: One-click generation of total bills including room rates and extra services.



##  Technical Overview
*   Data Models: Guests, Rooms, Bookings, and Service Charges.
*   Validation:  Age-gate checks and ID verification triggers.
*   Billing Logic: `(Room Rate * Days) + S(Extra Services) = Total`.

