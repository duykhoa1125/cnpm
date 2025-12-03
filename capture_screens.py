import os
import time
import json
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:8000"
OUTPUT_DIR = "project_screenshots"

# Defined from navigation-config.js
ROLES_CONFIG = {
    "student": [
        "dashboard_student",
        "courses_student",
        "ai_tutor_matching",
        "library_view",
        "progress_student",
        "utilities_student",
        "feedback_student",
        "profile_student",
        "student_register",
        "notifications_view"
    ],
    "tutor": [
        "dashboard_tutor",
        "tutor_schedule",
        "courses_tutor",
        "library_view",
        "feedback_view_tutor",
        "profile_tutor",
        "notifications_view"
    ],
    "department": [
        "dashboard_department",
        "feedback_view_admin",
        "progress_department",
        "department_management",
        "notifications_view"
    ],
    "academic": [
        "dashboard_academic",
        "course_cancellation_rules",
        "progress_admin",
        "scheduling_academic",
        "feedback_view_admin",
        "curriculum_academic",
        "library_view",
        "notifications_view"
    ],
    "admin": [
        "dashboard_admin",
        "progress_admin",
        "feedback_view_admin",
        "system_admin",
        "notifications_view"
    ]
}

def ensure_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

def capture_login(page):
    print("Capturing Login Screen...")
    # Clear storage to ensure login screen shows
    page.goto(BASE_URL)
    page.evaluate("localStorage.clear()")
    page.reload()

    # Wait for the login screen to be visible.
    try:
        # Wait for the loader to be removed
        page.wait_for_selector('#global-loader', state='detached', timeout=5000)
        # Wait for login screen
        page.wait_for_selector("#login-screen", state="visible", timeout=5000)
    except Exception as e:
        print(f"Warning in capture_login: {e}")
        # Force remove loader if it fails
        page.evaluate("const l = document.getElementById('global-loader'); if(l) l.remove();")
        # Try to make login screen visible if it's there
        page.evaluate("const l = document.getElementById('login-screen'); if(l) l.classList.remove('hidden');")

    time.sleep(1) # Extra stability
    page.screenshot(path=f"{OUTPUT_DIR}/00_login.png", full_page=True)

def capture_role_screens(page, role, screens):
    print(f"Capturing screens for role: {role}")

    # Mock user object
    user_data = {
        "id": "123",
        "username": f"test_{role}",
        "fullName": f"Test {role.capitalize()}",
        "role": role,
        "email": f"{role}@hcmut.edu.vn"
    }

    for screen_id in screens:
        print(f"  - Processing {screen_id}...")

        # We set the state *before* loading to ensure the app initializes correctly
        page.goto(BASE_URL)

        page.evaluate(f"""
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUserRole', '{role}');
            localStorage.setItem('currentUser', '{json.dumps(user_data)}');
            localStorage.setItem('activeTab', '{screen_id}');
        """)

        page.reload()

        # Wait for loader to be removed
        try:
             page.wait_for_selector('#global-loader', state='detached', timeout=5000)
        except:
             page.evaluate("const l = document.getElementById('global-loader'); if(l) l.remove();")

        # Wait for main app
        try:
            page.wait_for_selector("#main-app", state="visible", timeout=5000)
        except:
             # Force show main app if waiting fails (e.g. JS error prevented transition)
             page.evaluate("document.getElementById('main-app').classList.remove('hidden'); document.getElementById('main-app').classList.add('flex');")
             page.evaluate("document.getElementById('login-screen').classList.add('hidden');")

        # Try to wait for the specific screen ID
        try:
            page.wait_for_selector(f"#{screen_id}", state="visible", timeout=3000)
        except:
            print(f"    Warning: Selector #{screen_id} not visible after timeout. Forcing display...")
            # If the screen isn't visible, we might need to simulate the click or force it visible
            # But normally the JS should have handled it via `activeTab` in localStorage.
            # However, if `applyLoginState` fails or runs before partials are ready, it might not switch.
            # Let's try to call switchTab explicitly if needed.
            try:
                page.evaluate(f"if(window.switchTab) window.switchTab('{screen_id}')")
                time.sleep(0.5)
            except:
                pass

        time.sleep(1.5) # Allow animations/charts to settle

        filename = f"{OUTPUT_DIR}/{role}_{screen_id}.png"
        page.screenshot(path=filename, full_page=True)


def main():
    ensure_dir(OUTPUT_DIR)

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(viewport={"width": 1440, "height": 900}) # Larger viewport
        page = context.new_page()

        capture_login(page)

        for role, screens in ROLES_CONFIG.items():
            capture_role_screens(page, role, screens)

        browser.close()
        print(f"Done! Screenshots saved to {OUTPUT_DIR}/")

if __name__ == "__main__":
    main()
