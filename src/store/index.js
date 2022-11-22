import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: []
  },
  getters: {
    activeTasksCount ({ tasks }) {
      const activeTasks = tasks.filter((t) => t.status === 'active')
      return activeTasks.length
    }
  },
  mutations: {
    addTask ({ tasks }, task) {
      const status = Date.now() > task.date.getTime() ? 'cancelled' : 'active'
      tasks.push({ ...task, status })
    },
    changeStatus ({ tasks }, { id, status }) {
      tasks.find((t) => t.id === id).status = status
    }
  },
  actions: {
    async getTasks ({ state }) {
      try {
        const response = await fetch(
          'https://coursework-freelance-default-rtdb.firebaseio.com/tasks.json'
        )
        const data = await response.json()
        state.tasks = Object.keys(data).map((key) => {
          return { id: key, ...data[key] }
        })
      } catch (error) {
        throw new Error(error)
      }
    },
    async postTask ({ commit }, task) {
      try {
        const response = await fetch(
          'https://coursework-freelance-default-rtdb.firebaseio.com/tasks.json',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
          }
        )
        const data = await response.json()
        commit('addTask', { ...task, id: data.name })
      } catch (error) {
        throw new Error(error)
      }
    },
    async changeTaskStatus ({ commit }, { id, status }) {
      try {
        await fetch(
          `https://coursework-freelance-default-rtdb.firebaseio.com/tasks/${id}/status.json`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(status)
          }
        )
        commit('changeStatus', { id, status })
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  modules: {}
})
