# Project Creation Steps

## Creating project using vue/cli

```
vue create component-name
```
* select `Manually select features`   
* select `Babel`, `TypeScript`, `Progressive Web App (PWA) Support`, `Linter / Formatter`  
* select `3.x`  
* say yes to `class-style component syntax`  
* say yes to `Babel alongside TypeScript`  
* select `ESLint`  
* select `Lint on save`
* select `In dedicated config files`

## Tailwind Configuration

### Install Tailwind CSS  
run the commands in terminal to  
`npm install -D tailwindcss postcss autoprefixer`  
`npx tailwindcss init -p`  

### Configure your template paths  
Add the paths to all of your template files in your tailwind.config.cjs file.  
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add the Tailwind directives to your CSS  
Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.  
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Flowbite Configuration

### Install Flowbite and Flowbite-vue
Install flowbite and flowbite-vue as a dependency using NPM by running the following command:  
`npm i flowbite flowbite-vue`

Require Flowbite as a plugin inside the tailwind.config.js and add flowbite-vue dist folder to tailwind content:
```
module.exports = {
  content: [
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
      require('flowbite/plugin')
  ],
  theme: {}
}
```

## Vue Styleguidist Configuration

### Install  

`npm install --save-dev vue-styleguidist`  

If you use Vue CLI 3 (@vue/cli (opens new window)), you should probably use the plugin

`vue add styleguidist`

### Add npm scripts for convenience
Add these scripts to your package.json:  
```
{
  "scripts": {
    "styleguide": "vue-cli-service styleguidist",
    "styleguide:build": "vue-cli-service styleguidist:build"
  }
}
```

### Start your style guide
Run `npm run styleguide` to start style a guide dev server.

Run `npm run styleguide:build` to build a static version

