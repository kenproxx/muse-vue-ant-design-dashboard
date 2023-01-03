<template>

  <!-- Profile Information Card -->
  <a-card :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :bordered="false"
          :headStyle="{paddingRight: 0,}" class="header-solid h-full card-profile-information">
    <template #title>
      <h6 class="font-semibold m-0">Thông tin liên hệ</h6>
    </template>
    <a-button slot="extra" type="link" @click="editMode = !editMode">
      <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-muted"
              d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
              fill="#111827"/>
        <path class="fill-muted" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
              fill="#111827"/>
      </svg>
    </a-button>
    <a-form :label-col="{ span: 12 }" :labelAlign="'left'" :wrapper-col="{ span: 12 }">
      <a-row>
        <a-col :span="24">
          <a-form-item v-if="editMode" label="Tên thánh/ tên gọi Bố">
            <a-input v-model="data.tenBo" size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item v-else label="Tên thánh/ tên gọi Bố">
            {{ data.tenBo }}
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item v-if="editMode" label="Số điện thoại Bố">
            <a-input v-model="data.sdtBo" size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item v-else label="Số điện thoại Bố">
            {{ data.sdtBo }}
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item v-if="editMode" label="Tên thánh/ tên gọi Mẹ">
            <a-input v-model="data.tenMe" size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item v-else label="Tên thánh/ tên gọi Mẹ">
            {{ data.tenMe }}
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item v-if="editMode" label="Số điện thoại Mẹ">
            <a-input v-model="data.sdtMe" size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item v-else label="Số điện thoại Mẹ">
            {{ data.sdtMe }}
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

  </a-card>
  <!-- / Profile Information Card -->

</template>

<script>

import {getSession, USER_INFO} from "@/util/MemoryCommon";

export default {
  data() {
    return {
      editMode: false,
      data: JSON.parse(getSession(USER_INFO)),
    }
  },
}

</script>
