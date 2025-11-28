/**
 * Configuration Module - Central Export Point
 * Re-exports all configuration and mock data from modular files
 *
 * This file serves as a central import point for backward compatibility.
 * All data has been split into separate modules for better organization.
 */

// Re-export State Management
export * from "./state.js";

// Re-export Mock Data
export * from "./mock-data/feedbacks.js";
export * from "./mock-data/library.js";
export * from "./mock-data/progress.js";
export * from "./mock-data/courses.js";
export * from "./mock-data/notifications.js";
export * from "./mock-data/users.js";
export * from "./mock-data/bonus-sessions.js";

// Re-export Navigation Configuration
export * from "./navigation-config.js";
