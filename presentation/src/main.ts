import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

window.addEventListener('message', event => {
  const message = event.data; // The JSON data our extension sent
  console.log("message recieved");

  if (message.command) {
    console.log(message.command);
  }
});