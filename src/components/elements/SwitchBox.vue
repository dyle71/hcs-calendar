<script setup lang="ts">
import { ref } from "vue";

interface Props {
  readonly label: string;
  readonly id: string;
  readonly initialState: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
const checked = ref(props.initialState);
const emit = defineEmits(["onClick"]);
</script>

<template>
  <div class="switch-box">
    <label :for="props.id">
      {{ props.label }}
      <input
        :id="props.id"
        aria-checked="true"
        type="checkbox"
        role="switch"
        @click="emit('onClick', !checked)"
        v-model="checked"
      />
    </label>
  </div>
</template>

<style scoped>
.switch-box {
}

.switch-box label {
  @apply relative flex flex-row w-full align-baseline;
}

.switch-box label input {
  @apply ml-auto mr-0 my-auto appearance-none cursor-pointer w-9 h-5 rounded-full bg-gray-300;
  @apply focus:outline-none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%22-4 -4 8 8%22%3E%3Ccircle r=%223%22 fill=%22%23fff%22/%3E%3C/svg%3E");
  @apply bg-no-repeat;
  @apply transition-all;
}

.switch-box label input:checked {
  @apply bg-fuchsia-500;
  background-position-x: 1rem;
}
</style>
