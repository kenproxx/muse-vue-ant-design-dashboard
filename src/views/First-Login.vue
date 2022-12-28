<template>
  <a-spin tip="Đang tải..." :spinning="isSpinning">
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
            @keydown.enter="handleSubmit"
        >
          <a-row>
            <a-col :span="8">
              <a-form-item label="Tên thánh">
                <a-input
                    v-decorator="[
						'tenThanh',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    v-model="formData.tenThanh"
                    placeholder="Tên thánh"
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Ngày sinh">
                <a-date-picker class="full-width"
                               v-decorator="[
						'ngayThangNamSinh',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                               v-model="formData.ngayThangNamSinh"
                               placeholder="Ngày sinh"
                />
              </a-form-item>
              <a-form-item label="Số điện thoại cá nhân">
                <a-input
                    v-decorator="[
						'soDienThoaiCaNhan',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    v-model="formData.soDienThoaiCaNhan"
                    placeholder="Số điện thoại cá nhân"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Tên gọi">
                <a-input
                    v-decorator="[
						'tenGoi',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    v-model="formData.tenGoi"
                    placeholder="Tên gọi"
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Giới tính">
                <a-input
                    v-decorator="[
						'gioiTinh',
						]"
                    v-model="formData.gioiTinh"
                    placeholder="Giới tính"
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Ngày bổn mạng">
                <a-date-picker class="full-width"
                               v-decorator="[
						'ngayBonMang',
						]"
                               v-model="formData.ngayBonMang"
                               placeholder="Ngày bổn mạng"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Ảnh đại diện">

                <a-upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    list-type="picture-card"
                    @preview="handlePreview"
                    @change="handleChange"
                    v-decorator="[
						'anhDaiDien',
						]"

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
                <a-date-picker class="full-width"
                               v-decorator="[
						'ngayRuaToi',
						]"
                               v-model="formData.ngayRuaToi"
                               placeholder="Ngày rửa tội"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Người rửa tội">
                <a-input
                    v-decorator="[
						'nguoiRuaToi',
						]"
                    v-model="formData.nguoiRuaToi"
                    placeholder="Người rửa tội"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Người đỡ đầu">
                <a-input
                    v-decorator="[
						'nguoiDoDauRuaToi',
						]"
                    v-model="formData.nguoiDoDauRuaToi"
                    placeholder="Người đỡ đầu"
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item label="Ngày thêm sức">
                <a-date-picker class="full-width"
                               v-decorator="[
						'ngayThemSuc',
						]"
                               v-model="formData.ngayThemSuc"
                               placeholder="Ngày thêm sức"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Người thêm sức">
                <a-input
                    v-decorator="[
						'nguoiThemSuc',
						]"
                    v-model="formData.nguoiThemSuc"
                    placeholder="Người thêm sức"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Người đỡ đầu">
                <a-input
                    v-decorator="[
						'nguoiDoDauThemSuc',
						]"
                    v-model="formData.nguoiDoDauThemSuc"
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
						'tenBo',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    v-model="formData.tenBo"
                    placeholder="Tên thánh/ tên gọi Bố"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Số điện thoại Bố">
                <a-input
                    v-decorator="[
						'sdtBo',
						{ rules: [
                { required: true, message: requiredField },
                { pattern: /^[0-9]+$/, message: onlyNumber },
                ] },
						]"
                    v-model="formData.sdtBo"
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
						'tenMe',
						{ rules: [
                { required: true, message: requiredField },
                { pattern: /^[0-9]+$/, message: onlyNumber },
                ] },
						]"
                    v-model="formData.tenMe"
                    placeholder="Tên thánh/ tên gọi Mẹ"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Số điện thoại Mẹ">
                <a-input
                    v-decorator="[
						'sdtMe',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    v-model="formData.sdtMe"
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
						'diaChi',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    v-model="formData.diaChi"
                    placeholder="Địa chỉ hành chính"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Thuộc giáo xứ">
                <a-input
                    v-decorator="[
						'giaoXuId',
						]"
                    v-model="formData.giaoXuId"
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
                    placeholder="Giáo hạt (ko cần nhập)"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Giáo phận">
                <a-input
                    placeholder="Giáo phận (ko cần nhập)"
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
  </a-spin>
</template>

<script>
import {getUserInfo, setSession, USER_INFO} from "@/util/MemoryCommon";
import axios from "axios";
import {baseURL, UPDATE, USER} from "@/api/api";
import {authHeader} from "@/router/auth-header";

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
      form: this.$form.createForm(this, {name: 'normal_login'}),
      previewVisible: false,
      isSpinning: false,
      previewImage: '',
      fileList: [],
      requiredField: 'Trường này là bắt buộc',
      onlyNumber: 'Chỉ nhập số',
      formData: getUserInfo,
    }
  },
  created() {
  },
  methods: {
    // Handles input validation after submission.
    handleSubmit() {
      this.form.validateFields((err) => {
        if (!err) {
          axios.put(baseURL + USER + UPDATE, this.formData)
              .then(response => {
                this.isSpinning = true;
                this.$message.success('Cập nhật thông tin thành công');
                setSession(USER_INFO, JSON.stringify(this.formData));
                this.$router.push({name: 'Home'});
              })
              .catch(error => {
                this.$message.error('Cập nhật thông tin thất bại');
              }).finally(() => {
            this.isSpinning = false;
          });
        } else {
          this.$message.error('Vui lòng nhập đầy đủ thông tin');
        }
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

.full-width {
  width: 100%;
}
</style>
