<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import MonthMiniView from "@/components/elements/MonthMiniView.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits(["onPreviousMonth", "onNextMonth", "onDayClick"]);
</script>

<template>
  <div class="calendar-sidebar">
    <MonthMiniView
      :date="Temporal.PlainDate.from(props.datetime)"
      @onLeft="emit('onPreviousMonth')"
      @onRight="emit('onNextMonth')"
      @onDayClick="emit('onDayClick', $event)"
    />
  </div>
</template>

<style scoped>
.calendar-sidebar {
  @apply relative flex-none flex p-2;
}
</style>
