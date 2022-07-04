<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>



    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import  axios from 'axios'
import {message} from "ant-design-vue";
export default defineComponent({
  setup() {
    const formState = reactive({
      username: '',
      password: '',
    });

    const onFinish = values => {
      console.log('Success:', values);
      axios.post('/api/api/user/login',values)
          .then(res=>{
            console.log('res=>',res);
            if (res.data.code==400){
              message.warn(res.data.message)
            }
            if (res.data.code==200){
              message.info(res.data.message)
              localStorage.setItem('token',res.data.data.token)
            }
          })    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },

});
</script>

<style scoped>

</style>
