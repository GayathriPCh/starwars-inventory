import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set this in your .env file
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const result = await openai.createCompletion({
      model: 'gpt-3.5-turbo', // You can choose other models like 'gpt-3.5-turbo'
      prompt,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.5,
    });

    res.status(200).json(result.data.choices[0].text);
  } catch (error) {
    console.error('Error in API:', error);
    res.status(500).json({ message: 'An error occurred while processing the request.', error: error.message });
  }
}
