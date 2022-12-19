import axios from "axios";

export const getTasksUser = (userId) =>
  axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);

export const getAllTasks = (userId) =>
  axios.get(`https://jsonplaceholder.typicode.com/todos`);  

export const getPostsUser = (userId) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);

  export const getAllPosts = (userId) =>
    axios.get(`https://jsonplaceholder.typicode.com/posts`);  