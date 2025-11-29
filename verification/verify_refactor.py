from playwright.sync_api import sync_playwright

def verify_courses_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the student dashboard
            page.goto("http://localhost:8000")

            # Wait for loader to disappear
            page.wait_for_selector("#global-loader", state="hidden")

            # Login as student
            page.wait_for_selector("#login-screen")
            page.click("button[type='submit']")

            # Wait for dashboard
            page.wait_for_selector("#dashboard_student")
            print("Logged in as Student")

            # Click "Môn học" in sidebar
            page.click("button[data-target='courses_student']")

            # Wait for courses section to be active
            page.wait_for_selector("#courses_student.active")
            print("Switched to Courses tab")

            # Check if course list is visible
            # We look for "Giải tích 1" inside the active view
            page.wait_for_selector("#courses_student >> text=Giải tích 1")

            # Take screenshot of student courses
            page.screenshot(path="verification/student_courses.png")
            print("Student courses screenshot taken.")

            # Now logout
            page.evaluate("logout()")
            print("Logged out")

            # Wait for login screen again
            page.wait_for_selector("#login-screen")

            # Select Tutor role using custom select
            # Click the trigger to open dropdown
            page.click(".custom-select-trigger")

            # Select "Giảng viên" option.
            page.click(".custom-option:has-text('Giảng viên')")

            # Click login
            page.click("button[type='submit']")

            # Wait for tutor dashboard
            page.wait_for_selector("#dashboard_tutor")
            print("Logged in as Tutor")

            # Click "Lớp dạy" in sidebar
            page.click("button[data-target='courses_tutor']")

            # Wait for tutor courses
            page.wait_for_selector("#courses_tutor.active")

            # Check for tutor course content
            page.wait_for_selector("#courses_tutor >> text=Giải tích 1")

            # Take screenshot
            page.screenshot(path="verification/tutor_courses.png")
            print("Tutor courses screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_courses_page()
