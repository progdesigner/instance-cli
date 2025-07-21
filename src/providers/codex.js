const { BaseProvider } = require('./base');
const ora = require('ora');

class CodexProvider extends BaseProvider {
  constructor() {
    super();
    this.apiKey = process.env.CODEX_API_KEY;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async sendMessage(message) {
    this.validateAPIKey();
    
    const spinner = ora('Codex가 응답을 생성하고 있습니다...').start();
    
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.choices[0].message.content;
      
      spinner.succeed('응답 완료!');
      return text;
    } catch (error) {
      spinner.fail('요청 실패');
      throw new Error(`Codex API 오류: ${error.message}`);
    }
  }
}

module.exports = { CodexProvider }; 