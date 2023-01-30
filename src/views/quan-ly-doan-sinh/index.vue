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
                <a-input placeholder="Nhập Tên đăng nhập" allowClear size="small" v-model="formSearch.username"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Tên người dùng">
                <a-input placeholder="Nhập Tên người dùng" allowClear size="small" v-model="formSearch.tenGoi"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="Lớp">
                <a-input placeholder="Chọn Lớp" allowClear size="small" v-model="formSearch.lopId"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Ngành">
                <a-select size="small" allowClear placeholder="Chọn Ngành" style="width: 100%"
                          :options="listNganh" v-model="formSearch.nganh">
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24" :style="{ textAlign: 'right' }">
              <a-button html-type="submit" type="primary" size="small" @click="onSearch">
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
    <a-table :columns="tableColumns" :data-source="listUser" :loading="loading"
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
        <a-button :data-id="row.key" class="btn-edit" type="link" @click="visible = !visible">
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


    <a-modal v-model="visible" title="Basic Modal">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
  </a-card>


</template>

<script>
import {NGANH, CAP_BAC} from '@/util/MemoryCommon'
import {listNganh, listCapBac} from '@/views/nguoi-dung/Sign-In'
import axios from "axios";
import {baseURL, GET_ALL, SEARCH, USER} from "@/api/api";
const tableColumns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    width: '10%',
    align: 'center',
  },
  {
    title: 'Người dùng',
    dataIndex: 'author',
    scopedSlots: {customRender: 'author'},
    ellipsis: true,
  },
  {
    title: 'Cấp bậc',
    dataIndex: 'func',
    scopedSlots: {customRender: 'func'},
    width: '13%',
    align: 'center',
    ellipsis: true,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    scopedSlots: {customRender: 'status'},
    align: 'center',
    width: '17%',
  },
  {
    title: 'Thao tác',
    scopedSlots: {customRender: 'action'},
    align: 'center',
  },
];
export default {
  computed: {
    pagination() {
      return {
        current: this.pagenable.pageable.pageNumber,
        pageSize: this.pagenable.pageable.pageSize,
        total: this.pagenable.totalElements,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `Tổng số dòng ${total}`,
        size: 'small',
      };
    },
  },
  created() {
    this.getAllUser();
  },
  data() {
    return {
      tableColumns,
      // Active button for the "Authors" table's card header radio button group.
      authorsHeaderBtns: 'all',
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      expand: false,
      visible: false,
      form: this.$form.createForm(this, {name: 'advanced_search'}),
      listNganh,
      listCapBac,
      NGANH,
      CAP_BAC,
      listUser: [],
      formSearch: {},
      pagenable: {},

    }
  },
  methods: {
    getAllUser() {
      axios.get(`${baseURL}${USER}${GET_ALL}?page=0&size=10`)
          .then(res => {
            for (const element of res.data.content) {
              this.listUser.push({
                key: element.id,
                author: {
                  avatar: element.avatar,
                  name: element.tenDayDu,
                  username: element.username,
                },
                func: {
                  nganh: element.nganh,
                },
                status: element.status,
              });
            }
            this.pagenable = res.data;
          })
          .catch(err => {
            console.log(err);
          })
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    change(page) {
      this.loading = true;
      axios.get(`${baseURL}${USER}${GET_ALL}?page=${page.current}&size=${page.pageSize}`)
          .then(res => {
            this.listUser = [];
            for (const element of res.data.content) {
              this.listUser.push({
                key: element.id,
                author: {
                  avatar: element.avatar,
                  name: element.tenDayDu,
                  username: element.username,
                },
                func: {
                  nganh: element.nganh,
                },
                status: element.status,
              });
            }
            this.pagenable = res.data;
          })
          .catch(err => {
            console.log(err);
          })
      this.loading = false;
    },
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        if (!error) {

        }
      });
    },

    onSearch() {
      axios.get(baseURL + USER + SEARCH, this.formSearch).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    handleReset() {
      this.form.resetFields();
    },
    handleListParam(giaTri, loai) {
      switch (loai) {
        case NGANH:
          return this.listNganh.find(item => giaTri == item.value).label;
        case CAP_BAC:
          return this.listCapBac.find(item => giaTri == item.value).label;
        default:
          return giaTri;
      }
    },
  },
}

</script>

<style scoped>
.ant-form-item {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  margin-bottom: 10px;
  vertical-align: top;
}
</style>
