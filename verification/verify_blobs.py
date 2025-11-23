from playwright.sync_api import sync_playwright

def verify_blobs():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000")

        # Verify blobs exist
        blobs = page.locator(".ambient-blob")
        count = blobs.count()
        print(f"Found {count} ambient blobs")
        assert count == 3, "Should have 3 ambient blobs"

        # Take a screenshot to see if they render (they might be faint/blurred)
        page.screenshot(path="verification/blobs_visible.png")
        print("Screenshot taken: verification/blobs_visible.png")

        browser.close()

if __name__ == "__main__":
    verify_blobs()
