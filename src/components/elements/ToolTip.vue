<script setup lang="ts">
import { ref, onMounted } from "vue";
import { createPopper, Instance } from "@popperjs/core";

interface Props {
  readonly for?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const tooltipElement = ref<HTMLElement | null>(null);

let popperInstance: Instance | null = null;
let popperTarget: HTMLElement | null = null;

function hideToolTip(): void {
  if (tooltipElement.value) {
    tooltipElement.value.removeAttribute("tooltip-active");

    if (popperInstance) {
      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers!,
          { name: "eventListeners", enabled: false },
        ],
      }));
    }
  }
}

function showToolTip(): void {
  if (popperInstance && tooltipElement.value) {
    tooltipElement.value.setAttribute("tooltip-active", "");

    popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers!,
        { name: "eventListeners", enabled: true },
      ],
    }));

    popperInstance.update();
  }
}

onMounted(() => {
  if (props.for) {
    popperTarget = document.getElementById(props.for);
  } else {
    popperTarget = tooltipElement.value?.parentNode as HTMLElement;
  }
  if (!popperTarget) {
    console.warn(
      `Failed to produce a tooltip for ${props.for}, element not found.`
    );
    return;
  }
  if (!tooltipElement.value) {
    console.warn(`Failed get ref of current tooltip (for: ${props.for}).`);
    return;
  }
  popperInstance = createPopper(popperTarget, tooltipElement.value, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 12],
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: ["top", "right", "bottom", "left"],
        },
      },
    ],
  });

  popperTarget.onmouseenter = showToolTip;
  popperTarget.onfocus = showToolTip;
  popperTarget.onmouseleave = hideToolTip;
  popperTarget.onblur = hideToolTip;
});
</script>

<template>
  <div ref="tooltipElement" class="tooltip" role="tooltip">
    <slot />
    <div class="tooltip__arrow" data-popper-arrow></div>
  </div>
</template>

<style scoped>
.tooltip {
  @apply hidden px-2 py-1 rounded-md text-xs text-white opacity-0 min-w-max;
  background: rgba(50, 50, 50);
  z-index: 1000;
}

.tooltip[tooltip-active] {
  @apply block;
  animation-name: animate-tooltip;
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  animation-delay: 500ms;
  animation-fill-mode: forwards;
}

@keyframes animate-tooltip {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.9;
  }
}

.tooltip__arrow,
.tooltip__arrow::before {
  @apply absolute;
  width: 8px;
  height: 8px;
  background: inherit;
}

.tooltip__arrow {
  visibility: hidden;
}

.tooltip__arrow::before {
  visibility: visible;
  content: "";
  transform: rotate(45deg);
}

.tooltip[data-popper-placement^="top"] > .tooltip__arrow {
  bottom: -4px;
}

.tooltip[data-popper-placement^="bottom"] > .tooltip__arrow {
  top: -4px;
}

.tooltip[data-popper-placement^="left"] > .tooltip__arrow {
  right: -8px;
}

.tooltip[data-popper-placement^="right"] > .tooltip__arrow {
  left: -8px;
}
</style>
