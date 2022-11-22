<template>
  <div class="card" v-if="task">
    <h2>{{ task.title }}</h2>
    <p>
      <strong>Статус</strong>:
      <AppStatus :type="task.status" />
    </p>
    <p>
      <strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}
    </p>
    <p><strong>Описание</strong>: {{ task.description }}</p>
    <div>
      <button class="btn" @click="onChangeStatus('pending')">
        Взять в работу
      </button>
      <button class="btn primary" @click="onChangeStatus('done')">
        Завершить
      </button>
      <button class="btn danger" @click="onChangeStatus('cancelled')">
        Отменить
      </button>
    </div>
  </div>
  <h3 class="text-white center" v-else>
    Задачи с id = <strong>{{ props.id }}</strong> нет.
  </h3>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
import AppStatus from '../components/AppStatus'

export default {
  props: ['id'],
  setup (props) {
    const store = useStore()

    const task = computed(() =>
      store.state.tasks.find((t) => t.id === props.id)
    )

    const onChangeStatus = (status) => {
      store.dispatch('changeTaskStatus', { id: task.value.id, status })
    }

    return {
      task,
      props,
      onChangeStatus
    }
  },
  components: { AppStatus }
}
</script>

<style scoped></style>
