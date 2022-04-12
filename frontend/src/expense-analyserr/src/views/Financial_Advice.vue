<template>
  <div id="financial-advice">
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-1">
          <div
          class="items"
          v-for="(advice,id) in advices"
          :key="id"
          >
            <div
            class="item-header"
            @click="dropdown(id)">
              <b-icon-caret-right-fill></b-icon-caret-right-fill> {{ advice.title }}
            </div>
            <div class="item-content">
              {{ advice.content }}
              <a v-if="advice.source !== ''" :href="advice.source"><br><br>Source</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import advices from '@/assets/js/advices.js'
export default {
  name: 'FinancialAdvice',
  data () {
    return {
      advices
    }
  },
  methods: {
    /**
     * toggle textbox when user click on a card
     */
    dropdown (id) {
      const element = document.getElementsByClassName('items')[id].children[1]
      element.style.display = element.style.display !== 'block' ? 'block' : 'none'
    }
  }
}
</script>
<style scoped>
#financial-advice {
  background: white;
}
.items {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 20px auto;
  border: 1px solid steelblue;
}
.item-header, .item-content {
  padding: 10px 20px;
}
.item-header {
  font-size: 1.2em;
  background: steelblue;
  color: white;
  cursor: pointer;
  text-transform: capitalize;
}
.item-content {
  color: #a0a0a0;
  white-space: pre-line;
  display: none;
}
</style>
