# ON GUARD 24/7 – Website


-----
**Overview**

We have created a website for **ON GUARD 24/7**, which provides professional security services for Residential Security, Site Security, and Event Security. The website showcases these services, highlights past projects through a portfolio, and allows clients to get in touch through a contact form. There is also a login system for users to access personalized content and manage their services.

**Features**

**1. Home Page (Home.html)**

- **Main Features**: An overview of ON GUARD 24/7’s services, including Residential, Site, and Event Security. The page includes sections like "Who We Are" and "Why Choose Us" to introduce the company's mission and highlight advantages.
- **Navigation**: Includes a responsive navigation bar with links to **Services**, **Portfolio**, and **Contact** pages, plus a **Login** option. The mobile version uses a JavaScript-driven hamburger menu for accessibility.

**2. Services Page (services.html)**

- **Residential Security**: Offers access control, regular patrols, and alarm response for residential properties.
- **Event Security**: Focuses on crowd control, attendee screening, and incident management for events.
- **Site Security**: Provides patrols and asset security for large sites.
- The page uses images to enhance each service description, helping clients understand ON GUARD 24/7’s offerings.

**3. Portfolio Page (portfolio.html)**

- Displays a gallery of past projects organized by categories like Condominiums and Embassies, with images showcasing the company’s experience in security management. Some projects are restricted for confidentiality.

**4. Contact Page (contact-us.html)**

- Contains a form for users to inquire about services, with fields for name, email, phone, and message.
- Additional contact options include phone, email, and social media links.
- Sections for subscribing to a newsletter and following the company on social media.

**5. Login Page (login.html)**

- Allows users to log in or sign up with fields for email, username, and password. JavaScript controls the toggle between login and signup forms.
-----
**Backend Routes and API Endpoints**

**User Routes**

The user-related routes provide functionality for managing guard requests and subscription details.

- **POST /api/subscribe**: Subscribes a user to updates via email. Returns a conflict error if the email is already subscribed.
- **Request Guards Page (requestGuards.html)**:
  - **POST /api/request-guards**: Allows users to create guard requests by specifying service type, number of guards, and cost.
  - **GET /api/request-guards**: Users can review all their submitted requests.
  - **PATCH /api/request-guards/**

: Users can edit specific details of their requests by ID.

- **DELETE /api/request-guards/**

: Allows users to delete a specific request by ID.

**Data Transfer for Request Guards**:

- The frontend submits a JSON object with services (array of service details) and total\_cost to the POST route. The backend validates and saves this data to MongoDB, handling duplicate checks and responding with appropriate messages.

**Contact Us Page (contact-us.html)**

The **Contact Us** page provides a form for users to send inquiries to the platform. Here’s how the API for this page works:

- **POST /api/contact**: Submits a user inquiry, which includes:
  - **name**: User’s name.
  - **email**: User’s email address.
  - **phone**: User’s phone number.
  - **company**: (Optional) Company name.
  - **message**: The user’s message or inquiry.

**Data Transfer for Contact Us**:

- The frontend form captures data in the above fields and sends it as a JSON object to the backend.
- The backend validates the fields using DTOs and stores the inquiry in MongoDB.
- If any required field is missing, a validation error is returned to the frontend.

**Admin Routes**

Admin-related routes enable CRUD operations to manage user data, including names, passwords, and emails.

- **POST /admin/users**: Creates a new user with name, email, and password.
- **GET /admin/users**: Retrieves all user data for review.
- **GET /admin/users/**: Retrieves a specific user’s details by ID.

- **PATCH /admin/users/**: Allows admins to update a user’s details (name, email, or password) by ID.

- **DELETE /admin/users/**: Deletes a specific user by ID.

**Data Transfer for Admin Routes**:

- All admin endpoints utilize DTOs (Data Transfer Objects) to validate incoming data.
- GET, PATCH, and DELETE routes require a user’s ID as a URL parameter, while POST and PATCH requests require a JSON body with user details.
-----
**Key Technologies**

- **HTML**: Structure for all website pages.
- **CSS**: Styling for a responsive and visually appealing design.
- **JavaScript**: Adds interactivity, such as toggling between login/signup forms and handling mobile navigation.
- **NestJS**: Backend framework for organizing routes, services, and controllers.
- **MongoDB**: Database for storing user data, guard requests, and subscription details.
-----
**Navigation and Responsiveness**

- **Responsive Navigation**: The navigation bar adapts to different screen sizes, with a hamburger menu for mobile devices that opens and closes with JavaScript.
- **Full Responsiveness**: All pages are fully responsive, ensuring a smooth user experience across phones, tablets, and desktops.
