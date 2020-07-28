<template>
    <router-view/>
</template>

<style lang="scss">
  @font-face {
    font-family: "Ubuntu";
    src: local("Ubuntu"), url("~@/assets/fonts/Ubuntu-Regular.ttf") format("ttf");
    font-size: 400;
  }
  @font-face {
    font-family: "Ubuntu Light";
    src: local("Ubuntu Light"), url("~@/assets/fonts/Ubuntu-Light.ttf") format("ttf");
    font-size: 300;
  }
  @font-face {
    font-family: "Ubuntu Bold";
    src: local("Ubuntu Bold"), url("~@/assets/fonts/Ubuntu-Bold.ttf") format("ttf");
    font-size: 700;
  }
  * {
    padding: 0;
    margin: 0;
    transition: 0.5s;
  }
  body {
    background: rgb(230, 211, 227);
    font-family: "Ubuntu", sans-serif;
    letter-spacing: 1px;
    color: rgb(15, 15, 15);
  }

  .layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .circle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
  }
</style>
