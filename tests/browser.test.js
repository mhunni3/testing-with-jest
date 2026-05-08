const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

// Här anger vi var testfilen ska hämtas. De konstiga replaceAll-funktionerna ersätter
// mellanslag med URL-säkra '%20' och backslash (\) på Windows med slash (/).
const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 1); // 5 minuter / Ändrat till 1 minut Martin Frick

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});

describe('"top_of_stack" should display correct element after sequnce of push and pop ', () => {
   
    it('should open a prompt box for push', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("nbr1");
        await alert.accept();

        let stack1 = await driver.findElement(By.id('top_of_stack')).getText();
        expect(stack1).toEqual("nbr1");
    });

    it('should open another prompt box for push', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("nbr2");
        await alert.accept();

        let stack2 = await driver.findElement(By.id('top_of_stack')).getText();
        expect(stack2).toEqual("nbr2");
    });

  
    it('should open a prompt box for pop', async () => {
        let push = await driver.findElement(By.id('pop'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.accept();

        let stack3 = await driver.findElement(By.id('top_of_stack')).getText();
        expect(stack3).toEqual("nbr2");
    });

    it('should click "Vad finns överst på stacken?"', async () => {
        let push = await driver.findElement(By.id('peek'));
        await push.click();
      
        let stack4 = await driver.findElement(By.id('top_of_stack')).getText();
        expect(stack4).toEqual("nbr1");
    });

});