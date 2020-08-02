import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function copyNote(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object ? {} : Object.assign({}, obj, {
    name: obj.name,
    todos: JSON.parse(JSON.stringify(obj.todos))
  })
}

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
  }],
  history: [],
  historyFirst: {},
  pointer: 0
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
  flushHistory (state) {
    state.history = []
    state.pointer = 0
    state.historyFirst = {}
  },
  addToHistory (state, obj) {
    state.history.push(copyNote(obj))
    state.pointer++
  },
  addToHistoryFirst (state, obj) {
    state.historyFirst = copyNote(obj)
    //state.pointer++
  },
  pointerpp (state) {
    if (state.pointer < state.history.length) state.pointer++
  },
  pointermm (state) {
    if(state.pointer > 0) state.pointer--
  },
  editNote (state, args) {
    // args[0] - note, args[1] - noteid
    Object.assign(state.notesData[args[1]], args[0], {
      name: args[0].name,
      todos: JSON.parse(JSON.stringify(args[0].todos))
    })
  }
},
actions: {
  undo(context) {
    // it will return empty object if history is empty
    return new Promise((resolve, reject) => {
      context.commit('pointermm')
      const historySlide = copyNote(context.getters.getHistoryId(context.getters.getPointer))
      console.log(historySlide, context.getters.getPointer, 'undo')
      resolve(historySlide)
    })
  },
  redo(context) {
    // it will return empty object if history is empty
    return new Promise((resolve, reject) => {
      context.commit('pointerpp')
      let historySlide
      if(context.getters.getPointer === context.getters.getHistory.length) {
        historySlide = copyNote(context.getters.getHistoryFirst)
      } else
        historySlide = copyNote(context.getters.getHistoryId(context.getters.getPointer))
      console.log(historySlide, context.getters.getPointer, 'redo')
      resolve(historySlide)
    })
  },
  editNoteWithHistory (context, args) {
    if(context.getters.getNotesData.length == 0) {
      context.commit('addToHistoryFirst', args[0])
    }
    context.commit('addToHistory', context.getters.getNotesDataId([args[1]]))
    context.commit('editNote', args)


  }
},
getters: {
  getNotesData: (state) => { return state.notesData },
  getNotesDataId: (state) => (id) => { return state.notesData.length > 0 ? state.notesData[id] : {} },
  getHistory: (state) => { return state.history },
  getHistoryId: (state) => (id) => { return state.history.length > 0 ? state.history[id] : {} },
  getPointer: (state) => { return state.pointer },
  getHistoryFirst: (state) => { return state.historyFirst }
}
})
