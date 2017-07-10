callback = console.log.bind(console)
process.on('foo', callback)
process.emit('foo', 'bar')
// bar
process.removeListener('foo', callback)
