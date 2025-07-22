/**
 * ✅ Test Requirements – Challenging DOM (Herokuapp)
📝 Test Objective
 *  Verify that:
 *  - All dynamic buttons are clickable.
 *  - The table loads correctly with expected content structure.
 * 
 *  🔍 Functional Requirements
 *  - Page Access
 *  - The test must navigate to https://the-internet.herokuapp.com/challenging_dom.
 *  - Button Interaction
 *  - The page must display three buttons with dynamic class names (e.g., button, button alert, button success).
 *  - Each button must be:
 *   *  - Present in the DOM
 *   *  - Visible on the screen
 *   *  - Clickable
 *   *  - The test must click all three buttons without error.
 *   *  - 
 *  🎯 Table Validation
 *  - A table must be present below the buttons.
 *  - The test must:
 *   *  - Locate the table element
 *   *  - Read and extract the text content of the first row
 *   *  - Verify that the row contains 7 cells
 *   *  - Assert that the first cell is not empty
 * 
 *  🧪 Non-Functional Requirements
 *  - The test should be written in WebdriverIO using the Mocha framework.
 *  - The test should include clear console logs for visibility during test runs.
 *  - The test should use async/await syntax for WebdriverIO commands.
 *  - All assertions should use expect() syntax provided by WebdriverIO.
 */
describe("Challenging DOM Page", () => {
    it("Should click dynamic buttons and read table data", async () => {
        await browser.url('https://the-internet.herokuapp.com/challenging_dom');

        const buttons = await $$('div.example .button');
        for (const button of buttons) {
            await expect(button).toBeDisplayed();
            const legend = await button.getText();
            console.log(`Button legend: ${legend}`);
            await button.click();
        };

        const firstRowCells = await $$('table tbody tr:nth-child(1) td');
        const rowText = []
        for (const cell of firstRowCells) {
            const cellText = await cell.getText();
            rowText.push(cellText);
        }
        console.log(`First row contents: ${rowText}`);

        await expect(rowText.length).toBe(7);

        await expect(rowText[0]).not.toBe('');
    });
});
