<script setup lang="ts">
import { Temporal } from "@js-temporal/polyfill";

interface Props {
  readonly date: Temporal.PlainDate;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div>
    {{ $t(`month.long.${props.date.month}`) + " " + date.year }}
  </div>
</template>
