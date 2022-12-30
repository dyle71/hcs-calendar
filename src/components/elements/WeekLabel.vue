<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import CalendarNavButtonRow from "@/components/elements/CalendarNavButtonRow.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
  navHints?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  navHints: false,
});

const emit = defineEmits([
  "onDoubleLeftClick",
  "onDoubleRightClick",
  "onLeftClick",
  "onRightClick",
  "onTodayClick",
]);
</script>

<template>
  <div class="week-label">
    <div class="text">{{ $t(`week.long`) }}</div>
    <div class="number">{{ props.datetime.weekOfYear }}</div>

    <CalendarNavButtonRow
      class="nav"
      :double="true"
      :hint="props.navHints"
      :hints="{
        doubleLeft: '-4',
        left: '-1',
        right: '+1',
        doubleRight: '+4',
      }"
      :tooltips="{
        left: $t('tooltip.week-label.shift.left'),
        right: $t('tooltip.week-label.shift.right'),
        today: $t('tooltip.week-label.shift.today'),
        doubleLeft: $t('tooltip.week-label.shift.double-left'),
        doubleRight: $t('tooltip.week-label.shift.double-right'),
      }"
      @onDoubleLeftClick="emit('onDoubleLeftClick')"
      @onLeftClick="emit('onLeftClick')"
      @onTodayClick="emit('onTodayClick')"
      @onRightClick="emit('onRightClick')"
      @onDoubleRightClick="emit('onDoubleRightClick')"
    />
  </div>
</template>

<style scoped>
.week-label {
  @apply flex flex-row gap-0 text-sm;
}

.week-label .text {
  @apply my-auto mr-2;
}

.week-label .number {
  @apply bg-gray-600 text-gray-50 rounded py-0.5 px-2 my-auto mr-2 w-10 text-center;
}

.week-label .nav {
  @apply my-auto h-6 w-[30];
}
</style>
