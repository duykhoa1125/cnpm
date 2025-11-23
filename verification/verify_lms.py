from playwright.sync_api import sync_playwright

def verify_lms_load():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            # Go to the LMS
            page.goto("http://localhost:8000")

            # Wait for partials to load (custom event or loader hidden)
            # The loader has ID 'global-loader' and it gets hidden.
            page.wait_for_selector("#global-loader.opacity-0", state="attached", timeout=5000)

            # Wait a bit more for the transition to finish
            page.wait_for_timeout(1000)

            # Check if main content is visible
            # login screen is the initial view
            page.wait_for_selector("#login-screen", state="visible")

            # Take a screenshot of the login screen
            page.screenshot(path="/home/jules/verification/login_screen.png")
            print("Login screen screenshot taken.")

            # Perform login as student
            # Find the login button - it is in partial/login.html
            # <button onclick="handleLogin(event)" ...>

            # Wait for the login button to be available in the DOM
            page.wait_for_selector("#login-screen button", state="visible")

            # Click the login button
            page.click("#login-screen button")

            # Wait for the main app to be visible
            page.wait_for_selector("#main-app", state="visible")

            # Wait a moment for things to settle
            page.wait_for_timeout(1000)

            # Take a screenshot of the dashboard
            page.screenshot(path="/home/jules/verification/student_dashboard.png")
            print("Student dashboard screenshot taken.")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_lms_load()
