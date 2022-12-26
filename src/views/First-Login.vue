<template>
  <div>

    <!-- Sign Up Image And Headings -->
    <div class="sign-up-header" style="background-image: url('images/bg-signup.jpg')">

    </div>
    <!-- / Sign Up Image And Headings -->

    <!-- Sign Up Form -->
    <a-card :bordered="false" class="card-first-login header-solid h-full" :bodyStyle="{paddingTop: 0}">
      <template #title>
        <h5 class="font-semibold text-center">Cập nhật thông tin cá nhân</h5>
      </template>
      <a-form
          :form="form"
          @submit="handleSubmit"
          :labelCol="{span: 10}"
          :wrapperCol="{span: 14}"
      >
        <a-row>
          <a-col :span="8">
            <a-form-item label="Tên thánh">
              <a-input
                  v-decorator="[
						'ten-thanh',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                  placeholder="Tên thánh"
              >
              </a-input>
            </a-form-item>
            <a-form-item label="Ngày sinh">
              <a-date-picker
                  v-decorator="[
						'ngay-sinh',
						{ rules: [{ required: true, message: requiredField }] },
						]"

                  placeholder="Ngày sinh"
              >
              </a-date-picker>
            </a-form-item>
            <a-form-item label="Số điện thoại cá nhân">
              <a-input
                  v-decorator="[
						'so-dien-thoai',
						{ rules: [{ required: true, message: requiredField }] },
						]"

                  placeholder="Số điện thoại cá nhân"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Tên gọi">
              <a-input
                  v-decorator="[
						'ten-goi',
						{ rules: [{ required: true, message: requiredField }] },
						]"

                  placeholder="Tên gọi"
              >
              </a-input>
            </a-form-item>
            <a-form-item label="Giới tính">
              <a-input
                  v-decorator="[
						'gioi-tinh',
						]"
                  placeholder="Giới tính"
              >
              </a-input>
            </a-form-item>
            <a-form-item label="Ngày bổn mạng">
              <a-input
                  v-decorator="[
						'ten-thanh',
						]"
                  placeholder="Ngày bổn mạng"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Ảnh đại diện">

              <a-upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  list-type="picture-card"
                  @preview="handlePreview"
                  @change="handleChange"
              >
                <a-icon type="plus"/>
                <div>
                  Upload
                </div>
              </a-upload>

              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage"/>
              </a-modal>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="8">
            <a-form-item label="Ngày rửa tội">
              <a-input
                  v-decorator="[
						'ngay-rua-toi',
						]"
                  placeholder="Ngày rửa tội"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Người rửa tội">
              <a-input
                  v-decorator="[
						'ten-thanh',
						]"
                  placeholder="Người rửa tội"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Người đỡ đầu">
              <a-input
                  v-decorator="[
						'ten-thanh',
						]"
                  placeholder="Người đỡ đầu"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-item label="Ngày thêm sức">
              <a-input
                  v-decorator="[
						'ten-thanh',
						]"
                  placeholder="Ngày thêm sức"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Người thêm sức">
              <a-input
                  v-decorator="[
						'ten-thanh',
						]"
                  placeholder="Người thêm sức"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="Người đỡ đầu">
              <a-input
                  v-decorator="[
						'ten-thanh',
						]"
                  placeholder="Người đỡ đầu"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider/>

        <a-row>
          <a-col :span="12">
            <a-form-item label="Tên thánh/ tên gọi Bố">
              <a-input
                  v-decorator="[
						'name',
						{ rules: [{ required: true, message: requiredField }] },
						]"

                  placeholder="Tên thánh/ tên gọi Bố"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Số điện thoại Bố">
              <a-input
                  v-decorator="[
						'name',
						{ rules: [{ required: true, message: requiredField }] },
						]"

                  placeholder="Số điện thoại Bố"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="Tên thánh/ tên gọi Mẹ">
              <a-input
                  v-decorator="[
						'name',
						{ rules: [{ required: true, message: requiredField }] },
						]"

                  placeholder="Tên thánh/ tên gọi Mẹ"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Số điện thoại Mẹ">
              <a-input
                  v-decorator="[
						'name',
						{ rules: [{ required: true, message: requiredField }] },
						]"

                  placeholder="Số điện thoại Mẹ"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="Địa chỉ hành chính">
              <a-input
                  v-decorator="[
						'name',
						{ rules: [{ required: true, message: requiredField }] },
						]"

                  placeholder="Địa chỉ hành chính"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Thuộc giáo xứ">
              <a-input
                  v-decorator="[
						'ten-thanh',
						]"
                  placeholder="Giáo xứ"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="Giáo hạt">
              <a-input

                  v-decorator="[
						'ten-thanh',
						]"
                  placeholder="Giáo hạt"
              >
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Giáo phận">
              <a-input
                  v-decorator="[
						'ten-thanh',
						]"
                  placeholder="Giáo phận"
              >
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item>
        </a-form-item>

        <a-row type="flex" justify="space-around" align="middle">
          <a-button type="primary" @click="handleSubmit">
            Lưu
          </a-button>
        </a-row>
      </a-form>
    </a-card>
    <!-- / Sign Up Form -->

  </div>
</template>

<script>
import {useGioiTinhStore} from "@/common/store";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default {
  data() {
    return {
      formInfo: {
        name: '',
        email: '',
        password: '',
        confirm: '',
        avatar: '',
        avatarUrl: '',
        prefix: '86',
        phone: '',
        website: '',
        captcha: '',
        agree: false,
      },
      form: this.$form.createForm(this, {name: 'normal_login'}),
      previewVisible: false,
      previewImage: '',
      fileList: [],
      requiredField: 'Trường này là bắt buộc',
    }
  },
  created() {
  },
  methods: {
    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        console.log(err, values);
        if (!err) {
          this.$router.push({name: 'Home'});
        }
        this.$message.error('Vui lòng nhập đầy đủ thông tin');
      });
    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({fileList}) {
      if (fileList.length > 1) {
        fileList.shift();
      }
      this.fileList = fileList;
    },
  },
}

</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
