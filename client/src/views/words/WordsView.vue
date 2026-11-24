<script setup>
import { RouterLink } from 'vue-router'
import vocabsData from '@/data/data.json'
import { computed, ref } from "vue";

const order = ref("a-z") // asc, desc, finished, verbs, nouns, adverbs, adjectives, 

const vocabs = ref(vocabsData)

function filterVocabs() {  
  if (order.value === "a-z") {
    vocabs.value = vocabsData.sort((a, b) => a.word.localeCompare(b.word))
  }
  if (order.value === "z-a") {
    vocabs.value = vocabsData.sort((a, b) => b.word.localeCompare(a.word))
  }
  if (order.value === "noun") {
    vocabs.value = vocabsData.filter(v => v.types.includes("noun"))
  }
  if (order.value === "verb") {
    vocabs.value = vocabsData.filter(v => v.types.includes("verb"))
  }
  if (order.value === "adj") {
    vocabs.value = vocabsData.filter(v => v.types.includes("adj"))
  }
  if (order.value === "adv") {
    vocabs.value = vocabsData.filter(v => v.types.includes("adv"))
  }
}

/*function checkWord(e) {
  e.currentTarget.classList.toggle('marked')
}
@click="checkWord($event)"
*/
</script>

<template>
  <main>
    <h1>الكلمات 📖</h1>

    <RouterLink to="/words/practice">ابدأ التدريب 💪</RouterLink>

    <label for="order">رتب حسب</label>
    <select v-model="order" id="order" @change="filterVocabs">
      <option value="a-z" selected>A إلي Z</option>
      <option value="z-a">Z إلي A</option>
      <option value="noun">كلمات</option>
      <option value="verb">افعال</option>
      <option value="adv">حال</option>
      <option value="adj">صفات</option>
    </select>

    <div>
      <table v-if="vocabs.length">
        <thead>
          <tr>
            <th>الكلمة</th>
            <th>الترجمة</th>
            <th>النوع</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(vocab, i) in vocabs" 
            :key="i"
            
          >
            <td>{{ vocab.word }}</td>
            <td>{{ vocab.translation }}</td>
            <td>
              <span v-for="(type, j) in vocab.types" :key="j">
                {{ type }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>لا يتوفر كلمات</p>
    </div>
  </main>
</template>