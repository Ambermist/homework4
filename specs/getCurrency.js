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
    it('Enter sum', async function () {
        const input = await $('#sum-to-buy');
        const database = await $('#database');
        let text = await database.getHTML(false);
        await input.click();           
        const waitForData = async function(number, timeout){
          await browser.keys(number);                 
          await browser.pause(1000);
          await browser.waitUntil(
              async function() {
                return (await database.getHTML(false)) !== text},
              {
                  timeout: timeout,
                  timeoutMsg: `expected more text after ${timeout} ms`
              }           
          );
            const arr = await database.getHTML(false);
            const obj = JSON.parse(arr);
            console.log(arr);
            expect(obj[obj.length - 1]['num']).toEqual(number)
            text = await database.getHTML(false);
      }
      await waitForData('1', 5000);
      await waitForData('2', 5000);
      await waitForData('3', 5000);
      await waitForData('4', 5000);
  })
  after('Check buying currency', async function () {
    await browser.waitUntil(
        async () => {return (await $('#database').getHTML(false)) === '[{"num":"1"},{"num":"2"},{"num":"3"},{"num":"4"}]'},
        {
            timeout: 10000,
            timeoutMsg: 'expected to be full sum'
        }
    );
    const buyButton = await $('//*[text()="Buy"]');
    await buyButton.click();
    const rate = parseInt(await $('#currency-rate').getText(), 10);
    const result = await $('#withdrew').getText();
    await expect(result).toEqual(`1234 => ${1234*rate}`);   
})
})