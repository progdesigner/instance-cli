class BaseProvider {
  constructor() {
    this.apiKey = null;
  }

  async sendMessage(message) {
    throw new Error('sendMessage 메서드가 구현되지 않았습니다.');
  }

  validateAPIKey() {
    if (!this.apiKey) {
      throw new Error('API 키가 설정되지 않았습니다. ai-cli setup 명령어로 설정해주세요.');
    }
  }
}

module.exports = { BaseProvider }; 