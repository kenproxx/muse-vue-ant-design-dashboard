<template>

	<!-- Platform Settings Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: 0 }">
		<template #title>
			<h6 class="font-semibold m-0">Thông tin cá nhân</h6>
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
          <a-form-item label="Tên gọi" v-if="editMode">
            <a-input size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Tên gọi" v-else>
            nhập vào
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Ngày sinh" v-if="editMode">
            <a-input size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Ngày sinh" v-else>
            nhập vào
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="Số điện thoại" v-if="editMode">
            <a-input size="small">nhập vào</a-input>
          </a-form-item>
          <a-form-item label="Số điện thoại" v-else>
            nhập vào
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
	</a-card>
	<!-- / Platform Settings Card -->

</template>

<script>

	export default {
		data() {
			return {
				// Binded model property for "Platform Settings" switch button for "Email ... follows me" .
				emailForFollows: true,

				// Binded model property for "Platform Settings" switch button for "Email ... answers me" .
				emailForAnswers: false,

				// Binded model property for "Platform Settings" switch button for "Email ... mentions me" .
				emailForMentions: true,

				// Binded model property for "Platform Settings" switch button for "New launches and projects" .
				emailForNewProjects: true,

				// Binded model property for "Platform Settings" switch button for "Monthly product updates" .
				emailForProductUpdates: false,

				// Binded model property for "Platform Settings" switch button for "Subscribe to newsletter" .
				emailForNewsletter: true,
        editMode: false,
			}
		},
	}

</script>
