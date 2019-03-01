import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

const apiUrl = process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: `//${apiUrl}`,
});

Vue.use(VueAxios, axiosInstance);
