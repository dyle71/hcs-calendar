<script setup lang="ts">
import AngleDoubleLeft from "@/components/icons/AngleDoubleLeft.vue";
import AngleDoubleRight from "@/components/icons/AngleDoubleRight.vue";
import AngleLeft from "@/components/icons/AngleLeft.vue";
import AngleRight from "@/components/icons/AngleRight.vue";
import ArrowToBottom from "@/components/icons/ArrowToBottom.vue";
import ToolTip from "@/components/elements/ToolTip.vue";

interface HintDefinition {
  left?: string;
  right?: string;
  today?: string;
  doubleLeft?: string;
  doubleRight?: string;
}

interface ToolTipDefinition {
  left?: string;
  right?: string;
  today?: string;
  doubleLeft?: string;
  doubleRight?: string;
}

interface Props {
  today?: boolean;
  double?: boolean;
  hint?: boolean;
  hints?: HintDefinition;
  tooltips?: ToolTipDefinition;
}

const props = withDefaults(defineProps<Props>(), {
  today: true,
  double: false,
  hint: false,
});

const emit = defineEmits([
  "onLeftClick",
  "onRightClick",
  "onTodayClick",
  "onDoubleLeftClick",
  "onDoubleRightClick",
]);
</script>

<template>
  <div class="calendar-nav-button-row">
    <button
      v-if="props.double"
      @click.prevent="emit('onDoubleLeftClick')"
      class="button double-left"
    >
      <AngleDoubleLeft />
      <ToolTip v-if="props.tooltips">
        {{ props.tooltips?.doubleLeft }}
      </ToolTip>
    </button>

    <button @click.prevent="emit('onLeftClick')" class="button left">
      <AngleLeft />
      <ToolTip v-if="props.tooltips">
        {{ props.tooltips?.left }}
      </ToolTip>
    </button>

    <button
      v-if="props.today"
      @click.prevent="emit('onTodayClick')"
      class="button today"
    >
      <ArrowToBottom />
      <ToolTip v-if="props.tooltips">
        {{ props.tooltips?.today }}
      </ToolTip>
    </button>

    <button @click.prevent="emit('onRightClick')" class="button right">
      <AngleRight />
      <ToolTip v-if="props.tooltips">
        {{ props.tooltips?.right }}
      </ToolTip>
    </button>

    <button
      v-if="props.double"
      @click.prevent="emit('onDoubleRightClick')"
      class="button double-left"
    >
      <AngleDoubleRight />
      <ToolTip v-if="props.tooltips">
        {{ props.tooltips?.doubleRight }}
      </ToolTip>
    </button>
  </div>
</template>

<style scoped>
.calendar-nav-button-row {
  @apply flex-none flex flex-row justify-center items-center;
}

.calendar-nav-button-row .button {
  @apply relative rounded-full fill-fuchsia-700 w-full h-full;
  @apply hover:bg-gray-300;
  @apply disabled:fill-gray-500;
}

.calendar-nav-button-row .today {
  @apply p-1;
}
</style>
