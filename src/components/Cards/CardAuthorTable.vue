<template>

  <!-- Authors Table Card -->
  <a-card :bodyStyle="{padding: 0,}" :bordered="false" class="header-solid h-full">
    <template #title>
      <a-row align="middle" type="flex">
        <a-col :md="12" :span="24">
          <h5 class="font-semibold m-0">Danh sách đoàn sinh</h5>
        </a-col>
        <a-col :md="12" :span="24" style="display: flex; align-items: center; justify-content: flex-end">
          <a-radio-group v-model="authorsHeaderBtns" size="small">
            <a-radio-button value="all">ALL</a-radio-button>
            <a-radio-button value="online">ONLINE</a-radio-button>
          </a-radio-group>
        </a-col>
      </a-row>
      <br/>
          <div id="components-form-demo-advanced-search">
            <a-form :form="form" class="ant-advanced-search-form" @submit="handleSearch" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
              <a-row :gutter="24" >
                <a-col :span="8">
                  <a-form-item  label="Tên đăng nhập">
                    <a-input placeholder="placeholder" size="small"/>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item  label="Tên người dùng">
                    <a-input placeholder="placeholder" size="small"/>
                  </a-form-item>
                </a-col>
                <a-col :span="8">
                  <a-form-item  label="Lớp">
                    <a-input placeholder="placeholder" size="small"/>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24" :style="{ textAlign: 'right' }">
                  <a-button html-type="submit" type="primary" size="small">
                    Search
                  </a-button>
                  <a-button :style="{ marginLeft: '8px' }" @click="handleReset" size="small">
                    Clear
                  </a-button>
                  <a-dropdown :style="{ marginLeft: '8px' }">
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()" >
                      Thao tác hàng loạt <a-icon type="down" />
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

    toggle() {
      this.expand = !this.expand;
    },
  },
}

</script>
