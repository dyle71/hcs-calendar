<script setup lang="ts">
import { PropType } from "vue";
import { Temporal } from "@js-temporal/polyfill";

interface Props {
  date: PropType<Temporal.PlainDateTime>;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div>
    {{ $t(`month.long.${props.date.month}`) + " " + date.year }}
  </div>
</template>
