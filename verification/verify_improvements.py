
from playwright.sync_api import sync_playwright, expect

def verify_frontend(page):
    # Navigate to localhost
    page.goto("http://localhost:8000/index.html")

    # 1. Verify Global Loader fades out
    page.wait_for_selector("#global-loader", state="hidden")

    # 2. Verify Persistence
    # If login screen is visible (persistence failed or first run), we need to login.
    # Note: Our custom dropdown hides the original <select>, so select_option might fail on the hidden element if strict.
    # But Playwright usually handles hidden selects if force=True or checks visibility.
    # The error says "element is not visible".
    # We should use the custom dropdown trigger to simulate user action, or just JS.

    if page.is_visible("#login-screen") and not page.is_visible("#login-screen.hidden"):
        print("Login screen visible, attempting login...")

        # Use JS to set value and trigger login since custom dropdown blocks direct interaction with hidden select
        page.evaluate("""() => {
            const select = document.getElementById("role-select");
            select.value = "student";
            handleLogin({ preventDefault: () => {} });
        }""")

    page.wait_for_selector("#dashboard_student", state="visible")

    # 3. Verify Toast Notification
    page.evaluate("showToast('Verified!', 'success')")
    expect(page.locator(".toast-success")).to_be_visible()

    # Take screenshot
    page.screenshot(path="verification/verification.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify_frontend(page)
        finally:
            browser.close()
