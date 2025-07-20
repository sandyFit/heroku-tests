import { browser, $ } from '@wdio/globals'
describe('DuckDuckGo search', () => {
    it('Searches for WebdriverIO', async () => {
        await browser.url('https://duckduckgo.com/')

        const searchInput = await $('#searchbox_input') // ✅ correct selector
        await searchInput.waitForDisplayed({ timeout: 5000 })
        await searchInput.setValue('WebdriverIO')

        const searchButton = await $('.searchbox_searchButton__LxebD')
        await searchButton.click()

        // 🔄 Wait until the title includes "WebdriverIO"
        await browser.waitUntil(
            async () => {
                const title = await browser.getTitle()
                return title.includes('WebdriverIO')
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected title to include WebdriverIO after search',
            }
        )

        const finalTitle = await browser.getTitle()
        expect(finalTitle).toBe('WebdriverIO at DuckDuckGo')

        // This is now redundant (same as above line), but optional to keep:
        await expect(browser).toHaveTitle('WebdriverIO at DuckDuckGo')
    })
    /**
     * Steps:
     * 1. Go to https://duckduckgo.com
     * 2. Type WebdriverIO into the search input
     * 3. Press Enter or click the search button
     * 4. Wait for the results page to load
     * 5. Verify that the page title contains WebdriverIO
     * 6. Verify that at least 1 result contains the word WebdriverIO in the title or snippet
     * 7. Expected Result:
        - The title contains WebdriverIO
     * 8. Search results include at least one reference to WebdriverIO
     */

    it.only('should return relevant results for WebdriverIO', async () => {
        // test steps go here
        // **** 1. Go to https://duckduckgo.com *****
        await browser.url('https://duckduckgo.com');
        const searchInput = await $('#searchbox_input');
        const searchButton = await $('.searchbox_searchButton__LxebD');
        // **** 2. Type WebdriverIO into the search input *****
        await searchInput.waitForExist({ timeout: 5000 });
        await searchInput.setValue('WebdriverIO');
        const inputValue = await searchInput.getValue();
        console.log(`[DEBUG] Input value: ${inputValue}`);

        // **** 3. Press Enter or click the search button ****
        await searchButton.click();
        console.log('[DEBUG] button clicked!');

        // Wait until results appear
        await browser.waitUntil(
            async () => (await $$('ol.react-results--main > li[data-layout="organic"] h2')).length > 0,
            { timeout: 5000, timeoutMsg: 'Expected search results to load' }
        );
        
        const results = await $$('ol.react-results--main [data-layout="organic"] h2');

        for (const title of results) {
            console.log('🔎 Result:', await title.getText());
        }

        const firstResult = await results[0].getText();
        console.log('🔎 First Result:', firstResult);
        expect(firstResult).toContain('WebdriverIO');


    });

})
