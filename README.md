# Npm package creation and setup steps

## Creating a project using Vite

```
npm create vite@latest
```
![image](https://user-images.githubusercontent.com/84120886/224308865-e17663bf-6586-46fa-8981-3bcfbf4037e3.png)

Give project name or component name by following component naming pattern

![image](https://user-images.githubusercontent.com/84120886/224309141-5b1db45d-2f0b-4bda-95d2-69b21e40c320.png)

Select Vue as framework
![image](https://user-images.githubusercontent.com/84120886/224309269-e02b9d29-f32d-4460-bcb0-3c06c44f6c15.png)

Select TypeScript as variant language
![image](https://user-images.githubusercontent.com/84120886/224309450-ba184617-8f26-4f6a-9cd4-e1e5d3147c04.png)

Run the commands and open project in VS code
![image](https://user-images.githubusercontent.com/84120886/224309839-1231c528-a9f7-40c8-a3de-0b2de76178d1.png)

## Tailwind Configuration

### Step 1
![image](https://user-images.githubusercontent.com/84120886/224310180-686c835a-ebeb-4900-a0c3-bbee5a748f61.png)

### Step 2
![image](https://user-images.githubusercontent.com/84120886/224310261-efa82614-db65-4b1b-b95e-ba1eacae6f9a.png)

If `postcss.config.js` is not created then create it and add above code.

If you facing below error while building the component 
![image](https://user-images.githubusercontent.com/84120886/224310878-ab71aeda-0af0-4ec1-bef5-502db596aa20.png)
change the `postcss.config.js` to `postcss.config.cjs`

### Step 3
![image](https://user-images.githubusercontent.com/84120886/224311054-612ae6ec-69b1-4d64-bc6a-80809886e363.png)



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

