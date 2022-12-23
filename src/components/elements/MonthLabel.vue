<script setup lang="ts">
interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="calendar-month-label">
    <div class="calendar-month-label__month">
      {{ $t(`month.long.${new Date(props.date).getMonth()}`) }}
    </div>
    <div class="calendar-month-label__year">
      {{ new Date(props.date).getFullYear() }}
    </div>
  </div>
</template>

<style scoped>
.calendar-month-label {
  @apply py-2 px-2 text-xl flex flex-row gap-2;
}

.calendar-month-label__month {
}

.calendar-month-label__year {
}
</style>
