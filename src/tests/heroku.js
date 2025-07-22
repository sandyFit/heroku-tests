/**
 * ✅ Test Case: Login with valid credentials
 * 🔧 What it does:
 *    - Goes to the basic auth login page
 *    - Enters valid credentials
 *    - Verifies successful login message
 */

describe("Basic Auth Test on HerokuApp", () => {
    it("Logs in with valid credentials and sees the success message", async () => {

        await browser.url("https://admin:admin@the-internet.herokuapp.com/basic_auth");

        const successMessage = await $('p');
        const messageValue = await successMessage.getText()
        console.log(`Message: ${messageValue}`);

        await expect(successMessage).toBeDisplayed();
        await expect(successMessage).
            toHaveTextContaining('Congratulations! You must have the proper credentials.');
    });

    /**
     * 🎯 What it does:
     *  - Opens the page.
     *  - Clicks the "Enable" button to enable a disabled input field.
     *  - Waits until the input becomes enabled.
     *  - Verifies that the input is now editable and the success message appears.
     */
    it("Enables input field and waits until success message appears", async () => {
        await browser.url("https://the-internet.herokuapp.com/dynamic_controls");

        await $('#input-example button[type="button"]').click();

        const input = $('#input-example input[type="text"]');
        await input.waitForEnabled({ timeout: 6000 });

        await input.click();
        await expect(input).toBeEnabled();
        

        const message = await $('#message');
        await expect(message).toBeDisplayed();
        const finalMessage = await message.getText();
        console.log(`Message:, ${finalMessage}`);
        expect(finalMessage).toHaveTextContaining("It's enabled!");

    });

    /**
     *  - Open the page "https://the-internet.herokuapp.com/dynamic_controls"
     *  - Check the checkbox
     *  - Remove the check
     *  - Waits until the message "It's gone!" is displayed
     *  - Verify the checkbox is gone
     */
    it("Ticks checkbox input and waits until success message appears", async () => {
        await browser.url("https://the-internet.herokuapp.com/dynamic_controls");

        const checkbox = $('#checkbox input[type="checkbox"]');
        await checkbox.click();
        console.log('Checkbox checked!');

        const removeBtn = $('#checkbox-example button[type="button"]');
        await removeBtn.click();
        console.log('Removing...');

        const message = $('#checkbox-example #message');

        await browser.waitUntil(
            async () => await message.getText(),
            {
                timeout: 5000,
                timeoutMsg: `Waits until the message "It's gone!" is displayed`
            }
        );

        await expect(message).toBeDisplayed();
        const finalMessage = await message.getText();
        console.log(`Message: ${finalMessage}`);
        expect(finalMessage).toHaveTextContaining("It's gone!");

    });

    /**
     * Preconditions:
     *  - User is on the dropdown page (https://the-internet.herokuapp.com/dropdown).
     *  - The dropdown element is visible on the page.

     *  Steps:
     *  - Navigate to the dropdown page.
     *  - Locate the dropdown element.
     *  - Select "Option 2" from the dropdown.
     *  - Retrieve the selected value.
     *  - Expected Result:
     *  - The value corresponding to "Option 2" is selected.
     *  - The selected value should equal '2'.
     * 
     *  Expected Result:
     *  - The value corresponding to "Option 2" is selected.
     *  - The selected value should equal '2'.
     */
    it.only("Should select Option 2 from the dropdown", async () => {
        // Navigate to the page
        await browser.url('https://the-internet.herokuapp.com/dropdown');

        // Locate the dropdown element
        const dropdown = await $('#dropdown');

        // Wait for it to be displayed
        await expect(dropdown).toBeDisplayed();

        // Select by visible text
        await dropdown.selectByVisibleText('Option 2');

        // Get selected value
        const selectedValue = await dropdown.getValue();
        console.log(`Selected Value: ${selectedValue}`);

        // Assert the selected value is correct
        expect(selectedValue).toBe('2');
        
    });
});

