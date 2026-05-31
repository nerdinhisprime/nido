<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<template>
  <div class="menu-container">
    <button @click.stop="toggleMenu">
      {{ isMenuOpen ? 'Закрыть' : 'Открыть' }} меню
    </button>

    <div 
      v-if="isMenuOpen" 
      v-click-outside="closeMenu" 
      class="dropdown-menu"
    >
      <h3>Моё меню</h3>
      <p>Кликай на этот текст или на padding — всё будет четко.</p>
      <ul>
        <li><a href="#">Профиль</a></li>
        <li><a href="#">Выйти</a></li>
      </ul>
      <button @click.stop="closeMenu">Закрыть</button>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 200px;
  z-index: 100;
}
</style>
