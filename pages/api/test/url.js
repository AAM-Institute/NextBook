// import { NextApiRequest, NextApiResponse } from 'next';
import { playwright } from 'playwright';

// const { test, expect } = require('@playwright/test');

const testUrl = async (req, res) => {
  // try {

    // const { url } = req.query;

    // console.log(url, req.body)

    // const browser = await playwright.chromium.launch();
    // const context = await browser.newContext();
    // const page = await context.newPage();

    // // Run the tests against the given URL
    // await page.goto(url);

    // // Check for elements on the page, click buttons, etc.
    // const title = await page.title();
    // const h1 = await page.$('h1');
    // const button = await page.$('button');
    // await button.click();

    // await browser.close();

    // // Return the test results
    // res.status(200).json({
    //   success: true,
    //   data: {
    //     title,
    //     h1Text: h1.innerText,
    //   },
    // });
  // } catch (err) {
  //   res.status(500).json({
  //     success: false,
  //     message: err.message,
  //   });
  // }
}

export default testUrl;
