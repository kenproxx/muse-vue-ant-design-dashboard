<template>
  <a-spin tip="Đang tải..." :spinning="isSpinning">
	<div class="sign-in">

		<a-row type="flex" :gutter="[24,24]" justify="space-around" align="middle">

			<!-- Sign In Form Column -->
			<a-col :span="24" :md="12" :lg="{span: 12, offset: 0}" :xl="{span: 6, offset: 2}" class="col-form">
				<h1 class="mb-15">Đăng nhập</h1>

				<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					@submit="handleSubmit"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="Tên đăng nhập" :colon="false">
						<a-input
            v-decorator="[
						'username',
						{ rules: [
                { required: true, message: 'Vui lòng nhập tên đăng nhập' },
						    { min: 6, message: 'Tối thiểu 5 ký tự' },
						    { pattern: /^[a-zA-Z0-9]*$/, message: 'Không đuợc nhập chữ có dấu' },
						  ]}
						]"
            placeholder="Tên đăng nhập" v-model="formLogin.username"/>
					</a-form-item>
					<a-form-item class="mb-5" label="Mật khẩu" :colon="false">
						<a-input
            v-decorator="[
						'password',
						{ rules: [
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                { min: 10, message: 'Tối thiểu 10 ký tự' },
                ] },
						]"
            type="password" placeholder="Mật khẩu" v-model="formLogin.password"/>
					</a-form-item>
					<a-form-item>
						<a-button type="primary" block html-type="submit" class="login-form-button">
							SIGN IN
						</a-button>
					</a-form-item>
				</a-form>
				<!-- / Sign In Form -->

				<p class="font-semibold text-muted">Chưa có tài khoản? <router-link to="/sign-up" class="font-bold text-dark">Đăng ký ngay</router-link></p>
			</a-col>
			<!-- / Sign In Form Column -->

			<!-- Sign In Image Column -->
			<a-col :span="24" :md="12" :lg="12" :xl="12" class="col-img">
				<img src="images/img-signin.jpg" alt="">
			</a-col>
			<!-- Sign In Image Column -->

		</a-row>

	</div>
  </a-spin>
</template>

<script>

  import { LOGIN} from "@/api/api";
  import {ACCESS_TOKEN, baseURL, setSession, USER_INFO} from "@/util/MemoryCommon";

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
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
		methods: {
			// Handles input validation after submission.
			handleSubmit(e) {
				e.preventDefault();
				this.form.validateFields((err, values) => {
					if ( !err ) {
            this.isSpinning = true;
            this.axios.post(baseURL + LOGIN, this.formLogin).then(res => {
              const access_token = res.data.accessToken;
              setSession(ACCESS_TOKEN, access_token);
              setSession(USER_INFO, res.data);
              this.$message.success('Đăng nhập thành công');
              const userDetail = res.data.userDetail;
              console.log(userDetail);
              if (userDetail.tenThanh === null) {
                this.$router.push({name: 'First-Login'});
              } else {
                this.$router.push({name: 'Home'});
              }
            }).catch(() => {
              this.$message.error('Sai tên đăng nhập hoặc mật khẩu');
            }).finally(() => {
              this.isSpinning = false;
            })
					}
				});
			},
		},
	}

</script>

<style lang="scss">
	body {
		background-color: #ffffff;
	}
</style>
