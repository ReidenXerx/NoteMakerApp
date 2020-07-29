<template>
  <div class="layout">
    <Note v-for="(note, index) in this.$store.getters.getNotesData"
    :noteName="note.name"
    :todos="note.todos"
    :index="index"
    v-on:remove-note="trytoremove" />

    <Dialog
      :dialogText="dialog.text"
      :isActive="dialog.isActive"
      v-on:confirm-dialog="removenote"
      v-on:reject-dialog="undoremoving" />
  </div>
</template>

<script>

import Note from '@/components/Note.vue'
import Dialog from '@/components/Dialog.vue'

export default {
  name: 'MainLayout',
  components: {
    Note, Dialog
  },
  methods: {
    trytoremove: function(index) {
      this.dialog.isActive = true
      this.dialog.text = "Are you sure you want to remove '" + this.$store.getters.getNotesData[index].name + "' note?"
      this.dialog.index = index
    },
    removenote: function() {
      this.$store.commit('removeNote', this.dialog.index)
      this.dialog.isActive = false
    },
    undoremoving: function() {
      this.dialog.isActive = false
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
