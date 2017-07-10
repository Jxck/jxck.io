callback = console.log.bind(console)
$div = document.createElement('div')
$div.addEventListener('foo', callback)
$div.dispatchEvent(new CustomEvent('foo', {detail:'bar'}))
// CustomEvent {type: "foo", detail: 'bar'...
$div.removeEventListener('foo', callback)
