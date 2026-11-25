<script setup>
  import { computed, ref } from 'vue'
  import { useRoute, RouterLink } from 'vue-router'
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

  // youtube search link
  const ytSearch = ref(`https://www.youtube.com/results?search_query=${[
    'تعلم', content.value.topic.split('-').join('+'), 'الانجليزية'
  ].join('+')}`); // search_query=تعلم+future+tense+english

  const goal = "medicine"
  const userMessage = ref('')

  const prompt = computed(() => `
    You are a friendly English grammar coach for Egyptians. You explain in VERY easy Egyptian Arabic (عامية مصرية بسيطة جداً) — short sentences, no complicated grammar terms, no English explanations. English only appears inside the examples themselves.

    The student wrote this about what confuses them:
    """${userMessage.value}"""

    Lesson title: ${content.value.topic.replaceAll('-', ' ')}
    Student's goal: ${goal}

    Respond in this exact format, and keep the whole answer very short and direct (كل جزء سطر أو اتنين بالكتير):

    1. **بناءً على هدفك 🎯**
      ابدأ بسطر واحد: "بناءً على هدفك (${goal})، إحنا بنستخدم ده في مواقف زي كذا..." — عشان الطالب يحس إن الشرح مخصوص له.

    2. **الحل ببساطة (من غير تعقيد)**
      رد على لبس الطالب بالظبط في 2–3 جمل عامية مصرية سهلة جداً. اتكلم عن النقطة اللي هو قال إنه مش فاهمها بس، وماتشرحش الموضوع كله.

    3. **أمثلة على هدفك (${goal})**
      3 أمثلة إنجليزي قصيرة + ترجمة عامية مصرية، كلها مرتبطة بـ ${goal}. إيموجي واحد لكل مثال.

    4. **غلطة شائعة ❌ → ✅**
      غلطة واحدة بس المصريين بيعملوها في النقطة دي.

    5. **اختبر نفسك (سؤال واحد بس)**
      اسأل سؤال واحد قصير. ماتديش الإجابة.

    6. **الخاتمة**
      اختم بـ: "جاوبني وأنا هصحح لك الإجابة وأقولك السبب ✅
  `);

  const encodedPrompt = encodeURIComponent(prompt.value);
  const promptLink = computed(() =>
    `https://chatgpt.com/?q=${encodeURIComponent(prompt.value)}`
  )
</script>

<template>
  <div v-if="content">
    <h1>{{ content.title }}</h1>
    <p>{{ content.description }}</p>
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

    <form>
      <label>ايه بالظبط مش فاهمه او لسه محتاج تدرب عليه او حاسه معصلج؟</label>
      <textarea v-model="userMessage" placeholder="حد راحتك في الكتابة... متشغلش نفسك بالبرومت ال AI عارف هيتعامل ازاي"></textarea>

      <a :href="promptLink" target="_blank">اسأل النموزج 🤖</a>
      <p>سيتم فتح صفحة جديدة في ChatGPT فقط قم بضغط Enter او زر الارسال و لا تعدل الرسالة حتي تحصل علي افضل شرح ممكن.</p>
    </form>
    
    <br />
    <br />
    <a :href="ytSearch" target="_blank">شوف فيديو ثاني 👨‍🏫</a>

    <RouterLink :to="`/grammar/${topic}/test`">اختبرني على {{ content.title }} 💪</RouterLink>
  </div>
</template>