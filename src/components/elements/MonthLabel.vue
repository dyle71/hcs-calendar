<script setup lang="ts">
interface Props {
  date: number;
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  {{
    $t(`month.long.${new Date(props.date).getMonth()}`) +
    " " +
    new Date(props.date).getFullYear()
  }}
</template>
