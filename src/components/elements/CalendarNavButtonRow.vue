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
  readonly today?: boolean;
  readonly double?: boolean;
  readonly hint?: boolean;
  readonly hints?: HintDefinition;
  readonly tooltips?: ToolTipDefinition;
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
      <span v-if="props.hint && props.hints?.doubleLeft" class="hint">
        {{ props.hints?.doubleLeft }}
      </span>
    </button>

    <button @click.prevent="emit('onLeftClick')" class="button left">
      <AngleLeft />
      <ToolTip v-if="props.tooltips">
        {{ props.tooltips?.left }}
      </ToolTip>
      <span v-if="props.hint && props.hints?.left" class="hint">
        {{ props.hints?.left }}
      </span>
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
      <span v-if="props.hint && props.hints?.today" class="hint">
        {{ props.hints?.today }}
      </span>
    </button>

    <button @click.prevent="emit('onRightClick')" class="button right">
      <AngleRight />
      <ToolTip v-if="props.tooltips">
        {{ props.tooltips?.right }}
      </ToolTip>
      <span v-if="props.hint && props.hints?.right" class="hint">
        {{ props.hints?.right }}
      </span>
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
      <span v-if="props.hint && props.hints?.doubleRight" class="hint">
        {{ props.hints?.doubleRight }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.calendar-nav-button-row {
  @apply flex-none flex flex-row justify-center items-center;
}

.calendar-nav-button-row .button {
  @apply relative rounded-full fill-fuchsia-700 w-full h-full;
  @apply hover:bg-gray-100;
  @apply disabled:fill-gray-500;
}

.calendar-nav-button-row .button .hint {
  @apply absolute rounded-full px-1 -z-10 w-4 h-4 select-none;
  line-height: 1rem;
  font-size: 0.5rem;
  bottom: -0.2rem;
  right: -0.2rem;
  @apply bg-amber-300;
}

.calendar-nav-button-row .today {
  @apply p-1;
}
</style>
