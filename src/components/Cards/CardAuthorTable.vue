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
        <a-form :form="form" class="ant-advanced-search-form" @submit="handleSearch" :label-col="{ span: 8 }"
                :wrapper-col="{ span: 15 }">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="Tên đăng nhập">
                <a-input placeholder="placeholder" size="small"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Tên người dùng">
                <a-input placeholder="placeholder" size="small"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="Lớp">
                <a-input placeholder="placeholder" size="small"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Ngành">
                <a-input placeholder="placeholder" size="small"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :style="{ textAlign: 'right' }">
              <a-button html-type="submit" type="primary" size="small">
                Tìm kiếm
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset" size="small">
                Tạo lại
              </a-button>
              <a-button :style="{ marginLeft: '8px' }" @click="handleReset" size="small">
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
             :pagination="pagination" :scroll="{ y: 240 }"
             :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" @change="change">

      <template slot="author" slot-scope="author">
        <div class="table-avatar-info">
          <a-avatar :src="author.avatar" shape="square"/>
          <div class="avatar-info">
            <h6>{{ author.name }}</h6>
            <p>{{ author.username }}</p>
          </div>
        </div>
      </template>

      <template slot="func" slot-scope="func">
        <div class="author-info">
          <h6 class="m-0">{{ handleListParam(func.nganh, NGANH) }}</h6>
        </div>
      </template>

      <template slot="status" slot-scope="status" >
        <a-tag :class="status ? 'ant-tag-primary' : 'ant-tag-muted'" class="tag-status">
          {{ status == 1 ? "Hoạt động" : "Không hoạt động" }}
        </a-tag>
      </template>

      <template slot="action" slot-scope="row,text, record">
        <a-button :data-id="row.key" class="btn-edit" type="link">
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
  </a-card>
  <!-- / Authors Table Card -->

</template>

<script>
import {NGANH, CAP_BAC} from '@/util/MemoryCommon'
import {listNganh, listCapBac} from '@/views/Sign-In'

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
        showTotal: (total) => `Tổng số dòng ${total}`,
        size: 'small',
      };
    },
  },
  created() {
  },
  data() {
    return {
      // Active button for the "Authors" table's card header radio button group.
      authorsHeaderBtns: 'all',
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      expand: false,
      form: this.$form.createForm(this, {name: 'advanced_search'}),
      listNganh,
      listCapBac,
      NGANH,
      CAP_BAC,
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

    handleListParam(giaTri, loai) {
      console.log('listNganh', this.listNganh);
      console.log('listCapBac', this.listCapBac);
      switch (loai) {
        case NGANH:
          return this.listNganh.find(item => giaTri == item.giaTri).ten;
        case CAP_BAC:
          return this.listCapBac.find(item => giaTri == item.giaTri).ten;
        default:
          return giaTri;
      }
      // for (const item of this.listNganh) {
      //   if (giaTri == item.giaTri) {
      //     return item.ten
      //   }
      // }
    },
  },
}

</script>
