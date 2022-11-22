<template>
  <h1 class="text-white center" v-if="!tasks.length">Задач пока нет</h1>

  <template v-else>
    <h3 class="text-white">Всего активных задач: {{ activeCount }}</h3>
    <div class="card" v-for="task in tasks" :key="task.id">
      <h2 class="card-title">
        {{ task.title }}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{ new Date(task.date).toLocaleDateString() }}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="openTask(task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AppStatus from '../components/AppStatus'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const tasks = computed(() => store.state.tasks)
    const activeCount = computed(() => store.getters.activeTasksCount)

    const openTask = (id) => {
      router.push(`task/${id}`)
    }
    return {
      tasks,
      activeCount,
      openTask,
      store
    }
  },
  components: { AppStatus }
}
</script>
