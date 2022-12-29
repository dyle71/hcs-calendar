<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import ShiftButton from "@/components/elements/ShiftButton.vue";
import ToolTip from "@/components/elements/ToolTip.vue";
import ArrowToBottom from "@/components/icons/ArrowToBottom.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits([
  "onDoubleLeft",
  "onDoubleRight",
  "onLeft",
  "onRight",
  "onTodayClick",
]);
</script>

<template>
  <div class="week-label">
    <div class="text">{{ $t(`week.long`) }}</div>
    <div class="number">{{ props.datetime.weekOfYear }}</div>

    <ShiftButton
      class="shift-button"
      direction="double-left"
      @click="emit('onDoubleLeft')"
    >
      <ToolTip>
        {{ $t("tooltip.week-label.shift.double-left") }}
      </ToolTip>
    </ShiftButton>

    <ShiftButton class="shift-button" direction="left" @click="emit('onLeft')">
      <ToolTip>
        {{ $t("tooltip.week-label.shift.left") }}
      </ToolTip>
    </ShiftButton>

    <button @click.prevent="emit('onTodayClick')">
      <ArrowToBottom class="today-button" />
      <ToolTip>
        {{ $t("tooltip.monthMap.header.month.today") }}
      </ToolTip>
    </button>

    <ShiftButton
      class="shift-button"
      direction="right"
      @click="emit('onRight')"
    >
      <ToolTip>
        {{ $t("tooltip.week-label.shift.right") }}
      </ToolTip>
    </ShiftButton>

    <ShiftButton
      class="shift-button"
      direction="double-right"
      @click="emit('onDoubleRight')"
    >
      <ToolTip>
        {{ $t("tooltip.week-label.shift.double-right") }}
      </ToolTip>
    </ShiftButton>
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
  @apply bg-gray-600 text-gray-50 rounded py-0.5 px-2 my-auto mr-2;
}

.week-label .shift-button {
  @apply relative my-auto mx-0.5 w-6 h-6 rounded-full fill-fuchsia-700;
  @apply hover:bg-gray-300;
  @apply disabled:fill-gray-500;
}

.week-label .today-button {
  @apply relative my-auto mx-0.5 p-0.5 w-6 h-6 rounded-full fill-fuchsia-700;
  @apply hover:bg-gray-300;
  @apply disabled:fill-gray-500;
}
</style>
