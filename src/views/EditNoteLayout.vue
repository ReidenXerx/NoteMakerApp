<template lang="html">
  <div class="layout">
    <div class="edit-container">

      <div class="wrap">
        <h2>Title</h2>
        <input type="text" class="input" v-model="note.name">
      </div>

      <div class="todos"> <!-- todos -->
        <div class="wrap" v-for="(item, id) in note.todos">
          <input type="text" class="input" v-model="item.text">
            <div class="circle checkbox"
              v-bind:class="{'checked': item.isChecked}"
              @click="item.isChecked = !item.isChecked"
            >
              <div v-if="item.isChecked"><i class="fas fa-check"></i></div>
            </div>
            <div class="circle tech-button" @click="removetodo(id)">
              <i class="fas fa-trash-alt"></i>
            </div>
        </div>

        <div class="wrap"> <!-- add new todo -->
          <input type="text" class="input" v-model="todoBuf.text">
          <div class="circle checkbox"
            v-bind:class="{'checked': todoBuf.isChecked}"
            @click="todoBuf.isChecked = !todoBuf.isChecked"
          >
            <div v-if="todoBuf.isChecked"><i class="fas fa-check"></i></div>
          </div>
          <div class="circle tech-button" @click="addtodo">
            <i class="fas fa-plus"></i>
          </div>
        </div>
      </div>

      <div class="wrap">
        <div class="button" @click="trytogoback" ><h2>Back</h2></div>
        <div class="button" @click="savenote" ><h2>Save</h2></div>
      </div>

    </div>

    <Dialog
      :dialogText="dialog[0].text"
      :isActive="dialog[0].isActive"
      v-on:confirm-dialog="goback"
      v-on:reject-dialog="undo" />

    <!-- <Dialog
      :dialogText="dialog[0].text"
      :isActive="dialog[0].isActive"
      v-on:confirm-dialog="goback"
      v-on:reject-dialog="undo" /> -->

  </div>

</template>

<script>

import Dialog from '@/components/Dialog.vue'

export default {
  name: 'EditNoteLayout',
  computed: {
    noteid() {
      return this.$route.params.id
    },
    note() {
      let buf = this.$store.getters.getNotesDataId(this.noteid)
      return Object.assign({}, buf, {
        name: buf.name,
        todos: JSON.parse(JSON.stringify(buf.todos))
      })
    }
  },
  components: {
    Dialog
  },
  data() {
    return {
      todoBuf: { text: '' , isChecked: false },
      dialog: [
        { text: 'Are you sure you want to go back? Any unsaved changes will be lost!', isActive: false },
        { text: 'Are you sure you want to save changes?', isActive: false }
      ]
    }
  },
  methods: {
    trytogoback: function() {
      this.dialog[0].isActive = true
    },
    removetodo: function(index) {
      this.note.todos.splice(index, 1)
    },
    addtodo: function() {
      this.note.todos.push(Object.assign({}, this.todoBuf))
      this.todoBuf.text = ''
      this.todoBuf.isChecked = false
    },
    goback: function() {
      this.$router.push('/')
    },
    undo: function() {
      this.dialog.forEach(dialog => {
        dialog.isActive = false
      })
    },
    savenote: function() {
      this.$store.commit('editNote', [this.note, this.noteid])
      let test = this.$store.getters.getNotesData
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "@/scss/variables.scss";

  .layout {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $purple-white;
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
