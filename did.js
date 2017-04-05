#!/usr/bin/env node

const config = new (require('conf'))()
const args = process.argv.slice(2)
const todos = config.get('todos') || []

const logAndExit = () => {
  todos.forEach(todo => console.log('• ' + todo))
  process.exit(0)
}

const deleteAndExit = index => {
  const chalk = require('chalk')
  todos.forEach((todo, i) =>
    i === index
      ? console.log(chalk.red('- ' + todo))
      : console.log('• ' + todo)
  )
  todos.splice(index, 1)
  config.set('todos', todos)
  process.exit(0)
}

// no args passed
if (args.length === 0) {
  logAndExit()
}

const delTodo = args.join(' ')
const delIndex = todos.indexOf(delTodo)

// exact hit
if (delIndex !== -1) {
  deleteAndExit(delIndex)
}

const indirectHits = todos
  .filter(item => item.indexOf(delTodo) > -1)

// no indirect hits
if (indirectHits.length === 0) {
  logAndExit()
}

const inquirer = require('inquirer')

inquirer.prompt([{
  type: 'list',
  name: 'hit',
  message: 'Did you mean?',
  choices: indirectHits
}])
.then(({ hit }) => {
  // indirect hit
  deleteAndExit(todos.indexOf(hit))
})
