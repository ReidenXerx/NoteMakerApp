<template lang="html">
  <div class="dialog-surrounding" @click.self="no" v-if="isActive">
    <div class="dialog-body">

      <h2>{{dialogText}}</h2>

      <div class="dialog-basement">
        <div class="button" @click="yes" ><h2>Yes</h2></div>
        <div class="button" @click="no" ><h2>No</h2></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialogText: String,
    isActive: Boolean
  },
  methods: {
    yes: function() {
      this.$emit('confirm-dialog')
    },
    no: function() {
      this.$emit('reject-dialog')
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

        .button {
          background: $secondary-color;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          text-transform: uppercase;
          &:hover {
            background: $orange;
          }
        }
      }
    }
  }
</style>
