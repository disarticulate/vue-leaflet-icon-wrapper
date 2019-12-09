<template>
  <component :class="componentClassRef"
    :ref="componentClassRef"
    :is="component"
  >
    <slot></slot>
  </component>
</template>
<script>
import { uuid } from '../utils/uuid'
export default {
  name: 'leafletIconWrapper',
  props: {
    component: {
      type: String
    }
  },
  data () {
    return {
      componentInstance: null
    }
  },
  mounted () {
    let vm = this
    document.arrive(vm.componentClassSelector, function () {
      if (!vm.componentInstance) {
        vm.componentInstance = vm.instantiate(vm.componentClassSelector, vm)
      }
    })
    document.leave(vm.componentClassSelector, function () {
      vm.componentInstance.$destroy()
      vm.componentInstance = null
    })
  },
  methods: {
    instantiate (selector, vm) {
      let exists = vm.$refs[vm.componentClassRef]
      let Component = Vue.extend(exists.constructor)
      return new Component({
        ...exists.$options,
        el: selector
      })
    }
  },
  computed: {
    componentClassRef () {
      return `wrap-icon-${uuid()}`
    },
    componentClassSelector () {
      return `.leaflet-marker-icon > .${this.componentClassRef}`
    }
  }
}
</script>
