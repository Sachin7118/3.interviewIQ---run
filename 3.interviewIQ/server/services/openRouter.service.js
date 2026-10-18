import axios from "axios"

export const askAi = async (messages, options = {}) => {
    try {
        if(!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty.");
        }
        const payload = {
            model: options.model || "openai/gpt-4o-mini",
            messages: messages,
            ...(options.max_tokens ? { max_tokens: options.max_tokens } : {}),
            ...(options.temperature !== undefined ? { temperature: options.temperature } : {}),
        };

        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",
            payload,
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                timeout: options.timeout || 25000,
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content;

        if (!content || !content.trim()) {
            throw new Error("AI returned empty response.");
        }

        return content;
    } catch (error) {
        console.error("OpenRouter Error:", error.response?.data || error.message);
        const errMsg = error.response?.data?.error?.message || error.message || "OpenRouter API Error";
        throw new Error(errMsg);
    }
}