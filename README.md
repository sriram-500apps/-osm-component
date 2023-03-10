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

---

## Tailwind Configuration

### Step 1
> ![image](https://user-images.githubusercontent.com/84120886/224310180-686c835a-ebeb-4900-a0c3-bbee5a748f61.png)



### Step 2
> ![image](https://user-images.githubusercontent.com/84120886/224310261-efa82614-db65-4b1b-b95e-ba1eacae6f9a.png)

If `postcss.config.js` is not created then create it and add above code.

If you facing below error while building the component 
> ![image](https://user-images.githubusercontent.com/84120886/224310878-ab71aeda-0af0-4ec1-bef5-502db596aa20.png)
change the `postcss.config.js` to `postcss.config.cjs`

### Step 3
> ![image](https://user-images.githubusercontent.com/84120886/224311321-58de05fd-d785-4745-8eff-7f55f747fbe2.png)

### Step 4
> ![image](https://user-images.githubusercontent.com/84120886/224311466-6e30661e-110f-487b-a3e3-9b78295d6e8b.png)

### Step 5
import `main.css` file in `main.ts` file
> ![image](https://user-images.githubusercontent.com/84120886/224311762-d7a31a8e-3b98-4683-a5ca-7bd1246d82c7.png)

You can also check official tailwind installation [here](https://tailwindcss.com/docs/installation/using-postcss)

## Flowbite Configuration

### Step 1

```yarn add -D flowbite```

### Step 2

Add Flowbite as a plugin inside the tailwind.config.js and add flowbite files to tailwind content:  
```
module.exports = {
  content: [
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
      require('flowbite/plugin')
  ],
  theme: {}
}
```

## Step 3
import flowbite in main.ts file
> ![image](https://user-images.githubusercontent.com/84120886/224313759-b1757122-2e6d-46f4-8c6e-1cadfc8e623d.png)

## Configure `tsconfig.json` like this

```
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## After tailwind and flowbite setup your `tailwind.config.cjs` looks like this

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,vue}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};

```

## Configure `vite.config.js` like this
```
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `component-name.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        preserveModules: true,
        exports: "named",
      },
    },
  },
});

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

