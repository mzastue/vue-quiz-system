import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const host = process.env.VUE_APP_API_HOST;
const port = process.env.VUE_APP_API_PORT;
const endpoint = process.env.VUE_APP_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL: `http://${host}:${port}/${endpoint}`,
});

Vue.use(VueAxios, axiosInstance);
