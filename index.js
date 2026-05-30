import 'dotenv/config';
import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.apiKey,
});

async function main() {
    const url = 'https://en.wikipedia.org/wiki/Jane_Seymour';
    const response = await axios.get(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });

    const html = response.data;
    const articleContent = html.replace(/<[^>]*>/g, '').substring(0, 5000);

    const result = await openai.chat.completions.create({
        model: 'google/gemini-3-flash-preview',
        max_tokens: 500,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: `What's is this arcticale about?:\n\n${articleContent}`,
                    },
                ],
            },
        ],
        stream: false,
    }
    );
    console.log(result.choices[0].message.content)
}

main();