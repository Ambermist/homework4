describe('Check app', function () {
    before('user should login', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut');
        await $('#login').setValue('walker@jw.com');
        await $('#password').setValue('password');
        await $('button').click();
        await $('#spinner').waitForDisplayed({ reverse: false, timeout: 3000 });
        await $('#spinner').waitForDisplayed({ reverse: true, timeout: 15000 });
        await $('.table-responsive').scrollIntoView();
        await browser.pause(700);        
    });
    context('Check sorting ID', async function () {
        
        it('Check ID ascending order', async function () {
            const idCells = await $$('//*[@tabulator-field="id" and @class="tabulator-cell"]');
            const idCellsValues = await Promise.all(idCells.map(async (cell) => { return parseInt(await cell.getText(), 10) }));
            const idCellsSortedAsc = idCellsValues.sort((a, b) => (a-b));
            const idSortButton = await $('//*[@tabulator-field="id" and @role="columnheader"]');
            await idSortButton.click();
            await browser.pause(1000);
            const idCellsA = await $$('//*[@tabulator-field="id" and @class="tabulator-cell"]');
            const idCellsValuesA = await Promise.all(idCellsA.map(async (cell)=>{return parseInt(await cell.getText(), 10)}));
            expect(idCellsValuesA).toEqual(idCellsSortedAsc);
        })
        it('Check ID descending order', async function () {
            const idCells = await $$('//*[@tabulator-field="id" and @class="tabulator-cell"]');
            const idCellsValues = await Promise.all(idCells.map(async (cell) => { return parseInt(await cell.getText(), 10) }));            
            const idCellsSortedDesc = idCellsValues.sort((a, b) => (b - a));
            const idSortButton = await $('//*[@tabulator-field="id" and @role="columnheader"]');
            await idSortButton.click();
            await browser.pause(1000);
            const idCellsD = await $$('//*[@tabulator-field="id" and @class="tabulator-cell"]');
            const idCellsValuesD = await Promise.all(idCellsD.map(async (cell)=>{return parseInt(await cell.getText(), 10)}));
            expect(idCellsValuesD).toEqual(idCellsSortedDesc);
        })
    })

    context('Check sorting Name', async function () {
        
        it('Check Name ascending order', async function () {
            const idCells = await $$('//*[@tabulator-field="name" and @class="tabulator-cell"]');
            const idCellsValues = await Promise.all(idCells.map(async (cell) => {return await cell.getText()}));
            const idCellsSortedAsc = idCellsValues.sort();
            const idSortButton = await $('//*[@tabulator-field="name" and @role="columnheader"]');
            await idSortButton.click();
            await browser.pause(1000);
            const idCellsA = await $$('//*[@tabulator-field="name" and @class="tabulator-cell"]');
            const idCellsValuesA = await Promise.all(idCellsA.map(async (cell)=>{return await cell.getText()}));
            expect(idCellsValuesA).toEqual(idCellsSortedAsc);
        })
        it('Check Name descending order', async function () {
            const idCells = await $$('//*[@tabulator-field="name" and @class="tabulator-cell"]');
            const idCellsValues = await Promise.all(idCells.map(async (cell) => {return await cell.getText()}));            
            const idCellsSortedDesc = idCellsValues.sort().reverse();
            const idSortButton = await $('//*[@tabulator-field="name" and @role="columnheader"]');
            await idSortButton.click();
            await browser.pause(1000);
            const idCellsD = await $$('//*[@tabulator-field="name" and @class="tabulator-cell"]');
            const idCellsValuesD = await Promise.all(idCellsD.map(async (cell)=>{return await cell.getText()}));
            expect(idCellsValuesD).toEqual(idCellsSortedDesc);
        })
    })

    context('Check sorting Age', async function () {
        
        it('Check Age ascending order', async function () {
            const idCells = await $$('//*[@tabulator-field="age" and @class="tabulator-cell"]');
            const idCellsValues = await Promise.all(idCells.map(async (cell) => { return parseInt(await cell.getText(), 10) }));
            const idCellsSortedAsc = Array.from(idCellsValues).sort((a, b) => (a - b));
            const idSortButton = await $('//*[@tabulator-field="age" and @role="columnheader"]');
            await idSortButton.click();
            await browser.pause(1000);
            const idCellsA = await $$('//*[@tabulator-field="age" and @class="tabulator-cell"]');
            const idCellsValuesA = await Promise.all(idCellsA.map(async (cell)=>{return parseInt(await cell.getText(), 10)}));
            expect(idCellsValuesA).toEqual(idCellsSortedAsc);
        })
        it('Check Age descending order', async function () {
            const idCells = await $$('//*[@tabulator-field="age" and @class="tabulator-cell"]');
            const idCellsValues = await Promise.all(idCells.map(async (cell) => { return parseInt(await cell.getText(), 10) }));            
            const idCellsSortedDesc = Array.from(idCellsValues).sort((a, b) => (b - a));
            const idSortButton = await $('//*[@tabulator-field="age" and @role="columnheader"]');
            await idSortButton.click();
            await browser.pause(1000);
            const idCellsD = await $$('//*[@tabulator-field="age" and @class="tabulator-cell"]');
            const idCellsValuesD = await Promise.all(idCellsD.map(async (cell)=>{return parseInt(await cell.getText(), 10)}));
            expect(idCellsValuesD).toEqual(idCellsSortedDesc);
        })
    })
    
})