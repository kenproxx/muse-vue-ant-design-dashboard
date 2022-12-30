<template>

  <!-- Authors Table Card -->
  <a-card :bodyStyle="{padding: 0,}" :bordered="false" class="header-solid h-full">
    <template #title>
      <a-row align="middle" type="flex">
        <a-col :md="12" :span="24">
          <h5 class="font-semibold m-0">Danh sách đoàn sinh</h5>
        </a-col>
      </a-row>
      <br/>
      <div id="components-form-demo-advanced-search">
        <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" class="ant-advanced-search-form"
                @submit="handleSearch">
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item label="Tên đăng nhập">
                <a-input placeholder="placeholder" size="small"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Tên người dùng">
                <a-input placeholder="placeholder" size="small"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="Lớp">
                <a-input placeholder="placeholder" size="small"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :style="{ textAlign: 'right' }">
              <a-button html-type="submit" size="small" type="primary">
                Tìm kiếm
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" size="small" @click="handleReset">
                Tạo lại
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" size="small" @click="handleReset">
                Xuất Excel
              </a-button>
              <a-dropdown :style="{ marginLeft: '8px' }">
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                  Thao tác hàng loạt
                  <a-icon type="down"/>
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;">Thêm vào lớp</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">Chuyển lớp</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">Thông báo cho phụ huynh</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </template>
    <a-table :columns="columns" :data-source="data" :loading="loading"
             :pagination="pagination"
             :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" @change="change">

      <template slot="author" slot-scope="author">
        <div class="table-avatar-info">
          <a-avatar :src="author.avatar" shape="square"/>
          <div class="avatar-info">
            <h6>{{ author.name }}</h6>
            <p>{{ author.email }}</p>
          </div>
        </div>
      </template>

      <template slot="func" slot-scope="func">
        <div class="author-info">
          <h6 class="m-0">{{ func.job }}</h6>
          <p class="m-0 font-regular text-muted">{{ func.department }}</p>
        </div>
      </template>

      <template slot="status" slot-scope="status">
        <a-tag :class="status ? 'ant-tag-primary' : 'ant-tag-muted'" class="tag-status">
          {{ status ? "Hoạt động" : "Không hoạt động" }}
        </a-tag>
      </template>

      <template slot="editBtn" slot-scope="row,text, record">
        <a-button :data-id="row.key" class="btn-edit" type="link" @click="handleDetail">
          Chi tiết
        </a-button>
        <a-button :data-id="row.key" class="btn-edit" type="link">
          Chỉnh sửa
        </a-button>
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            Thao tác
            <a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">Thêm vào lớp</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">Chuyển lớp</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>

    </a-table>

    <a-modal
        :confirm-loading="confirmLoading"
        :visible="visible"
        :width="'80%'"
        @cancel="handleCancel"
        @ok="modeDetail = !modeDetail"
    >

      <div>

        <a-form
            :form="form"
            :labelCol="{span: 10}"
            :wrapperCol="{span: 14}"
            @submit="handleSubmit"
            @keydown.enter="handleSubmit"
        >
          <a-row>
            <a-col :span="8">
              <a-form-item v-if="modeDetail" label="Tên thánh"

              >
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
              <a-form-item v-else label="Tên thánh">
                {{ formData.tenThanh }}
              </a-form-item>
              <a-form-item v-if="modeDetail" label="Ngày sinh">
                <a-date-picker v-model="formData.ngayThangNamSinh" v-decorator="[
						'ngayThangNamSinh',
						{ rules: [{ required: true, message: requiredField }] },
						]"
                               class="full-width"
                               placeholder="Ngày sinh"
                               size="small"
                />
              </a-form-item>
              <a-form-item v-else label="Ngày sinh">
                {{ formData.ngayThangNamSinh }}
              </a-form-item>
              <a-form-item v-if="modeDetail" label="Số điện thoại cá nhân">
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
              <a-form-item v-else label="Số điện thoại cá nhân">
                {{ formData.soDienThoaiCaNhan }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item v-if="modeDetail" label="Tên gọi">
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
              <a-form-item v-else label="Tên gọi">
                {{ formData.tenGoi }}
              </a-form-item>
              <a-form-item v-if="modeDetail" label="Giới tính">
                <a-input
                    v-model="formData.gioiTinh" v-decorator="[
						'gioiTinh',
						]"
                    placeholder="Giới tính"
                    size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else label="Giới tính">
                {{ formData.gioiTinh }}
              </a-form-item>
              <a-form-item v-if="modeDetail" label="Ngày bổn mạng">
                <a-date-picker v-model="formData.ngayBonMang" v-decorator="[
						'ngayBonMang',
						]"
                               class="full-width"
                               placeholder="Ngày bổn mạng"
                               size="small"
                />
              </a-form-item>
              <a-form-item v-else label="Ngày bổn mạng">
                {{ formData.ngayBonMang }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item v-if="modeDetail" label="Ảnh đại diện">

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
              <a-form-item v-else label="Ảnh đại diện">
                {{ formData.anhDaiDien }}
              </a-form-item>
            </a-col>
          </a-row>

          <a-row>
            <a-col :span="8">
              <a-form-item v-if="modeDetail" label="Ngày rửa tội">
                <a-date-picker v-model="formData.ngayRuaToi" v-decorator="[
						'ngayRuaToi',
						]"
                               class="full-width"
                               placeholder="Ngày rửa tội"
                               size="small"
                />
              </a-form-item>
              <a-form-item v-else label="Ngày rửa tội">
                {{ formData.ngayRuaToi }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item v-if="modeDetail" label="Người rửa tội">
                <a-input
                    v-model="formData.nguoiRuaToi" v-decorator="[
						'nguoiRuaToi',
						]"
                    placeholder="Người rửa tội"
                    size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else label="Người rửa tội">
                {{ formData.nguoiRuaToi }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item v-if="modeDetail" label="Người đỡ đầu">
                <a-input
                    v-model="formData.nguoiDoDauRuaToi" v-decorator="[
						'nguoiDoDauRuaToi',
						]"
                    placeholder="Người đỡ đầu"
                    size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else label="Người đỡ đầu">
                {{ formData.nguoiDoDauRuaToi }}
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item v-if="modeDetail" label="Ngày thêm sức">
                <a-date-picker v-model="formData.ngayThemSuc" v-decorator="[
						'ngayThemSuc',
						]"
                               class="full-width"
                               placeholder="Ngày thêm sức"
                               size="small"
                />
              </a-form-item>
              <a-form-item v-else label="Ngày thêm sức">
                {{ formData.ngayThemSuc }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item v-if="modeDetail" label="Người thêm sức">
                <a-input
                    v-model="formData.nguoiThemSuc" v-decorator="[
						'nguoiThemSuc',
						]"
                    placeholder="Người thêm sức"
                    size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else label="Người thêm sức">
                {{ formData.nguoiThemSuc }}
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item v-if="modeDetail" label="Người đỡ đầu">
                <a-input
                    v-model="formData.nguoiDoDauThemSuc" v-decorator="[
						'nguoiDoDauThemSuc',
						]"
                    placeholder="Người đỡ đầu"
                    size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else label="Người đỡ đầu">
                {{ formData.nguoiDoDauThemSuc }}
              </a-form-item>
            </a-col>
          </a-row>
          <a-divider/>

          <a-row>
            <a-col :span="12">
              <a-form-item v-if="modeDetail" label="Tên thánh/ tên gọi Bố">
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
              <a-form-item v-else label="Tên thánh/ tên gọi Bố">
                {{ formData.tenBo }}
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item v-if="modeDetail" label="Số điện thoại Bố">
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
              <a-form-item v-else label="Số điện thoại Bố">
                {{ formData.sdtBo }}
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item v-if="modeDetail" label="Tên thánh/ tên gọi Mẹ">
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
              <a-form-item v-else label="Tên thánh/ tên gọi Mẹ">
                {{ formData.tenMe }}
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item v-if="modeDetail" label="Số điện thoại Mẹ">
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
              <a-form-item v-else label="Số điện thoại Mẹ">
                {{ formData.sdtMe }}
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item v-if="modeDetail" label="Địa chỉ hành chính">
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
              <a-form-item v-else label="Địa chỉ hành chính">
                {{ formData.diaChi }}
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item v-if="modeDetail" label="Thuộc giáo xứ">
                <a-input
                    v-model="formData.giaoXuId" v-decorator="[
						'giaoXuId',
						]"
                    placeholder="Giáo xứ"
                    size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else label="Thuộc giáo xứ">
                {{ formData.giaoXuId }}
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="12">
              <a-form-item v-if="modeDetail" label="Giáo hạt">
                <a-input
                    placeholder="Giáo hạt (ko cần nhập)" size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else label="Giáo hạt">
                {{ formData.tenThanh }}
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item v-if="modeDetail" label="Giáo phận">
                <a-input
                    placeholder="Giáo phận (ko cần nhập)" size="small"
                >
                </a-input>
              </a-form-item>
              <a-form-item v-else label="Giáo phận">
                {{ formData.tenThanh }}
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
      </div>
    </a-modal>
  </a-card>

</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    pagination() {
      return {
        total: this.totalItems,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        size: 'small',
      };
    },
    count() {
      return this.expand ? 11 : 7;
    },
  },
  data() {
    return {
      // Active button for the "Authors" table's card header radio button group.
      authorsHeaderBtns: 'all',
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      expand: false,
      form: this.$form.createForm(this, {name: 'advanced_search'}),
      visible: false,
      confirmLoading: false,
      ModalText: 'Content of the modal',
      formData: {},
      modeDetail: false,
      title: modeDetail ? 'Chi tiết' : 'Cập nhật',

    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    change(page) {
      console.log(page);
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },
    handleDetail() {
      this.visible = true;
    },
    handleCancel(e) {
      this.visible = false;
    },
    handleOk(e) {
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },
    toggle() {
      this.expand = !this.expand;
    },
  },
}

</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
