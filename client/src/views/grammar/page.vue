<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import data from "@/data/grammar.json"

  const route = useRoute()

  const topic = computed(() => route.params.topic)

  // 1. Make content computed so it updates when route changes
  const content = computed(() => data.find(l => l.topic === topic.value))

  // 2. Extract the video ID safely from the JSON's URL property
  const videoId = computed(() => {
    if (!content.value?.url) return ''
    const urlObj = new URL(content.value.url)
    return urlObj.searchParams.get('v') // Grabs "Yo5ztWpEApw"
  })
</script>

<template>
  <div v-if="content">
    <h1>{{ content.title }}</h1>

    <iframe 
      width="560" 
      height="315" 
      :src="`https://www.youtube.com/embed/${videoId}`" 
      :title="content.title" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>

    <h2>حاسس حاجة صعبة او لسه مش فاهم؟</h2>
    <p>جرب تسأل نمازج الذكاء الاصطناعي 😊</p>
    <label>ايه بالظبط مش فاهمه او لسه محتاج تدرب عليه او حاسه معصلج؟</label>
    <textarea placeholder="حد راحتك في الكتابة"></textarea>

    <label>نموزج الذكاء الاصطناعي</label>
    <select>
      <option selected>Deepseek</option>
      <option>ChatGPT</option>
      <option>Gemini</option>
      <option>Grok</option>
    </select>

    <a href="#">اسأل النموزج 🤖</a>
    <br />
    <br />
    <a href="#">شوف فيديو ثاني 👨‍🏫</a>
  </div>
</template>