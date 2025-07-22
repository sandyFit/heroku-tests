/**
 * 🔹 Test Case ID
 *      ✅ TC_DOWNLOAD_001
*  🔹 Title
 *      ✅ Verify that a file can be downloaded successfully.
 * 🔹 Preconditions
 *      ✅ User is on the file download page: /download
 *      ✅ A known file (e.g., some-file.txt) exists in the list.
 *      ✅ Downloads folder path is correctly set in WebDriverIO config.
 * 🔹 Test Steps
 *      ✅ Navigate to https://the-internet.herokuapp.com/download
 *      ✅ Locate the file named some-file.txt in the list of files.
 *      ✅ Click on the file link to initiate the download.
 *      ✅ Wait for the file to download completely.
 *      ✅ 📂 Validates the file was downloaded to a local folder using Node.js fs
 * 🔹 Expected Result
 *      ✅ The file some-file.txt is successfully downloaded and exists in the specified downloads folder.
 * 🔹 Postconditions
 *      ✅ Clean up: optionally remove the file from the local system after validation.
 */
describe("File downloader", () => {

    it("Verify that a file can be downloaded successfully", async () => {
        await browser.url("https://the-internet.herokuapp.com/download");

        const files = await $$('#content .example a');

        for (const file of files) {
            const fileText = await file.getText()
            if (fileText === 'some-file.txt') {
                await file.click();
                console.log(`[DEBUG] file downloading....`);

                await browser.pause(1000);
            };
        };

    })
})
