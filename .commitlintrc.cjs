const fs = require('node:fs')
const path = require('node:path')

const packages = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', [...packages]]
  },
  prompt: {
    types: [
      {
        value: 'feat',
        name: 'feat:      ✨  A new feature',
        emoji: '✨'
      },
      {
        value: 'fix',
        name: 'fix:       🐛  A bug fix',
        emoji: '🐛'
      },
      {
        value: 'docs',
        name: 'docs:      📚  Documentation only changes',
        emoji: '📚'
      },
      {
        value: 'style',
        name: 'style:     🎨  Changes that do not affect the meaning of the code',
        emoji: '🎨'
      },
      {
        value: 'refactor',
        name: 'refactor:  🌈  A code change that neither fixes a bug nor adds a feature',
        emoji: '🌈'
      },
      {
        value: 'perf',
        name: 'perf:      ⚡️  A code change that improves performance',
        emoji: '⚡️'
      },
      {
        value: 'test',
        name: 'test:      🧪  Adding missing tests or correcting existing tests',
        emoji: '🧪'
      },
      {
        value: 'build',
        name: 'build:     📦  Changes that affect the build system or external dependencies',
        emoji: '📦'
      },
      {
        value: 'ci',
        name: 'ci:        🎡  Changes to our CI configuration files and scripts',
        emoji: '🎡'
      },
      {
        value: 'revert',
        name: 'revert:    ⏪️  Reverts a previous commit',
        emoji: '⏪️'
      },
      {
        value: 'wip',
        name: 'wip:       🕔  Work in process',
        emoji: '🕔'
      },
      {
        value: 'chore',
        name: "chore:     🔨  Other changes that don't modify src or test files",
        emoji: '🔨'
      }
    ],
    useEmoji: true,
    emojiAlign: 'center'
  }
}
