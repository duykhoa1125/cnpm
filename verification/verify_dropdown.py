from playwright.sync_api import sync_playwright, expect
import re

def verify_dropdown_fix():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the login page
        page.goto("http://localhost:8000")

        # Wait for partials to load
        page.wait_for_selector("#login-screen")

        # Target only the login screen
        login_screen = page.locator("#login-screen")

        # Verify initial state: Role is "student"
        trigger = login_screen.locator(".custom-select-trigger")
        expect(trigger).to_contain_text("Sinh viên (Student)")

        # Locate the Login button inside login screen
        login_btn = login_screen.locator("button:has-text('Đăng nhập qua SSO')")

        # Locate the custom dropdown options container inside login screen
        options_container = login_screen.locator(".custom-select-options")

        # Ensure the dropdown is NOT open
        expect(options_container).not_to_have_class(re.compile(r"open"))

        # Attempt to click the Login button.
        login_btn.click()

        # Wait a bit to see if login happened
        # If login happens, #login-screen gets hidden class
        try:
            # Check if login screen has class "hidden"
            expect(login_screen).to_have_class(re.compile(r"hidden"), timeout=3000)
            print("Login successful! The button was clickable.")
        except AssertionError:
            print("Login screen still visible.")

            # Check if role changed?
            current_text = trigger.inner_text()
            print(f"Current role text: {current_text}")

            if "Sinh viên" not in current_text:
                print("BUG REPRODUCED: Role changed to " + current_text)
            else:
                print("Role did not change. Click might have failed or app logic issue.")

        # Take a screenshot
        page.screenshot(path="verification/verification.png")

        browser.close()

if __name__ == "__main__":
    verify_dropdown_fix()
