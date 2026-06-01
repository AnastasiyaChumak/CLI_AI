import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.API_KEY,
});

async function main(answerTypes) {

    const result = await openai.chat.completions.create({
        model: 'google/gemini-3-flash-preview',
        max_tokens: 500,
        messages: [
            {
                role: 'user',
                content: [
                    {
                        type: 'text',
                        text: `\n\n${answerTypes}`,
                    },
                ],
            },
        ],
        stream: false,
    }
    );
    console.log(result.choices[0].message.content)
}

export default main;
