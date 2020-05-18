<template>
  <component :class="componentClassRef"
    :ref="componentClassRef"
    :is="component"
    v-bind="componentProps"
  >
    <slot></slot>
  </component>
</template>
<script>
import Vue from 'vue'
import { uuid } from '../utils/uuid'
export default {
  name: 'leafletIconWrapper',
  props: {
    parentVm: Object,
    component: {
      type: String
    },
    componentProps: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      componentInstance: null
    }
  },
  mounted () {
    let vm = this
    document.arrive(vm.componentClassSelector, vm.hasComponent)
    document.leave(vm.componentClassSelector, vm.destroyComponent)
  },
  methods: {
    hasComponent () {
      let vm = this
      if (!vm.componentInstance) {
        vm.componentInstance = vm.instantiate(vm.componentClassSelector, vm)
      }
      document.unbindArrive(vm.componentClassSelector, vm.hasComponent)
    },
    destroyComponent () {
      let vm = this
      if (vm.componentInstance) {
        vm.componentInstance.$destroy()
        vm.componentInstance = null
      }
      document.unbindLeave(vm.componentClassSelector, vm.destroyComponent)
    },
    instantiate (selector, vm) {
      let exists = vm.$refs[vm.componentClassRef]
      let Component = Vue.extend(exists.constructor)
      return new Component({
        ...exists.$options,
        parent: vm.parentVm,
        el: selector
      })
    }
  },
  beforeDestroy () {
    let vm = this
    vm.destroyComponent()
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
