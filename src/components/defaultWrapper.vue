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
    document.arrive(vm.componentClassSelector, function () {
      if (!vm.componentInstance) {
        vm.componentInstance = vm.instantiate(vm.componentClassSelector, vm)
      }
      vm.$emit('ready', vm, vm.componentClassSelector)
    })
    document.leave(vm.componentClassSelector, function () {
      vm.componentInstance.$destroy()
      vm.componentInstance = null
      vm.$emit('destroy', vm)
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
  beforeDestroy () {
    let vm = this
    for (const el of document.querySelectorAll(vm.componentClassSelector)) {
      el.remove()
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
