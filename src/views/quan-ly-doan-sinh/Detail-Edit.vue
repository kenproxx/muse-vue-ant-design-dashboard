<template>
  <a-spin :spinning="isSpinning" tip="Đang tải...">
    <div>
      <!-- Sign Up Image And Headings -->
      <div class="sign-up-header" style="background-image: url('images/bg-signup.jpg')">

      </div>
      <!-- / Sign Up Image And Headings -->

      <!-- Sign Up Form -->
      <a-card :bodyStyle="{paddingTop: 0}" :bordered="false" class="card-first-login header-solid h-full">
        <template #title>
          <h5 class="font-semibold text-center">Cập nhật thông tin cá nhân</h5>
        </template>
        <a-form
            :form="form"
            :labelCol="{span: 10}"
            :wrapperCol="{span: 14}"
            @submit="handleSubmit"
            @keydown.enter="handleSubmit"
        >
          <a-row>
            <a-col :span="8">
              <a-form-item label="Tên thánh">
                <a-input
                    v-model="formData.tenThanh" v-decorator="[
						'tenThanh',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    placeholder="Tên thánh"
                    size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Ngày sinh">
                <a-date-picker v-model="formData.ngayThangNamSinh" v-decorator="[
						'ngayThangNamSinh',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                               class="full-width"
                               placeholder="Ngày sinh"
                               size="small"
                />
              </a-form-item>
              <a-form-item label="Số điện thoại cá nhân">
                <a-input
                    v-model="formData.soDienThoaiCaNhan" v-decorator="[
						'soDienThoaiCaNhan',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    placeholder="Số điện thoại cá nhân"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Tên gọi">
                <a-input
                    v-model="formData.tenGoi" v-decorator="[
						'tenGoi',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    placeholder="Tên gọi"
                    size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Giới tính">
                <a-input
                    v-model="formData.gioiTinh" v-decorator="[
						'gioiTinh',
						]"
                    placeholder="Giới tính"
                    size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item label="Ngày bổn mạng">
                <a-date-picker v-model="formData.ngayBonMang" v-decorator="[
						'ngayBonMang',
						]"
                               class="full-width"
                               placeholder="Ngày bổn mạng"
                               size="small"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Ảnh đại diện">

                <a-upload
                    v-model="anhDaiDien" v-decorator="[
						'anhDaiDien',
						]"
                    accept="image/*"
                    list-type="picture-card"
                    size="small"
                    @change="handleChange($event)"
                    @preview="handlePreview"
                >
                  <a-icon type="plus"/>
                  <div>
                    Upload
                  </div>
                </a-upload>

                <a-modal :footer="null" :visible="previewVisible" @cancel="handleCancel">
                  <img :src="previewImage" alt="example" style="width: 100%"/>
                </a-modal>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="8">
              <a-form-item label="Ngày rửa tội">
                <a-date-picker v-model="formData.ngayRuaToi" v-decorator="[
						'ngayRuaToi',
						]"
                               class="full-width"
                               placeholder="Ngày rửa tội"
                               size="small"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Người rửa tội">
                <a-input
                    v-model="formData.nguoiRuaToi" v-decorator="[
						'nguoiRuaToi',
						]"
                    placeholder="Người rửa tội"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Người đỡ đầu">
                <a-input
                    v-model="formData.nguoiDoDauRuaToi" v-decorator="[
						'nguoiDoDauRuaToi',
						]"
                    placeholder="Người đỡ đầu"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item label="Ngày thêm sức">
                <a-date-picker v-model="formData.ngayThemSuc" v-decorator="[
						'ngayThemSuc',
						]"
                               class="full-width"
                               placeholder="Ngày thêm sức"
                               size="small"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Người thêm sức">
                <a-input
                    v-model="formData.nguoiThemSuc" v-decorator="[
						'nguoiThemSuc',
						]"
                    placeholder="Người thêm sức"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Người đỡ đầu">
                <a-input
                    v-model="formData.nguoiDoDauThemSuc" v-decorator="[
						'nguoiDoDauThemSuc',
						]"
                    placeholder="Người đỡ đầu"
                    size="small"
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
                    v-model="formData.tenBo" v-decorator="[
						'tenBo',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    placeholder="Tên thánh/ tên gọi Bố"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Số điện thoại Bố">
                <a-input
                    v-model="formData.sdtBo" v-decorator="[
						'sdtBo',
						{ rules: [
                { required: true, message: requiredField },
                { pattern: /^[0-9]+$/, message: onlyNumber },
                ] },
						]"
                    placeholder="Số điện thoại Bố"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="Tên thánh/ tên gọi Mẹ">
                <a-input
                    v-model="formData.tenMe" v-decorator="[
						'tenMe',
						{ rules: [
                { required: true, message: requiredField },
                { pattern: /^[0-9]+$/, message: onlyNumber },
                ] },
						]"
                    placeholder="Tên thánh/ tên gọi Mẹ"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Số điện thoại Mẹ">
                <a-input
                    v-model="formData.sdtMe" v-decorator="[
						'sdtMe',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    placeholder="Số điện thoại Mẹ"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="Địa chỉ hành chính">
                <a-input
                    v-model="formData.diaChi" v-decorator="[
						'diaChi',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                    placeholder="Địa chỉ hành chính"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Thuộc giáo xứ">
                <a-input
                    v-model="formData.giaoXuId" v-decorator="[
						'giaoXuId',
						]"
                    placeholder="Giáo xứ"
                    size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item label="Giáo hạt">
                <a-input
                    placeholder="Giáo hạt (ko cần nhập)" size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Giáo phận">
                <a-input
                    placeholder="Giáo phận (ko cần nhập)" size="small"
                >
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item>
          </a-form-item>

          <a-row align="middle" justify="space-around" type="flex">
            <a-button size="small" type="primary" @click="handleSubmit">
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
import {setSession, USER_INFO} from "@/util/MemoryCommon";
import axios from "axios";
import {baseURL, UPDATE, USER} from "@/api/api";

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
      // formData: getUserInfo,
      formData: {},
      anhDaiDien: {},
    }
  },
  created() {
  },
  methods: {
    // Handles input validation after submission.
    async handleSubmit() {
      let reader = new FileReader(this.fileList[0]);
      reader.onloadend = async () => {
        this.newImage = await reader.result;
      };
      await reader.readAsDataURL(this.fileList[0].toBlob);
      this.anhDaiDien = this.newImage;
      console.log(this.anhDaiDien);

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
    // handleChange({fileList}) {
    //   if (fileList.length > 1) {
    //     fileList.shift();
    //   }
    //   this.fileList = fileList;
    // },
    handleChange(event) {
      console.log(event);
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
