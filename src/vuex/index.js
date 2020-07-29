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
  editNote (state, note, index) {
    state.notesData[index] = note
  }
},
getters: {
  getNotesData: (state) => { return state.notesData }
}
})
