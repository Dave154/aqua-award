 # AQUA Award Night Voting Landing Page

## Role
Act as an expert Next.js and frontend developer. 

## Task
Build a single-page voting application for a university department's "AQUA Award Night 2026". The application must use Next.js (App Router), Tailwind CSS, and the `react-paystack` library. 

## Technical Architecture & Constraints
*   **No External Database:** Do not include a backend server or database (like Supabase or Firebase).
*   **Vote Tracking Strategy:** All votes must be tracked purely using Paystack's `metadata.custom_fields`. The payment payload must capture and permanently store the selected "Category" and "Nominee".
*   **Currency:** Nigerian Naira (₦). Ensure the Paystack amount payload is correctly calculated in kobo (Amount * 100).
*   **Payment Flow:** Use the Paystack Inline popup via the `usePaystackPayment` hook from `react-paystack` so the user completes the transaction without leaving the landing page.

## UI/UX Design Requirements
*   **Theme:** Premium, elegant award-night aesthetic. Use a dark mode palette heavily featuring Black (`slate-950`), Gold gradients (`yellow-500` to `yellow-600`), and dark Teal (`teal-950/40`).
*   **Layout:** A single-column, centered, highly mobile-responsive card layout.
*   **Header:** Include text placeholders for "AQUA Award Night 2026", "July 3, 2026", and "Domfav Hotel".

## Functionality & Form Elements
1.  **Email Input:** A required string field for the voter's email address.
2.  **Category Dropdown:** A required `select` input displaying the award categories (e.g., "Mr NAFIS", "Miss NAFIS").
3.  **Nominee Dropdown:** A required, dynamic `select` input that populates its options based strictly on the selected Category. It should be hidden or disabled if no Category is selected.
4.  **Submit Button:** A prominent button displaying the vote price. It prevents default form submission and triggers the Paystack checkout popup.

## Paystack Payload Specifications
The `config` object for Paystack must strictly follow this structure:
- `email`: Tied to the email state.
- `amount`: Vote fee multiplied by 100.
- `publicKey`: `process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- `description`: \`AQUA Awards 2026 Vote: ${selectedCategory}\`
- `metadata.custom_fields`: An array containing exactly two objects. One for `Category` (passing the selected category state) and one for `Nominee` (passing the selected nominee state). Include `display_name`, `variable_name`, and `value` for both.

## Expected Output
Provide the complete, functional, code. Include a placeholder object for the categories and nominees, and write clean, modern React code with inline comments explaining the Paystack configuration logic.


# Categories

 ## Award Categories
Mr NAFIS

Miss NAFIS

Best Course Rep

Best Team Player

Most Famous

Most Handsome

Most Beautiful

Biggest Baller of the Department

Most Influential Girl

Most Creativity and Innovation Award

Best Artiste of the year
Most influential female

NAFIS ICON

## Special Recognition Awards
President Special Recognition Award

Vice President Special Recognition Award

General Secretary Special Recognition Award

Public Relations Officer (PRO) Special Recognition Award

Assistant General Secretary (AGS) Special Recognition Award

Financial Secretary Special Recognition Award

Sports Director Special Recognition Award

Social Director Special Recognition Award