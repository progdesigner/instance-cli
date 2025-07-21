const { BaseProvider } = require('./base');
const ora = require('ora');

class ClaudeProvider extends BaseProvider {
  constructor() {
    super();
    this.apiKey = process.env.CLAUDE_API_KEY;
    this.apiUrl = 'https://api.anthropic.com/v1/messages';
  }

  async sendMessage(message) {
    this.validateAPIKey();
    
    const spinner = ora('Claude가 응답을 생성하고 있습니다...').start();
    
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: message
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const text = data.content[0].text;
      
      spinner.succeed('응답 완료!');
      return text;
    } catch (error) {
      spinner.fail('요청 실패');
      throw new Error(`Claude API 오류: ${error.message}`);
    }
  }
}

module.exports = { ClaudeProvider }; 