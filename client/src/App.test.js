import puppeteer from "puppeteer";

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("should be authorization in first load", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".card-title");
    const text = await page.$eval(".card-title", (e) => e.textContent);
    expect(text).toContain("Authorization");
  })

  it("shows login page after submitting a form", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".card-content");

    await page.click("#email");
    await page.type("#email", "usertest@gmail.com");

    await page.click("#password");
    await page.type("#password", "qwerty12#");

    await page.click("#name");
    await page.type("#name", "JohnTest");

    await page.click("#surname");
    await page.type("#surname", "DoeTest");

    await page.click(".yellow");

    await page.waitForSelector('.helper-text')

    const text = await page.$eval(
      ".helper-text",
      (e) => e.textContent
    )
    expect(text).toContain("Sample of email: some@mail.com");
  })

  afterAll(() => browser.close());
});