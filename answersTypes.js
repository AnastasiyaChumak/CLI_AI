import * as readline from 'node:readline/promises';
import getURLContent from './getURL.js';
import { stdin as input, stdout as output } from 'node:process';
import main from './main.js';

async function startApp() {
    const rl = readline.createInterface({ input, output });
    const answer = await rl.question('Enter your question: ');
    rl.close();

    if (!answer) {
        console.log('No text available for analysis.');
        return;
    }

    if (answer.startsWith('http://') || answer.startsWith('https://')) {
        const isValid = URL.canParse(answer);
        if (isValid) {
            console.log('Valid URL detected. Fetching content...');
            const articleContent = await getURLContent(answer);
            main(articleContent);
        } else {
            console.log('No valid URL detected');
        }
    } else {
        console.log("Loading...")
        await main(answer);
    }


}
startApp();

export default startApp;