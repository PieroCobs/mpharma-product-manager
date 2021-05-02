
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const path = require('path');


const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();


app.prepare().then(() => {
	createServer((req, res) => {
		// parse request url to get its pathname
		const parsedUrl = parse(req.url, true);
		const { pathname, query } = parsedUrl;

		// serve serviceWorker as static file if requested
		if (pathname === '/service-worker.js') {
			const filePath = path.join(__dirname, 'next', pathname);
			app.serveStatic(req, res, filePath);
		}
		// else let next take care of rendering
		else handle(req, res, parsedUrl);
	})
		.listen(process.env.CUSTOM_PORT, () => {
			console.log(`> Ready on http://localhost:${process.env.CUSTOM_PORT}`)
		})
});