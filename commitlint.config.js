module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'hotfix',
        'revert',
        'chore',
        'ci',
        'test',
        'perf',
        'db',
      ],
    ],
  },
};
