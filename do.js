#!/usr/bin/env node

const config = new (require('conf'))()
const args = process.argv.slice(2)
const todos = config.get('todos') || []

if (args.length > 0) {
  const newTodo = args.join(' ')
  todos.push(newTodo)
  config.set('todos', todos)
}

todos.forEach(todo => console.log(todo))
