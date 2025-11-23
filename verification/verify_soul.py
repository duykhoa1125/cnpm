from playwright.sync_api import sync_playwright

def verify_soul_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:8000")

        # 1. Login
        # The custom select hides the original select.
        # But for 'student', it might be the default or we can just interact with the visible UI.
        # Actually, let's just click the 'Đăng nhập' button since 'Student' is likely default or we don't strictly need to switch for this test if default is fine.
        # But to be safe, let's try to interact with the custom select if needed.
        # However, checking the code, the custom select uses divs.

        # Let's just try logging in directly first.
        page.fill("#login-username", "Student A")
        page.click("button:has-text('Đăng nhập')")

        # Wait for dashboard to be visible (it has .section-view class and id dashboard_student)
        # Note: switchTab adds 'active' class and display block.
        page.wait_for_selector("#dashboard_student.active", state="visible")

        # Wait for animations (AOS, etc)
        page.wait_for_timeout(3000)

        # Take a screenshot of the dashboard with the new soul effects
        page.screenshot(path="verification/dashboard_soul.png", full_page=True)

        print("Screenshot taken: verification/dashboard_soul.png")

        # Verify specific elements exist
        try:
            # Check for cursor
            cursor = page.locator("#cursor")
            assert cursor.count() > 0

            # Check for Bento Grid layout class
            bento = page.locator(".bento-grid")
            assert bento.count() > 0

            # Check for Spline viewer
            spline = page.locator("spline-viewer")
            assert spline.count() > 0

            print("Verification passed!")
        except Exception as e:
            print(f"Verification failed: {e}")

        browser.close()

if __name__ == "__main__":
    verify_soul_ui()
