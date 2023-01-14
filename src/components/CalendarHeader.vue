<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import MonthLabel from "@/components/elements/MonthLabel.vue";
import CalendarNavButtonRow from "@/components/elements/CalendarNavButtonRow.vue";

interface Props {
  readonly datetime: Temporal.PlainDateTime;
  readonly navHints?: boolean;
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
  <div class="calendar-header">
    <MonthLabel
      class="month-label"
      :date="Temporal.PlainDate.from(props.datetime)"
    />

    <CalendarNavButtonRow
      class="nav"
      :double="true"
      :hint="props.navHints"
      :hints="{
        doubleLeft: '-3',
        left: '-1',
        right: '+1',
        doubleRight: '+3',
      }"
      :tooltips="{
        left: $t('tooltip.header.shift.left'),
        right: $t('tooltip.header.shift.right'),
        today: $t('tooltip.header.shift.today'),
        doubleLeft: $t('tooltip.header.shift.double-left'),
        doubleRight: $t('tooltip.header.shift.double-right'),
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
.calendar-header {
  @apply relative flex flex-row mx-auto w-1/2 gap-2;
}

.calendar-header .nav {
  @apply my-auto mx-auto h-6 w-[40] ml-0 mr-auto;
}

.calendar-header .month-label {
  @apply text-lg w-1/2 text-right;
}
</style>
