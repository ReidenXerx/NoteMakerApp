import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
state: {
  notesData: [{
    name: 'StoreTest1',
    todos: [
      { text: 'lorem ipsum', isChecked: true },
      { text: 'text2', isChecked: false },
      { text: 'text1', isChecked: true }
    ]
  },
  {
    name: 'StoreTest2',
    todos: [
      { text: 'text1', isChecked: true },
      { text: 'text2', isChecked: false },
      { text: 'text1', isChecked: true }
    ]
  }]
},
mutations: {
  removeNote (state, index) {
    state.notesData.splice(index, 1)
  },
  addNote (state, note) {
    state.notesData.push(note)
  },
  addEmptyNote (state) {
    state.notesData.push({
      name: '',
      todos: []
    })
  },
  editNote (state, args) {
    // args[0] - note, arga[1] - noteid
    Object.assign(state.notesData[args[1]], args[0], {
      name: args[0].name,
      todos: JSON.parse(JSON.stringify(args[0].todos))
    })
  }
},
getters: {
  getNotesData: (state) => { return state.notesData },
  getNotesDataId: (state) => (id) => { return state.notesData[id] }
}
})
