<template>

	<!-- Profile Information Card -->
	<a-card :bordered="false" class="header-solid h-full card-profile-information" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }" :headStyle="{paddingRight: 0,}">
		<template #title>
			<h6 class="font-semibold m-0">Thông tin liên hệ</h6>
		</template>
		<a-button type="link" slot="extra" @click="editMode = !editMode">
			<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path class="fill-muted" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z" fill="#111827"/>
				<path class="fill-muted" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" fill="#111827"/>
			</svg>
		</a-button>
    <a-form :label-col="{ span: 12 }" :wrapper-col="{ span: 12 }" :labelAlign="'left'">
      <a-row>
        <a-col :span="24">
          <a-form-item label="Tên thánh/ tên gọi Bố" v-if="editMode">
            <a-input size="small" v-model="data.tenBo">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Tên thánh/ tên gọi Bố" v-else>
            {{data.tenBo}}
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Số điện thoại Bố" v-if="editMode">
            <a-input size="small" v-model="data.sdtBo">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Số điện thoại Bố" v-else>
            {{data.sdtBo}}
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tên thánh/ tên gọi Mẹ" v-if="editMode">
            <a-input size="small" v-model="data.tenMe">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Tên thánh/ tên gọi Mẹ" v-else>
            {{data.tenMe}}
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="Số điện thoại Mẹ" v-if="editMode">
            <a-input size="small" v-model="data.sdtMe">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Số điện thoại Mẹ" v-else>
            {{data.sdtMe}}
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>

  </a-card>
	<!-- / Profile Information Card -->

</template>

<script>

	import {getUserInfo} from "@/util/MemoryCommon";

  export default {
		data() {
			return {
        editMode: false,
        data: getUserInfo,
      }
		},
	}

</script>
