/** @type {import('@remix-run/dev').AppConfig} */
const { flatRoutes } = require('remix-flat-routes')
// import { flatRoutes } from 'remix-flat-routes'

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  tailwind: true,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  serverPlatform: 'node',
  postcss: true,
  watchPaths: ['./tailwind.config.ts'],
  serverModuleFormat: "cjs",
  future: {
    v2_headers: true,
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
    // v2_dev: true,
  },
  // routes: async defineRoutes => {
  //   return flatRoutes('routes', defineRoutes)
  // },
  routes: async defineRoutes => {
    return flatRoutes('routes', defineRoutes, {
      ignoredRouteFiles: [
        '.*',
        '**/*.css',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/__*.*',
      ],
    })
  },
};
