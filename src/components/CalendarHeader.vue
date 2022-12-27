<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";
import MonthLabel from "@/components/elements/MonthLabel.vue";
import ShiftButton from "@/components/elements/ShiftButton.vue";
import ToolTip from "@/components/elements/ToolTip.vue";

interface Props {
  datetime: Temporal.PlainDateTime;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits([
  "onDoubleLeft",
  "onDoubleRight",
  "onLeft",
  "onRight",
]);
</script>

<template>
  <div class="calendar-header">
    <ShiftButton
      id="calendar-header-double-left"
      class="calendar-header__shift-button"
      direction="double-left"
      @click="emit('onDoubleLeft')"
    >
      <ToolTip>
        {{ $t("tooltip.header.shift.double-left") }}
      </ToolTip>
    </ShiftButton>

    <ShiftButton
      id="calendar-header-left"
      class="calendar-header__shift-button"
      direction="left"
      @click="emit('onLeft')"
    >
      <ToolTip>
        {{ $t("tooltip.header.shift.left") }}
      </ToolTip>
    </ShiftButton>

    <MonthLabel
      class="calendar-header__month-label"
      :date="Temporal.PlainDate.from(props.datetime)"
    />

    <ShiftButton
      id="calendar-header-right"
      class="calendar-header__shift-button"
      direction="right"
      @click="emit('onRight')"
    >
      <ToolTip>
        {{ $t("tooltip.header.shift.right") }}
      </ToolTip>
    </ShiftButton>

    <ShiftButton
      id="calendar-header-double-right"
      class="calendar-header__shift-button"
      direction="double-right"
      @click="emit('onDoubleRight')"
    >
      <ToolTip>
        {{ $t("tooltip.header.shift.double-right") }}
      </ToolTip>
    </ShiftButton>
  </div>
</template>

<style scoped>
.calendar-header {
  @apply relative flex mx-auto;
}

.calendar-header__shift-button {
  @apply relative my-auto mx-0.5 w-6 h-6 rounded-full fill-fuchsia-700;
  @apply hover:bg-gray-300;
  @apply disabled:fill-gray-500;
}

.calendar-header__month-label {
  @apply text-lg;
}
</style>
