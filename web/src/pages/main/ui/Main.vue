<script setup lang="ts">
import { TaskTables } from "@/widgets/task-tables";
import { NavBar } from "@/widgets/nav-bar";
import PickAccessDir from "@/shared/ui/pick-access-dir/ui/PickAccessDir.vue";
</script>

<template>
  <PickAccessDir />
  <NavBar />
  <TaskTables />
</template>
