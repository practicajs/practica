// prepare.js
try {
 require('husky').install()
} catch(e) {
	// Fail silently on install, CI for example
}
