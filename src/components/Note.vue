<template lang="html">
  <div class="note-body">
    <div class="upper">

      <h2 class="name">{{noteName}}</h2>
      <div class="action-array">
        <div class="circle" @click="gotoNote(index)"><i class="fas fa-pencil-alt"></i></div>
        <div class="circle" @click="removeNote(index)"><i class="fas fa-trash-alt"></i></div>
      </div>
    </div>

      <div class="todo-list">
        <div class="todo-item" v-for="item in todos">
          <p class="todo-text">{{item.text}}</p>
          <div class="checkbox circle" v-bind:class="{'checked': item.isChecked}">
            <i class="fas fa-check" v-if="item.isChecked"></i>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    noteName: String,
    todos: Array,
    index: Number
  },
  methods: {
    removeNote: function(index) {
      this.$emit('remove-note', index) // generating remote-note event
    },
    gotoNote: function(index) {
      this.$router.push('/edit/'+index)
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "@/scss/variables.scss";

  .note-body {
    width: 300px;
    max-width: 90vw;
    background: $main-color;
    border-radius: 8px;
    padding: 15px;
    margin: 20px 0;

    &:hover {
      transform: scale(1.05);
    }

    .upper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .name {
        font-size: 20px;
        font-size: 400;
      }

      .action-array {
        display: flex;

        .circle {
          background: $secondary-color;
          width: 20px;
          height: 20px;
          margin: 0 3px;
          font-size: 12px;

          &:hover {
            background: $orange;
          }
        }
      } // action-array end
    } // upper end

    .todo-list {
      background: $secondary-color;
      border-radius: 8px;
      padding: 10px;

      .todo-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        padding: 0 10px;

        .checkbox {
          background: $red;
        }

        .checked {
          background: $green;
        }

      } // todo-item end
    } // todo-list end
  } // note-body end
</style>
