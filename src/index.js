import 'arrive'
import defaultWrapper from './components/defaultWrapper.vue'

const plugin = {
	install (Vue, options = {
		componentName: 'l-icon-wrapper'
	}) {
		Vue.component(options.componentName, defaultWrapper)
	}
}

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

export {
  plugin
};
export default defaultWrapper;