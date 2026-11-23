<script setup>
  import { speak } from "@/utils/helpers";
  import { ref, computed } from "vue";
  import passage from "@/data/read_1.json";

</script>
<template>
  <hgroup>
    <h1>{{ passage['title'] }}</h1>
    <p>Learn how empathy and gratitude can make your life and the lives of others better.</p>
  </hgroup>
  
  <hr />

  <div class="passage" dir="ltr">
    <span v-for="(word, i) in passage['content'].split(' ')" :key="i">{{ word }}</span>
  </div>

</template>
