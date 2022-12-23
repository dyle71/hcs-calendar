<script setup lang="ts">
import MonthLabel from "@/components/elements/MonthLabel.vue";
import ShiftButton from "@/components/elements/ShiftButton.vue";
import ToolTip from "@/components/elements/ToolTip.vue";

interface Props {
  date: number;
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
    />
    <ToolTip for="calendar-header-double-left">
      {{ $t("header.shift.double-left") }}
    </ToolTip>

    <ShiftButton
      id="calendar-header-left"
      class="calendar-header__shift-button"
      direction="left"
      @click="emit('onLeft')"
    />
    <ToolTip for="calendar-header-left">
      {{ $t("header.shift.left") }}
    </ToolTip>

    <MonthLabel :date="props.date" />

    <ShiftButton
      id="calendar-header-right"
      class="calendar-header__shift-button"
      direction="right"
      @click="emit('onRight')"
    />
    <ToolTip for="calendar-header-right">
      {{ $t("header.shift.right") }}
    </ToolTip>

    <ShiftButton
      id="calendar-header-double-right"
      class="calendar-header__shift-button"
      direction="double-right"
      @click="emit('onDoubleRight')"
    />
    <ToolTip for="calendar-header-double-right">
      {{ $t("header.shift.double-right") }}
    </ToolTip>

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
</style>
