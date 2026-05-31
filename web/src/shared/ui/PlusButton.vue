<template>
  <button class="plus-button">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
      <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
    </svg>
    <slot />
  </button>
</template>

<style scoped>
.plus-button {
  width: 125px;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  color: white;
  line-height: 1;
}
</style>
