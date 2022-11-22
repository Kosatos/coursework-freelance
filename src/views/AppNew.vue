<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1>Создать новую задачу</h1>
    <div class="form-control">
      <label for="title">Название</label>
      <input type="text" id="title" v-model="title" />
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input type="date" id="date" v-model="date" />
    </div>

    <div class="form-control">
      <label for="description">Описание</label>
      <textarea id="description" v-model="description"></textarea>
    </div>

    <button class="btn primary" :disabled="formIsInvalid">Создать</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const title = ref('')
    const date = ref('')
    const description = ref('')

    const formIsInvalid = computed(() => {
      return !title.value || !date.value || !description.value
    })

    const onSubmit = () => {
      store.dispatch('postTask', {
        title: title.value,
        date: new Date(date.value),
        description: description.value,
        status: 'active'
      })
      router.push('/')
    }

    return {
      title,
      date,
      description,
      onSubmit,
      formIsInvalid
    }
  }
}
</script>
