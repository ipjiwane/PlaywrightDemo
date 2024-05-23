// @ts-nocheck
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('verify error message with icon', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/');

  await page.getByPlaceholder("Username").fill("admin");

  await page.getByPlaceholder("Password").fill("admin");

  await page.locator("//button[@type='submit']").click();

  await expect.soft(page.locator("//p[@class='oxd-icon bi-exclamation-circle oxd-alert-content-icon']")).toHaveCount(1)

  await expect(page.locator("//*[@class='oxd-text oxd-text--p oxd-alert-content-text']")).toHaveText('Invalid credentials')

})


//dropdown

test("work with dropdown", async ({ page }) => {

  await page.goto("https://www.saucedemo.com/");

  // await page.pause();

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  //1. multiple ways of selecting a value from dropdown

  const dropdownElement = await page.locator('[data-test="product-sort-container"]');

  //by visible text or value
  await dropdownElement.selectOption('Price (low to high)');
  await dropdownElement.selectOption('az');

  //by label
  await dropdownElement.selectOption({ label: 'Name (Z to A)' });

  //by index
  await dropdownElement.selectOption({ index: 3 });

  //2. ways of getting options count

  // by using $$
  const options = await page.$$('.product_sort_container option')
  console.log('number of options is ' + options.length);

  //by using all()
  const elements = await page.locator('.product_sort_container option').all();
  console.log('number of options is ' + elements.length);

  //3. ways of checking the presence of an option

  //iterating through the entire list and verifying the values
  let eleFound = false;

  for (let option of options) {
    // let text = await option.textContent();
    if((await option.textContent()).includes('Price (high to low)')){
      eleFound = true;
        break;
    }
    // if (await option.textContent() === 'Price (high to low)') {
    //   eleFound = true;
    //   break;
    // }
  }
  expect(eleFound).toBeTruthy();

  // to get the text content and search for the option in it 
  // not recommended as it may give falsa positive results like below
  const dropdowntext = await page.locator('.product_sort_container').textContent()
  expect(dropdowntext.includes('Price')).toBeTruthy(); // passes even if no such option as price

  //or
  await expect(page.locator('[data-test="product-sort-container"]')).toContainText('Name') //same as above


  await page.waitForTimeout(5000);

  

  // await page.pause();

})


test('test example', async ({page}) => {

  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.locator('#login-button').click();

  const content = await page.locator('.product_sort_container').textContent()
  await expect(content.includes('Price (low to high)')).toBeTruthy();

  const options = await page.$$('.product_sort_container option')

  let present = false
  for(let option of options){
    if((await option.textContent()).includes('Price (low to high)')){
      present = true;
      break;
    }
  }
  await expect(present).toBeTruthy();
})

test.only('auto suggest dropdown', async({page}) => {

  await page.goto('https://www.redbus.in/');

  await page.locator('#src').fill('Nagpur');

  //get the values from auto suggestions
  // const options = await page.$$('.sc-dnqmqq.eFEVtU li .placeHolderMainText')

  await page.waitForSelector("//ul[@class='sc-dnqmqq eFEVtU']//li");
  const options = await page.$$("//ul[@class='sc-dnqmqq eFEVtU']//li")

  for (let option of options){
    let text = await option.textContent();
    console.log(text)
    if (text.includes('Dharampeth')){
      await option.click()
      break;
    }
  }

  await page.waitForTimeout(5000)

})



test.fail('test', () => {

  console.log('inside the test');
})



