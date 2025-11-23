# HCMUT LMS

This repository contains the source code for the HCMUT Learning Management System (LMS), a web-based platform for students, tutors, and administrators to manage courses, schedules, and more.

## Overview

The application is built using standard HTML, CSS (Tailwind CSS), and Vanilla JavaScript. It uses a custom loader script (`js/loader.js`) to dynamically inject HTML partials, allowing for a modular development structure without the need for a complex build step or server-side rendering for the UI structure.

## Structure

*   `css/`: Contains the global stylesheets (`styles.css`).
*   `js/`: Contains the JavaScript logic.
    *   `loader.js`: Handles the dynamic loading of HTML partials.
    *   `main.js`: Contains the core application logic, event handlers, and UI interactions.
*   `partial/`: Contains HTML fragments (partials) that are injected into the main `index.html`.
    *   Examples: `header.html`, `sidebar.html`, `dashboard_student.html`, etc.
*   `index.html`: The main entry point of the application.

## Setup and Usage

### Prerequisites

*   A modern web browser.
*   A local web server (optional but recommended for correct fetch API behavior).

### Running the Application

1.  Clone the repository.
2.  Open the project directory in your terminal.
3.  Start a local web server. For example, if you have Python installed:

    ```bash
    python3 -m http.server 8000
    ```

4.  Open your browser and navigate to `http://localhost:8000`.

### Key Features

*   **Role-Based Access**: Supports Student, Tutor, and Admin roles.
*   **Dashboard**: Customized dashboards for each role.
*   **Course Management**: View, register, and cancel courses.
*   **Scheduling**: Tutor schedule management.
*   **Notifications**: Toast notifications for user actions.
*   **Responsive Design**: Mobile-friendly interface with a toggleable sidebar.

## How it Works

The `index.html` file contains `div` elements with a `data-include` attribute. The `js/loader.js` script scans for these attributes and fetches the corresponding HTML file from the `partial/` directory, injecting it into the DOM. This allows for a clean separation of concerns and easier maintenance of UI components.
