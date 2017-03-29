#!/usr/bin/env node

const config = new (require('conf'))()
const args = process.argv.slice(2)
const todos = config.get('todos') || []

if (args.length > 0) {
  const delTodo = args.join(' ')
  const delIndex = todos.indexOf(delTodo)
  if (delIndex !== -1) {
    todos.splice(delIndex, 1)
    config.set('todos', todos)
  }
}

todos.forEach(todo => console.log(todo))
