describe('Check app', function () {
    before('user should login', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: false, timeout: 3000 });
        await $('#spinner').waitForDisplayed({ reverse: true, timeout: 15000 });
        await browser.pause(700);        
    });
    it('Enter sum', async function () {
      const input = await $('#sum=to-buy');
      const scriptdb = await $('database');      
      let arrLength = 0;
      const waitForData = async function(number, timeout){
        await input.setValue(number);
        await browser.waitUntil(
            async () => await scriptdb.getText() !== 0,
            {
                timeout: timeout,
                timeoutMsg: `expected text to be not null after ${timeout} ms`
            }            
        );
        arrLength +=1;
        const arr = JSON.parse(await scriptdb.getText());
        await expect(arr[length-1][num]).toEqual(number);        
    }
    waitForData('1', 4000);
    waitForData('2', 4000);
    waitForData('3', 4000);
    waitForData('4', 4000);
    })
})
