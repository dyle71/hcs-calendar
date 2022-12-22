<script setup lang="ts">
import type { Months } from "@/types/month";

interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});

const m: Months = new Date(props.date).getMonth();
console.log("foo: ", m);
</script>

<template>
  <div class="calendar-month-label">MonthLabel</div>
</template>

<style scoped>
.calendar-month-label {
  @apply py-2 px-2 text-xl;
}
</style>
