<template>
  <div class="layout">

    <Note v-for="(note, index) in notes"
    :noteName="note.name"
    :todos="note.todos"
    :index="index"
    v-on:remove-note="tryToRemove" />

    <div class="button" @click="createNote"><i class="fas fa-plus"></i></div>

    <Dialog
      :dialogText="dialog.text"
      :isActive="dialog.isActive"
      v-on:confirm-dialog="removeNote"
      v-on:reject-dialog="undoRemoving" />
  </div>
</template>

<script>

import Note from '@/components/Note.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'MainLayout',
  computed: {
    notes() {
      return this.$store.getters.getNotesData;
    }
  },
  components: {
    Note, Dialog
  },
  methods: {
    tryToRemove: function(index) {
      this.dialog.isActive = true
      this.dialog.text = "Are you sure you want to remove '" + this.notes[index].name + "' note?"
      this.dialog.index = index
    },
    removeNote: function() {
      this.$store.commit('removeNote', this.dialog.index)
      this.dialog.isActive = false
    },
    undoRemoving: function() {
      this.dialog.isActive = false
    },
    createNote: function() {
      const index = this.notes.length
      this.$store.commit('addEmptyNote')
      this.$router.push('/edit/'+index)
    }
  },
  data() {
    return {
      dialog: {
        text: '',
        isActive: false,
        index: -1
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "@/scss/variables.scss";

  .button {
    background: $main-color;

    &:hover {
      background: $orange;
    }
  }
</style>
