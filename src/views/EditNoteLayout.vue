<template lang="html">
  <div class="layout">
    <div class="edit-container">

      <div class="wrap">
        <h2>Title</h2>
        <input type="text" class="input" v-model="note.name"> <!-- note title -->
      </div>

      <div class="todos"> <!-- todos array -->
        <div class="wrap" v-for="(item, id) in note.todos">
          <input type="text" class="input" v-model="item.text">
            <div class="circle checkbox"
              v-bind:class="{'checked': item.isChecked}"
              @click="item.isChecked = !item.isChecked"
            >
              <div v-if="item.isChecked"><i class="fas fa-check"></i></div>
            </div>
            <div class="circle tech-button" @click="removeTodo(id)">
              <i class="fas fa-trash-alt"></i> <!-- remove todo -->
            </div>
        </div>

        <div class="wrap"> <!-- add new todo -->
          <input type="text" class="input" v-model="todoBuf.text">
          <div class="circle checkbox"
            v-bind:class="{'checked': todoBuf.isChecked}"
            @click="todoBuf.isChecked = !todoBuf.isChecked"
          > <!-- todo toggle -->
            <div v-if="todoBuf.isChecked"><i class="fas fa-check"></i></div>
          </div>
          <div class="circle tech-button" @click="addTodo"> <!-- add new todo button -->
            <i class="fas fa-plus"></i>
          </div>
        </div>

      </div>

      <div class="wrap end"> <!-- buttons array -->
        <div class="button" @click="enableDialog(0)" ><i class="fas fa-undo-alt"></i></div>
        <div class="button" @click="saveNote" ><i class="fas fa-save"></i></div>
        <div class="button" @click="enableDialog(1)" ><i class="fas fa-trash-alt"></i></div>
        <div class="button" @click="undoOrRedoAction('undo')" ><i class="fas fa-backward"></i></div>
        <div class="button" @click="undoOrRedoAction('redo')" ><i class="fas fa-forward"></i></div>
      </div>

    </div>

    <Dialog v-for="(d, i) of dialog"
      :dialogText="d.text"
      :isActive="d.isActive"
      v-on:confirm-dialog="confirmDialog(i)"
      v-on:reject-dialog="closeAllDialogs" /> <!-- dialogs array depending on event -->

  </div>

</template>

<script>

import Dialog from '@/components/Dialog.vue'

export default {
  name: 'EditNoteLayout',
  computed: {
    noteid() {
      return this.$route.params.id // current note id
    }
  },
  components: {
    Dialog
  },
  created() { // copying selected for editing note in note var
    let buf = this.$store.getters.getNotesDataId(this.noteid)
    this.note = Object.assign({}, buf, {
      name: buf.name,
      todos: JSON.parse(JSON.stringify(buf.todos))
    })
  },
  data() {
    return {
      note: {}, // object for current note that is filled in created()
      todoBuf: { text: '' , isChecked: false }, // vars for adding new todos
      dialog: [ // dialog texts depending on events being triggered
        { text: 'Are you sure you want to go back? Any unsaved changes will be lost!', isActive: false },
        { text: 'Are you sure you want to delete this note?', isActive: false }
      ]
    }
  },
  methods: {
    enableDialog: function(id) { // open dialog
      this.dialog[id].isActive = true
    },
    removeTodo: function(index) { // remove todo in list
      this.note.todos.splice(index, 1)
    },
    addTodo: function() { // add new todo in list
      this.note.todos.push(Object.assign({}, this.todoBuf))
      this.todoBuf.text = ''
      this.todoBuf.isChecked = false
    },
    goBack: function() { // return back to main layout
      this.$store.commit('flushHistory') // clear history of changes for the note
      this.$router.push('/')
    },
    closeAllDialogs: function() {
      this.dialog.forEach(dialog => {
        dialog.isActive = false
      })
    },
    saveNote: function() { // save note (look at vuex/index.js)
      this.$store.dispatch('editNoteWithHistory', [this.note, this.noteid])
      //this.$store.commit('editNote', [this.note, this.noteid])
    },
    deleteNote: function() {
      this.$store.commit('removeNote', this.noteid)
      this.closeAllDialogs
      this.$router.push('/')
    },
    undoOrRedoAction: function(str) { // history navigation, str='undo' for back or str='redo' for forward
      this.$store.dispatch(str).then((resolved) => {
        if(!(Object.keys(resolved).length === 0 && resolved.constructor === Object))
          this.note = resolved
      })
    },
    confirmDialog: function(id) { // function that invoked when dialog confirms
      switch (id) { // id depends on dialog array items index in data()
        case 0:
          this.goBack()
          break
        case 1:
          this.deleteNote()
          break
        default:
          this.closeAllDialogs() // this shouldn`t happen if everything is OK
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "@/scss/variables.scss";

  .layout {
    justify-content: center;
    width: 100vw;
    height: 100vh;

    .edit-container {
      border-radius: 16px;
      padding: 30px 0;
      width: #{'min(400px, 90vw)'};
      height: #{'min(600px, 90vh)'};
      background: $main-color;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: auto;
      &::-webkit-scrollbar { display: none; }
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */

      .input {
        background: $secondary-color;
        border-radius: 8px;
        border: none;
        height: 30px;
        max-width: 40vw;
        padding: 0 20px;
        font-family: inherit;
        font-size: 14px;
        display: flex;
        align-items: center;
      }
    }
  }

  .todos {
    flex-direction: column;
    .input {
      width: 70%;
    }
  }

  .wrap, .todos {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: #{'min(350px, 70vw)'};
    margin: 10px 0;
  }

  .end {
    margin-top: auto;
    margin-bottom: 10px;
    flex-wrap: wrap;
    .button {
      margin: 10px;
      flex-grow: 1;
    }
  }

  .checkbox {
    background: $red;
  }

  .checked {
    background: $green;
  }

  .tech-button {
    background: $secondary-color;
    &:hover {
      background: $orange;
    }
  }
</style>
