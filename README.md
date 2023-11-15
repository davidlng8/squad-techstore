# Techstore Storefront
#### _E-Commerce store prototype (React with Typescript)_

## Running the application locally

Please ensure you're able to connect to an instance of the [squad-techstore-service](https://github.com/davidlng8/squad-techstore-service)
- Run this locally using Docker or via a provider of your choice.
- If you're running it locally you may run into CORS issues. You can resolve by configuring a proxy in both the vite.ts.config and the package.json files

#### In the vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api-items': 'http://localhost:{your configured docker app port}',
    },
  },
})
```

#### In the package.json
Add the folloing line to the top level configs.

```json
"proxy" : "http://localhost:8082/",
```


#### Starting the APP
```sh
cd ./squad-techstore
npm install
npm run dev
```

Then in your browser: Navigate to the URL eg: http://localhost:8082

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
