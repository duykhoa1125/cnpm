# do not need commit after change

# Project Summary: HCMUT Learning Management System (LMS) Prototype

This project is a high-fidelity, frontend-only prototype of a Learning Management System (LMS) for HCMUT. It's built with vanilla JavaScript, Tailwind CSS, and Chart.js, serving as a proof-of-concept to demonstrate the intended user experience for various roles.

## Architecture

The application follows a Single Page Application (SPA) pattern without relying on a formal framework. A custom script, `js/loader.js`, is responsible for dynamically fetching and injecting HTML partials from the `/partial` directory into the main `index.html` file. This approach creates the illusion of multiple pages within a single-page context.

### Modular Architecture

The codebase is organized into ES6 modules located in the `js/modules/` directory. Each module has a specific responsibility, promoting separation of concerns and maintainability.

## Data and Logic

There is no backend implementation in this prototype. Instead, the application simulates backend functionalities using extensive mock data arrays stored in modular files under `js/modules/mock-data/`. The application logic is distributed across specialized modules:

- **State Management:** Global application state and chart references are managed in `state.js`. Session persistence uses `localStorage`.
- **Mock Data:** All mock data is organized into separate modules in `js/modules/mock-data/`:
  - `feedbacks.js` - Feedback/rating data
  - `library.js` - Digital library materials
  - `progress.js` - Student progress tracking
  - `courses.js` - Course details and tutor classes
  - `notifications.js` - System notifications
  - `users.js` - User data, system logs, cancellation rules
  - `bonus-sessions.js` - Bonus sessions and RSVPs
- **Navigation Config:** Role-based menus and breadcrumb mappings are in `navigation-config.js`
- **Central Export:** `config.js` serves as a central export point that re-exports all modular files for backward compatibility
- **Client-Side Routing:** The `switchTab` function in `navigation.js` dynamically shows and hides appropriate HTML partials, mimicking page navigation.
- **Role-Based Access Control (RBAC):** The user interface and navigation elements are dynamically generated based on the logged-in user's role (Student, Tutor, Admin, Department, Academic), as defined in `requirement.md`.
- **Dynamic Content:** Specialized `render` and `filter` functions in their respective modules populate the views with mock data, enabling interactive features such as search, filtering, and data visualization through Chart.js graphs.

## Purpose

The primary purpose of this codebase is to serve as a detailed proof-of-concept, accurately matching the specifications outlined in `requirement.md`. It effectively demonstrates the complete user experience for all specified roles and features, providing a robust blueprint for future backend and frontend development.

## Key Technologies Used

- **HTML:** For structuring the content.
- **CSS (Tailwind CSS):** For styling and responsive design.
- **JavaScript (ES6 Modules):** For all dynamic functionalities, logic, and interactions.
- **Chart.js:** For data visualization within dashboards.

## Directory Structure Overview

```
project/
├── index.html              # Main entry point, loads partials and main-module.js
├── css/
│   └── styles.css          # Custom CSS supplementing Tailwind
├── js/
│   ├── loader.js           # Handles dynamic loading of HTML partials
│   ├── main.js             # Legacy file (deprecated, kept for reference)
│   ├── main-module.js      # Entry point that imports and initializes all modules
│   └── modules/            # ES6 Module directory
│       ├── config.js       # Central export point (re-exports all modular configs)
│       ├── state.js        # Global state and chart references
│       ├── navigation-config.js # Role menus and breadcrumb mappings
│       ├── mock-data/      # Mock data modules
│       │   ├── feedbacks.js      # Feedback/rating data
│       │   ├── library.js        # Digital library materials
│       │   ├── progress.js       # Student progress data
│       │   ├── courses.js        # Course details and tutor classes
│       │   ├── notifications.js  # System notifications
│       │   ├── users.js          # Users, logs, cancellation rules
│       │   └── bonus-sessions.js # Bonus sessions and RSVPs
│       ├── ui.js           # UI utilities: toast, modals, dropdowns, button loading
│       ├── auth.js         # Authentication: login, logout, role management
│       ├── navigation.js   # Tab switching, sidebar generation, breadcrumbs
│       ├── charts.js       # Chart.js initialization for all dashboard types
│       ├── feedback.js     # Feedback rendering, filtering, submission
│       ├── library.js      # Digital library/materials management
│       ├── notifications.js# Notification system (render, filter, CRUD)
│       ├── progress.js     # Progress tracking and GPA conversion
│       ├── courses.js      # Course management for tutors and students
│       ├── profile.js      # Profile viewing and editing
│       ├── admin.js        # Admin system: logs, users, backup
│       ├── bonus-session.js# Bonus session management and RSVPs
│       └── cancellation.js # Course cancellation logic
├── partial/                # HTML partials for different views
│   ├── login.html
│   ├── sidebar.html
│   ├── header.html
│   ├── dashboard_*.html    # Dashboard views for each role
│   ├── courses_*.html      # Course-related views
│   ├── profile_*.html      # Profile views
│   ├── feedback_*.html     # Feedback views
│   ├── progress_*.html     # Progress tracking views
│   └── ...                 # Other partials
├── image/                  # Static assets (logos, images)
├── requirement.md          # Project requirements and use cases
└── GEMINI.md               # This documentation file
```

## Module Responsibilities

| Module                        | Primary Functions                                                                                                | Description                                                                                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.js`                   | State variables, mock data                                                                                       | Central export point that re-exports all modular files (`state.js`, `navigation-config.js`, and all files from `mock-data/`) for backward compatibility |
| `state.js`                    | State management                                                                                                 | Manages `currentUserRole`, chart references (`trafficChart`, `userChart`, etc.), and chart initialization flags                                         |
| `navigation-config.js`        | Navigation configuration                                                                                         | Defines role-based menu structures (`roleMenus`) and breadcrumb mappings (`breadcrumbMap`) for all user roles                                           |
| `mock-data/feedbacks.js`      | Mock feedback data                                                                                               | Contains feedback/rating data (`mockFeedbacks`) with tutor ratings and student comments                                                                 |
| `mock-data/library.js`        | Mock library data                                                                                                | Contains digital library materials (`mockMaterials`) with files, videos, and resources                                                                  |
| `mock-data/progress.js`       | Mock progress data                                                                                               | Contains student progress tracking data (`mockStudentProgress`) with grades and attendance                                                              |
| `mock-data/courses.js`        | Mock course data                                                                                                 | Contains tutor classes (`mockTutorClasses`) and detailed course information (`mockCourseDetails`)                                                       |
| `mock-data/notifications.js`  | Mock notification data                                                                                           | Contains notification messages (`mockNotifications`) for various system events                                                                          |
| `mock-data/users.js`          | Mock system data                                                                                                 | Contains user data (`mockUsers`), system logs (`systemLogs`), and cancellation rules (`mockCancellationRules`)                                          |
| `mock-data/bonus-sessions.js` | Mock bonus session data                                                                                          | Contains bonus session data (`bonusSessions`) and RSVP information (`bonusRsvps`)                                                                       |
| `ui.js`                       | `showToast`, `setButtonLoading`, `confirmActionModal`, `setupCustomSelect`                                       | General UI utilities for notifications, loading states, modals, and custom dropdowns                                                                    |
| `auth.js`                     | `handleLogin`, `logout`, `applyLoginState`, `onRoleChange`, `initAuth`                                           | Handles user authentication, session management, and role switching                                                                                     |
| `navigation.js`               | `switchTab`, `generateSidebar`, `updateBreadcrumbs`, `updateDashboardGreeting`                                   | Manages SPA routing, sidebar menu generation based on role, and breadcrumb navigation                                                                   |
| `charts.js`                   | `initAdminCharts`, `initTutorCharts`, `initDeptCharts`, `initAcademicCharts`, `destroyAllCharts`                 | Initializes and manages Chart.js visualizations for different dashboard types                                                                           |
| `feedback.js`                 | `renderTutorFeedback`, `renderAdminFeedback`, `filterTutorFeedback`, `submitFeedback`, `exportFeedback`          | Feedback display, filtering, submission for students, and export functionality                                                                          |
| `library.js`                  | `renderLibrary`, `filterLibrary`, `filterLibraryByType`, `openLibraryMaterial`                                   | Digital library browsing, searching, and material viewing                                                                                               |
| `notifications.js`            | `renderNotifications`, `filterNotifications`, `toggleNotificationRead`, `markAllNotificationsRead`               | Notification listing, filtering by type, read/unread toggling                                                                                           |
| `progress.js`                 | `renderTutorProgress`, `renderAdminProgress`, `filterProgressTable`, `exportProgressToCSV`                       | Student progress display with GPA conversion and export capabilities                                                                                    |
| `courses.js`                  | `renderTutorCourses`, `toggleTutorClassDetail`, `registerCourse`, `searchCourses`, `saveTutorSchedule`           | Course management for both tutor (class management) and student (registration, viewing)                                                                 |
| `profile.js`                  | `toggleProfileEdit`, `updateProfile`, `toggleTutorProfileEdit`, `updateTutorProfile`                             | Profile viewing and editing for students and tutors                                                                                                     |
| `admin.js`                    | `renderAdminSystem`, `renderSystemLogs`, `renderUserTable`, `addUser`, `editUser`, `deleteUser`, `triggerBackup` | Admin panel: system logs, user management, backup/restore                                                                                               |
| `bonus-session.js`            | `submitBonusSession`, `renderBonusSessions`, `renderBonusRsvps`, `changeRsvpStatus`                              | Bonus tutoring session creation, listing, and RSVP management                                                                                           |
| `cancellation.js`             | `cancelCourse`, `processCancellation`, `renderCourseCancellationRules`                                           | Course cancellation workflow and rules display                                                                                                          |

## User Roles

The system supports 5 distinct user roles, each with specific permissions and views:

| Role           | Key Features                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------- |
| **Student**    | Dashboard, course registration, library access, feedback submission, profile management       |
| **Tutor**      | Dashboard, schedule management, class management, student progress tracking, feedback viewing |
| **Department** | Dashboard, academic oversight, course cancellation rules                                      |
| **Academic**   | Dashboard, academic metrics, institutional analytics                                          |
| **Admin**      | Full system management, user administration, system logs, backup/restore                      |

## Event Flow

1. `loader.js` fetches and injects all HTML partials into `index.html`
2. After partials are loaded, `loader.js` dispatches a `partialsLoaded` event
3. `main-module.js` listens for `partialsLoaded` and initializes the application:
   - Calls `initAuth()` to restore session or show login
   - Calls `initBonusModule()` for bonus session initialization
   - Sets up custom select dropdowns
4. On successful login, `applyLoginState()` generates the appropriate sidebar and switches to the default tab
5. Tab switching is handled by `switchTab()`, which also initializes role-specific charts and renders data

## Adding New Features

To add a new feature:

1. Create a new module in `js/modules/` if it represents a distinct feature area
2. Export functions that need to be called from HTML (onclick handlers)
3. Import the module in `main-module.js`
4. Attach exported functions to `window.*` for HTML onclick access
5. Add any required mock data to the appropriate file in `js/modules/mock-data/` (create a new file if needed)
6. Create the HTML partial in `partial/` directory
7. Register the new tab in `roleMenus` (in `navigation-config.js`) for appropriate roles
8. Add breadcrumb mapping in `breadcrumbMap` (in `navigation-config.js`)
9. If you add new mock data files, re-export them from `config.js` for backward compatibility
