import os
import time
import json
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:8000"
OUTPUT_DIR = "project_screenshots"

# Only Admin Role
ROLES_CONFIG = {
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
             # Force show main app if waiting fails
             page.evaluate("document.getElementById('main-app').classList.remove('hidden'); document.getElementById('main-app').classList.add('flex');")
             page.evaluate("document.getElementById('login-screen').classList.add('hidden');")

        # Try to wait for the specific screen ID
        try:
            page.wait_for_selector(f"#{screen_id}", state="visible", timeout=3000)
        except:
            print(f"    Warning: Selector #{screen_id} not visible after timeout. Forcing display...")
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
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        for role, screens in ROLES_CONFIG.items():
            capture_role_screens(page, role, screens)

        browser.close()
        print(f"Done! Screenshots saved to {OUTPUT_DIR}/")

if __name__ == "__main__":
    main()
