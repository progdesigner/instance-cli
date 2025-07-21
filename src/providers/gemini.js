const { GoogleGenerativeAI } = require('@google/generative-ai');
const { BaseProvider } = require('./base');
const ora = require('ora');

class GeminiProvider extends BaseProvider {
  constructor() {
    super();
    this.apiKey = process.env.GEMINI_API_KEY;
    this.genAI = null;
    this.model = null;
    
    if (this.apiKey) {
      this.genAI = new GoogleGenerativeAI(this.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }
  }

  async sendMessage(message) {
    this.validateAPIKey();
    
    const spinner = ora('Gemini가 응답을 생성하고 있습니다...').start();
    
    try {
      const result = await this.model.generateContent(message);
      const response = await result.response;
      const text = response.text();
      
      spinner.succeed('응답 완료!');
      return text;
    } catch (error) {
      spinner.fail('요청 실패');
      throw new Error(`Gemini API 오류: ${error.message}`);
    }
  }
}

module.exports = { GeminiProvider }; 