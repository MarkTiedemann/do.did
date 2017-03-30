#!/usr/bin/env node

const config = new (require('conf'))()
const args = process.argv.slice(2)
const todos = config.get('todos') || []

todos.forEach(todo => console.log('- ' + todo))

if (args.length > 0) {
  const chalk = require('chalk')
  const newTodo = args.join(' ')
  todos.push(newTodo)
  config.set('todos', todos)
  console.log(chalk.green('+ ' + newTodo))
}
