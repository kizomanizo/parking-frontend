<template>
  <span id="loading-box" class="loading-box">
    <img src="@/assets/gear.png" alt="animated gear" style="height: 50px; width: 50px; z-index: 6;" />
  </span>
</template>

<style scoped>
.loading-box {
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
