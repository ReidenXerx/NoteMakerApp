<template lang="html"> <!-- dialog window -->
  <div class="dialog-surrounding" @click.self="no" v-if="isActive">
    <div class="dialog-body">

      <h2>{{dialogText}}</h2>

      <div class="dialog-basement">
        <div class="button" @click="yes" ><h2>Yes</h2></div> <!-- emits positive event -->
        <div class="button" @click="no" ><h2>No</h2></div> <!-- emits negative event -->
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialogText: String,
    isActive: Boolean // true if dialog is opened
  },
  methods: {
    yes: function() {
      this.$emit('confirm-dialog') //emits positive event
    },
    no: function() {
      this.$emit('reject-dialog') //emits negative event
    }
  }
}
</script>

<style lang="scss" scoped>

  @import "@/scss/variables.scss";

  .dialog-surrounding {
    z-index: 99;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: fixed;

    .dialog-body {
      background: $main-color;
      border-radius: 16px;
      padding: 30px;
      max-width: #{'min(400px, 90vw)'};
      text-align: center;

      .dialog-basement {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        padding-top: 30px;
      }
    }
  }
</style>
