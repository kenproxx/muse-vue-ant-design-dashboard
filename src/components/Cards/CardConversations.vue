<template>

	<!-- Conversations Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }">
		<template #title>
			<h6 class="font-semibold m-0">Thông tin khác</h6>
		</template>
    <a-button type="link" slot="extra" @click="editMode = !editMode">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-muted" d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z" fill="#111827"/>
        <path class="fill-muted" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z" fill="#111827"/>
      </svg>
    </a-button>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" >
      <a-row>
        <a-col :span="24">
          <a-form-item label="Tên thánh" v-if="editMode">
            <a-input size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Tên thánh" v-else>
            nhập vào
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tên thánh" v-if="editMode">
            <a-input size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Tên thánh" v-else>
            nhập vào
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tên thánh" v-if="editMode">
            <a-input size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Tên thánh" v-else>
            nhập vào
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Tên thánh" v-if="editMode">
            <a-input size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Tên thánh" v-else>
            nhập vào
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
	</a-card>
	<!-- / Conversations Card -->

</template>

<script>

	export default {
		props: {
			data: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
        editMode: false,
			}
		},
	}

</script>
