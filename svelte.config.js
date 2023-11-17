// import adapter from "@sveltejs/adapter-auto";
import vercel from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess()],
	kit: {
		adapter: vercel({
			// make explicit -- vercel does not yet support later node versions
			runtime: "nodejs18.x",
		}),
		alias: {
			$atoms: "./src/lib/components/atoms",
			$assets: "./src/lib/assets",
			$components: "./src/lib/components",
			$data: "./src/lib/data",
			$molecules: "./src/lib/components/molecules",
			$organisms: "./src/lib/components/organisms",
			$settings: "./src/lib/settings",
			$stores: "./src/lib/stores",
			$tools: "./src/lib/components/tools",
			$types: "./src/lib/types",
			$utils: "./src/lib/utils",
		},
		csp: {
			directives: {
				"object-src": ["none"],
				"script-src": [
				"self",
				"https://plausible.io",
				"sha256-+X7Z1KW2Vcl9pendYbp0FYL6F0HZek43aBP/14cwq+U=",
        // ^^ for sentry inline script
        // more info: https://github.com/getsentry/sentry-javascript/issues/8925
				],
				"style-src": ["self", "unsafe-inline"],
				"worker-src": ["self"],
				"frame-src": ["none"],
				"child-src": ["self"]
			},
		},
	},
};

export default config;
