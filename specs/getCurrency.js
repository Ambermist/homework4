describe('Check app', function () {
    before('user should login', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: false, timeout: 4000 });
        await $('#spinner').waitForDisplayed({ reverse: true, timeout: 15000 });
        await browser.pause(700);        
    });
    it('Should enter correct sum and check result', async function () {
        const input = await $('#sum-to-buy');
        const database = await $('#database');
        let text = await database.getHTML(false);
        const waitForData = async function (array) {
            await browser.waitUntil(
                async function () {
                    return (await database.getHTML(false)) !== text;
                },
                {
                    timeout: 5000,
                    timeoutMsg: 'expected text after timeout'
                }
            );
            text = await database.getHTML(false);        
            await expect(JSON.parse( await database.getHTML(false))).toEqual(array);
        }
        await input.click();
        await browser.keys('1');
        await browser.pause(1000);
        await waitForData([{ "num": "1" }]);
        await browser.keys('2');
        await waitForData([{ "num": "1" }, { "num": "2" }]);
        await browser.keys('3');
        await waitForData([{ "num": "1" }, { "num": "2" }, { "num": "3" }]);
        await browser.keys('4');
        await waitForData([{ "num": "1" }, { "num": "2" }, { "num": "3" }, { "num": "4" }]);
        const buyButton = await $('//*[text()="Buy"]');
        await buyButton.click();
        const rate = parseInt(await $('#currency-rate').getText(), 10);
        const result = await $('#withdrew').getText();
        await expect(result).toEqual(`1234 => ${1234 * rate}`);

    })
})