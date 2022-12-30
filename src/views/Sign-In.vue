<template>
  <a-spin :spinning="isSpinning" tip="Đang tải...">
    <div class="sign-in">

      <a-row :gutter="[24,24]" align="middle" justify="space-around" type="flex">

        <!-- Sign In Form Column -->
        <a-col :lg="{span: 12, offset: 0}" :md="12" :span="24" :xl="{span: 6, offset: 2}" class="col-form">
          <h1 class="mb-15">Đăng nhập</h1>

          <!-- Sign In Form -->
          <a-form
              id="components-form-demo-normal-login"
              :form="form"
              :hideRequiredMark="true"
              class="login-form"
              @submit="handleSubmit"
              @keydown.enter="handleSubmit"
          >
            <a-form-item :colon="false" class="mb-10" label="Tên đăng nhập">
              <a-input
                  v-decorator="[
						'username',
						{ rules: [
                { required: true, message: 'Vui lòng nhập tên đăng nhập' },
						    { min: 6, message: 'Tối thiểu 5 ký tự' },
						    { pattern: /^[a-zA-Z0-9]*$/, message: 'Không đuợc nhập chữ có dấu' },
						  ]}
						]" placeholder="Tên đăng nhập"
                  size="small"/>
            </a-form-item>
            <a-form-item :colon="false" class="mb-5" label="Mật khẩu">
              <a-input
                  v-decorator="[
						'password',
						{ rules: [
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                { min: 10, message: 'Tối thiểu 10 ký tự' },
                ] },
						]" placeholder="Mật khẩu"
                  size="small" type="password"/>
            </a-form-item>
            <a-form-item>
              <a-button block class="login-form-button" html-type="submit" size="small" type="primary">
                SIGN IN
              </a-button>
            </a-form-item>
          </a-form>
          <!-- / Sign In Form -->

          <p class="font-semibold text-muted">Chưa có tài khoản?
            <router-link class="font-bold text-dark" to="/sign-up">Đăng ký ngay</router-link>
          </p>
        </a-col>
        <!-- / Sign In Form Column -->

        <!-- Sign In Image Column -->
        <a-col :lg="12" :md="12" :span="24" :xl="12" class="col-img">
          <img alt="" src="images/img-signin.jpg">
        </a-col>
        <!-- Sign In Image Column -->

      </a-row>

    </div>
  </a-spin>
</template>

<script>

import {baseURL, GET_ALL_THONG_SO, LOGIN, USER} from "@/api/api";
import {ACCESS_TOKEN, GIOI_TINH, NGANH, ROLE_USER, setLocal, setSession, USER_INFO} from "@/util/MemoryCommon";
import axios from "axios";

export default {
  data() {
    return {
      isSpinning: false,
      formLogin: {
        username: '',
        password: ''
      }
    }
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },
  methods: {
    // Handles input validation after submission.
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          axios.post(baseURL + LOGIN, values).then(res => {
            this.isSpinning = true;
            const access_token = res.data.token;
            const user_info = res.data.userDetail;
            // const role_user = res.data.role;
            setSession(ACCESS_TOKEN, access_token);
            setSession(USER_INFO, JSON.stringify(user_info));
            // setSession(ROLE_USER, JSON.stringify(role_user));
            this.$message.success('Đăng nhập thành công');
            axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
            if (user_info.tenThanh === null) {
              this.$router.push({name: 'First-Login'});
            } else {
              this.$router.push({name: 'Home'});
            }
            this.getThongSo();
          }).catch(() => {
            this.$message.error('Sai tên đăng nhập hoặc mật khẩu');
          }).finally(() => {
            this.isSpinning = false;
          })
        }
      });
    },
    getThongSo() {
      const nganh = 'NGANH';
      const gioiTinh = 'GIOI_TINH';
      let listNganh = [];
      let listGioiTinh = [];
      axios.get(baseURL + USER + GET_ALL_THONG_SO).then(res => {
        for (const dataKey in res.data) {
          if (res.data[dataKey].loai == nganh) {
            listNganh.push(res.data[dataKey]);
          }
          if (res.data[dataKey].loai == gioiTinh) {
            listGioiTinh.push(res.data[dataKey]);
          }
        }
        setLocal(NGANH, JSON.stringify(listNganh));
        setLocal(GIOI_TINH, JSON.stringify(listGioiTinh));

      })
    },
  }
}

</script>

<style lang="scss">
body {
  background-color: #ffffff;
}
</style>
