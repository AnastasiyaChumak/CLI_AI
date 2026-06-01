import axios from 'axios';

async function getURLContent(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const html = response.data;
        const articleContent = html.replace(/<[^>]*>/g, '').substring(0, 5000);
        
        return articleContent;
    } catch (error) {
        console.error('Oh error:', error.message);
        return null;
    }
}

export default getURLContent;