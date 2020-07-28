<template>
  <div class="layout">
    <Note v-for="note in notesData" :noteName="note.name" :todos="note.todos" />
  </div>
</template>

<script>
// @ is an alias to /src
import Note from '@/components/Note.vue'

export default {
  name: 'MainLayout',
  components: {
    Note
  },
  data() {
    return {
      notesData: [{
        name: 'Test1',
        todos: [
          { text: 'lorem ipsum', isChecked: true },
          { text: 'text2', isChecked: false },
          { text: 'text1', isChecked: true }
        ]
      },
      {
        name: 'Test2',
        todos: [
          { text: 'text1', isChecked: true },
          { text: 'text2', isChecked: false },
          { text: 'text1', isChecked: true }
        ]
      }]
    }
  }
}
</script>
