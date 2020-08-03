import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate" // plugin for vuex local storage

Vue.use(Vuex)

function copyNote(obj) { // create copy of note object
  return Object.keys(obj).length === 0 && obj.constructor === Object ? {} : Object.assign({}, obj, {
    name: obj.name,
    todos: JSON.parse(JSON.stringify(obj.todos))
  })
}

export default new Vuex.Store({ // all data is stored here and exported to vue object in main.js

plugins: [createPersistedState()], // plugin for vuex local storage

state: {
  notesData: [{ // array of notes
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
  }],
  history: [], // history of all note mutations
  historyLast: {}, // last note mutation is stored here
  pointer: 0 // pointer for history array for navigation in history
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
  flushHistory (state) { // clear history (used when you leave note editing)
    state.history = []
    state.pointer = 0
    state.historyLast = {}
  },
  addToHistory (state, obj) {
    state.history.push(copyNote(obj))
    state.pointer++
  },
  addToHistoryLast (state, obj) {
    state.historyLast = copyNote(obj)
    //state.pointer++
  },
  pointerpp (state) {
    if (state.pointer < state.history.length) state.pointer++
  },
  pointermm (state) {
    if(state.pointer > 0) state.pointer--
  },
  editNote (state, args) { // save changes in note
    // args[0] - note, args[1] - noteid
    Object.assign(state.notesData[args[1]], args[0], { // copy object
      name: args[0].name,
      todos: JSON.parse(JSON.stringify(args[0].todos))
    })
  }
},
actions: {
  undo(context) { // move backwards on history array on 1 step
    // it will return empty object if history is empty
    return new Promise((resolve, reject) => {
      context.commit('pointermm')
      const historySlide = copyNote(context.getters.getHistoryId(context.getters.getPointer))
      console.log(historySlide, context.getters.getPointer, 'undo')
      resolve(historySlide)
    })
  },
  redo(context) { // move forwards on history array on 1 step
    // it will return empty object if history is empty
    return new Promise((resolve, reject) => {
      context.commit('pointerpp')
      let historySlide
      if(context.getters.getPointer === context.getters.getHistory.length) {
        historySlide = copyNote(context.getters.getHistoryLast) // getting last note change in history
      } else
        historySlide = copyNote(context.getters.getHistoryId(context.getters.getPointer))
      console.log(historySlide, context.getters.getPointer, 'redo') // getting note in history array
      resolve(historySlide)
    })
  },
  editNoteWithHistory (context, args) { // this method is invoked when you save changes in note
    context.commit('addToHistoryLast', args[0]) // saving last note change in history
    context.commit('addToHistory', context.getters.getNotesDataId([args[1]])) // saving note pre-change state
    context.commit('editNote', args) // making change in note


  }
},
getters: { // getters with id param return empty object if arrays to get from are empty
  getNotesData: (state) => { return state.notesData },
  getNotesDataId: (state) => (id) => { return state.notesData.length > 0 ? state.notesData[id] : {} },
  getHistory: (state) => { return state.history },
  getHistoryId: (state) => (id) => { return state.history.length > 0 ? state.history[id] : {} },
  getPointer: (state) => { return state.pointer },
  getHistoryLast: (state) => { return state.historyLast }
}
})
