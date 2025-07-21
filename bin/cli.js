#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { GeminiProvider } = require('../src/providers/gemini');
const { ClaudeProvider } = require('../src/providers/claude');
const { CodexProvider } = require('../src/providers/codex');
require('dotenv').config();

program
  .name('instance')
  .description('AI 모델들과 통신하는 CLI 도구')
  .version('1.0.0');

program
  .command('chat')
  .description('AI 모델과 대화하기')
  .option('-m, --model <model>', '사용할 AI 모델 (gemini, claude, codex)', 'gemini')
  .option('-p, --prompt <prompt>', '프롬프트 텍스트')
  .option('-i, --interactive', '대화형 모드로 실행')
  .action(async (options) => {
    try {
      let provider;
      
      switch (options.model.toLowerCase()) {
        case 'gemini':
          provider = new GeminiProvider();
          break;
        case 'claude':
          provider = new ClaudeProvider();
          break;
        case 'codex':
          provider = new CodexProvider();
          break;
        default:
          console.error(chalk.red('지원하지 않는 모델입니다. gemini, claude, codex 중 선택해주세요.'));
          process.exit(1);
      }

      if (options.interactive) {
        await interactiveMode(provider);
      } else if (options.prompt) {
        const response = await provider.sendMessage(options.prompt);
        console.log(chalk.green('\n답변:'));
        console.log(response);
      } else {
        console.error(chalk.red('프롬프트를 입력하거나 --interactive 옵션을 사용해주세요.'));
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('오류가 발생했습니다:'), error.message);
      process.exit(1);
    }
  });

program
  .command('setup')
  .description('API 키 설정')
  .action(async () => {
    await setupAPIKeys();
  });

async function interactiveMode(provider) {
  console.log(chalk.blue('대화형 모드가 시작되었습니다. 종료하려면 "quit" 또는 "exit"를 입력하세요.\n'));
  
  while (true) {
    const { message } = await inquirer.prompt([
      {
        type: 'input',
        name: 'message',
        message: chalk.yellow('메시지를 입력하세요:'),
        validate: (input) => {
          if (!input.trim()) {
            return '메시지를 입력해주세요.';
          }
          return true;
        }
      }
    ]);

    if (['quit', 'exit', '종료'].includes(message.toLowerCase())) {
      console.log(chalk.blue('대화를 종료합니다.'));
      break;
    }

    try {
      const response = await provider.sendMessage(message);
      console.log(chalk.green('\n답변:'));
      console.log(response);
      console.log('\n' + '='.repeat(50) + '\n');
    } catch (error) {
      console.error(chalk.red('오류가 발생했습니다:'), error.message);
    }
  }
}

async function setupAPIKeys() {
  console.log(chalk.blue('API 키 설정을 시작합니다.\n'));
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'geminiKey',
      message: 'Gemini API 키를 입력하세요 (선택사항):',
      default: process.env.GEMINI_API_KEY || ''
    },
    {
      type: 'input',
      name: 'claudeKey',
      message: 'Claude API 키를 입력하세요 (선택사항):',
      default: process.env.CLAUDE_API_KEY || ''
    },
    {
      type: 'input',
      name: 'codexKey',
      message: 'Codex API 키를 입력하세요 (선택사항):',
      default: process.env.CODEX_API_KEY || ''
    }
  ]);

  // .env 파일에 저장
  const fs = require('fs');
  const envContent = `# AI CLI API Keys
GEMINI_API_KEY=${answers.geminiKey}
CLAUDE_API_KEY=${answers.claudeKey}
CODEX_API_KEY=${answers.codexKey}
`;

  fs.writeFileSync('.env', envContent);
  console.log(chalk.green('\nAPI 키가 .env 파일에 저장되었습니다.'));
}

program.parse(); 