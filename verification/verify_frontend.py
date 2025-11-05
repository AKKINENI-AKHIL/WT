from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to the home page and take a screenshot
        page.goto("http://localhost:5173")
        page.screenshot(path="verification/homepage.png")

        # Navigate to the login page and take a screenshot
        page.goto("http://localhost:5173/login")
        page.screenshot(path="verification/loginpage.png")

        # Navigate to the register page and take a screenshot
        page.goto("http://localhost:5173/register")
        page.screenshot(path="verification/registerpage.png")

        browser.close()

if __name__ == "__main__":
    run()
