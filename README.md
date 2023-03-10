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

You can also check official tailwind installation [here](https://tailwindcss.com/docs/installation/using-postcss)

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


---

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

---

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

---

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

---

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
      fileName: (format) => `tailwind-ui-500.${format}.js`,
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
---
## Configure `package.json`

```
"name": "tailwing-ui-500",
```
give the package name based on the component you build

```
"private": true,
```
keep private true as we building modules to ourself which should not be exposed to others

```
"version": "0.1.0",
```

```
"main": "dist/tailwind-ui-500.cjs.js",
```
main is a module ID that is the primary entry point to your program.

```
"module":"dist/tailwind-ui-500.es.js",
```
module is a common convention among bundlers to designate how to import an ESM version of our library.

```"files": [ "dist" ],```
The optional files field is an array of file patterns that describes the entries to be included when your package is installed as a dependency.

```
"scripts": {
    "dev": "vite",
    "build": "vite build && npm run build:styles",
    "build:styles": "postcss src/main.css -o dist/index.css",
    "preview": "vite preview"
  },
```
To run and build the package

```
"dependencies": {
    "vue": "^3.2.45"
  },
```  
Dependencies are specified in a simple object that maps a package name to a version range. The version range is a string which has one or more space-separated descriptors.

```
 "peerDependencies": {
    "vue": "^3.2.45"
  },
```
This is usually referred to as a plugin. Notably, your module may be exposing a specific interface, expected and specified by the host documentation.

```

"devDependencies": {
    "@vitejs/plugin-vue": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "flowbite": "^1.6.3",
    "flowbite-vue": "^0.0.10",
    "postcss": "^8.4.21",
    "postcss-cli": "^10.0.0",
    "tailwindcss": "^3.2.7",
    "typescript": "^4.9.3",
    "vite": "^4.1.0",
    "vue-tsc": "^1.0.24"
  }
```

If someone is planning on downloading and using your module in their program, then they probably don't want or need to download and build the external test or documentation framework that you use.

**devDependencies** will vary depending on the requirement

---

## File structure

 - public  
 - src  
 - assets  
 - - components  
 - - - Button  
 - - - - MButton.vue  
 - - - - index.ts
 - - - Modal  
 - - - - MModal.vue  
 - - - - index.ts  
 - - - index.ts  
 - - index.ts  
 - .gitignore  
 - index.html  
 - package.json  
 - postcss.config.cjs  
 - README.md  
 - tailwind.config.cjs  
 - tsconfig.json  
 - tsconfig.node.json  
 - vite.config.js  
 - yarn.lock 

### src/components/Button/MButton.vue
```
<template>
  <button type="button" :class="btnClass"><slot /></button>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
const props = defineProps({
  variant: String,
});
const btnClass = ref("");
switch (props.variant) {
  case "default":
    btnClass.value =
      "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800";
    break;
  case "dark":
    btnClass.value =
      "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700";
    break;
  case "alternative":
    btnClass.value =
      "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700";
    break;
  case "light":
    btnClass.value =
      "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
    break;
  case "green":
    btnClass.value =
      "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
    break;
  case "red":
    btnClass.value =
      "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
    break;
  case "yellow":
    btnClass.value =
      "focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900";
    break;
  case "purple":
    btnClass.value =
      "focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
    break;
}
</script>

```

### src/components/Button/index.ts

Export the **MButton** component as default and individually.

```
import MButton from './MButton.vue'

export { MButton }
export default MButton

```

### src/components/index.ts

```
import MButton from './Button'
import MModal from './Button'


export default { MButton,MModal }
```

### src/index.ts
```
import * as components from './components';

const defaultComponents:any = components?.default;
const MarirsComponents = {
  install(Vue:any) {
    Object.keys(defaultComponents).forEach(name => {
      Vue.component(name, defaultComponents[name]);
    });
  },
}
export default MarirsComponents;

export { MButton } from "./components/Button";
export { MModal } from "./components/Modal";

```

## StyleGuide configuration

---

## Vitest Configuration

---

## Build Package

Run the `yarn build` command to build the component project

---


