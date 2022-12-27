<!--
	This is the sign up page, it uses the dashboard layout in:
	"./layouts/Default.vue" .
 -->

<template>
  <a-spin :spinning="isSpinning" tip="Đang tải...">
    <div>

      <!-- Sign Up Image And Headings -->
      <div class="sign-up-header" style="background-image: url('images/bg-signup.jpg')">
        <div class="content">
          <h1 class="mb-5">Đăng ký</h1>
        </div>
      </div>
      <!-- / Sign Up Image And Headings -->

      <!-- Sign Up Form -->
      <a-card :bodyStyle="{paddingTop: 0}" :bordered="false" class="card-signup header-solid h-full">
        <!--			<template #title>-->
        <!--				<h5 class="font-semibold text-center">Register With</h5>-->
        <!--			</template>-->
        <!--			<div class="sign-up-gateways">-->
        <!--    			<a-button>-->
        <!--					<img src="images/logos/logos-facebook.svg" alt="">-->
        <!--				</a-button>-->
        <!--    			<a-button>-->
        <!--					<img src="images/logos/logo-apple.svg" alt="">-->
        <!--				</a-button>-->
        <!--    			<a-button>-->
        <!--					<img src="images/logos/Google__G__Logo.svg.png" alt="">-->
        <!--				</a-button>-->
        <!--			</div>-->
        <p class="text-center my-25 font-semibold text-muted"></p>
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
        >
          <a-form-item class="mb-10">
            <a-input
                v-decorator="[
						'username',
						{ rules: [
                { required: true, message: 'Vui lòng nhập tên đăng nhập' },
						    { min: 6, message: 'Tối thiểu 5 ký tự' },
						    { pattern: /^[a-zA-Z0-9]*$/, message: 'Không đuợc nhập chữ có dấu' },
						  ]}
						]"
                placeholder="Tên đăng nhập"
            >
            </a-input>
          </a-form-item>
          <a-form-item class="mb-5">
            <a-input
                v-decorator="[
						'password',
						{ rules: [
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                { pattern: /^(?=.{10,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$/,
                 message: 'Mật khẩu phải chứa chữ Hoa, chữ thường, ký tự đặc biệt và số, tối thiểu 10 ký tự' },
                ] },
						]"
                placeholder="Mật khẩu"
                type="password"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button block class="login-form-button" html-type="submit" type="primary">
              Đăng ký
            </a-button>
          </a-form-item>
        </a-form>
        <p class="font-semibold text-muted text-center">Bạn đã có tài khoản?
          <router-link class="font-bold text-dark" to="/sign-in">Đăng nhập ngay</router-link>
        </p>
      </a-card>
      <!-- / Sign Up Form -->

    </div>
  </a-spin>
</template>

<script>

import axios from "axios";
import {baseURL} from "@/util/MemoryCommon";
import {REGISTER} from "@/api/api";

export default {
  data() {
    return {
      loading: false,
      isSpinning: false,
    }
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this, {name: 'normal_login'});
  },
  methods: {
    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.isSpinning = true;
          const user = {
            username: values.username,
            password: values.password,
            confirmPassword: values.password,
          }
          axios.post(baseURL + REGISTER, user)
              .then(() => {
                this.$message.success('Đăng ký thành công');
                this.$router.push({name: 'Sign-In'});
              })
              .catch(() => {
                this.$message.error('Tên đăng nhập đã tồn tại');
              })
              .finally(() => {
                this.isSpinning = false;
              });
        }
      });
    },
  },
}

</script>

<style lang="scss">
</style>
