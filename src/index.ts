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
