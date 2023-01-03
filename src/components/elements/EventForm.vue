<script setup lang="ts">
import { ref } from "vue";
import { Temporal } from "@js-temporal/polyfill";

const start = ref("");
const end = ref("");
const title = ref("");
const location = ref("");

interface Event {
  start: Temporal.PlainDateTime;
  end: Temporal.PlainDateTime;
  title?: string;
  location?: string;
}

function getEvent(): Event {
  return {
    start: Temporal.PlainDateTime.from(start.value),
    end: Temporal.PlainDateTime.from(start.value),
    title: title.value,
    location: location.value,
  } satisfies Event;
}

function createNewEvent() {
  try {
    const event = getEvent();
    console.log("createNewEvent", event);
  } catch (ex) {
    console.warn("Failed to parse event");
  }
}

/*
const emit = defineEmits(["onNewEvent"]);
*/
</script>

<template>
  <div class="event-form">
    <h1>New Event:</h1>
    <form @submit.prevent="createNewEvent">
      <label for="newEventStart" class="option two-cols">
        <span>Start:</span>
        <input id="newEventStart" v-model="start" />
      </label>
      <label for="newEventEnd" class="option two-cols">
        <span>End:</span>
        <input id="newEventEnd" v-model="end" />
      </label>
      <label for="newEventTitle" class="option two-cols">
        <span>Title:</span>
        <input id="newEventTitle" v-model="title" />
      </label>
      <label for="newEventLocation" class="option two-cols">
        <span>Location:</span>
        <input id="newEventLocation" v-model="location" />
      </label>
      <button type="submit" @click.prevent="createNewEvent">Create</button>
    </form>
  </div>
</template>

<style scoped>
.event-form {
  @apply flex flex-col gap-2;
}

.event-form h1 {
  @apply text-xl font-bold;
}

.event-form form {
  @apply flex flex-col gap-1;
}

.event-form label input {
  @apply rounded-lg bg-gray-200 border-2 border-fuchsia-500 p-1;
  @apply focus:bg-gray-100 focus:outline-0 focus:shadow-lg;
}

.event-form label span {
  @apply my-auto;
}

.event-form label.two-cols {
  @apply grid gap-2;
  grid-template-columns: 1fr 62%;
}

.event-form form button {
  @apply rounded-lg bg-gray-300 p-2 shadow shadow-gray-500;
  @apply bg-fuchsia-400;
  @apply focus:outline-0 focus:font-bold;
}
</style>
