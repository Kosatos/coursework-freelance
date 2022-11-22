<template>
  <span :class="['badge', typeClass]">{{ title }}</span>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  props: {
    type: {
      type: String,
      validator (value) {
        return ['active', 'done', 'cancelled', 'pending'].includes(value)
      }
    }
  },
  setup (props) {
    return {
      title: computed(() => {
        switch (props.type) {
          case 'active':
            return 'Активен'
          case 'done':
            return 'Завершен'
          case 'cancelled':
            return 'Отменен'
          case 'pending':
            return 'Выполняется'
          default:
        }
      }),
      typeClass: computed(() => {
        switch (props.type) {
          case 'cancelled':
            return 'danger'
          case 'pending':
            return 'warning'
          default:
            return 'primary'
        }
      })
    }
  }
}
</script>
