import 'dotenv/config';
import OpenAI from 'openai';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import getArticleContent from './getURL.js';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.apiKey,
});

async function main(articleContent) {

    if (!articleContent) {
        console.log('No text available for analysis.');
        return;
    }

    const result = await openai.chat.completions.create({
        model: 'google/gemini-3-flash-preview',
        max_tokens: 500,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: `\n\n${articleContent}`,
                    },
                ],
            },
        ],
        stream: false,
    }
    );


    console.log(result.choices[0].message.content)
}

async function startApp() {
    const rl = readline.createInterface({ input, output });

    const answer = await rl.question('Enter your question: ');
    rl.close();
    const articleContent = await getArticleContent(answer);
    await main(articleContent);

}

startApp();

export default startApp;