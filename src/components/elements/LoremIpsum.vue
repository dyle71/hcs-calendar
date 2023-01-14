<script setup lang="ts">
interface Props {
  readonly amount?: number;
}

const props = withDefaults(defineProps<Props>(), {
  amount: 1,
});

if (props.amount < 0) {
  throw new Error(`Invalid amount of lorem ipsum: ${props.amount}.`);
}
</script>

<template>
  <p v-for="index in Array(props.amount)" :key="index">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </p>
</template>
