<!--
	This is the dashboard page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <!-- Counter Widgets -->
    <a-row :gutter="24">
      <a-col v-for="(stat, index) in data" :key="index" :lg="12" :span="24" :xl="6" class="mb-24">
        <!-- Widget 1 Card -->
        <WidgetCounter
            :icon="stat.icon"
            :prefix="stat.prefix"
            :status="stat.status"
            :suffix="stat.suffix"
            :title="stat.title"
            :value="stat.value"
        ></WidgetCounter>
        <!-- / Widget 1 Card -->
      </a-col>
    </a-row>
    <!-- / Counter Widgets -->

    <!-- Charts -->
    <a-row :gutter="24" align="stretch" type="flex">
      <a-col :lg="10" :span="24" class="mb-24">

        <!-- Active Users Card -->
        <CardBarChart></CardBarChart>
        <!-- Active Users Card -->

      </a-col>
      <a-col :lg="14" :span="24" class="mb-24">

        <!-- Sales Overview Card -->
        <CardLineChart></CardLineChart>
        <!-- / Sales Overview Card -->

      </a-col>
    </a-row>
    <!-- / Charts -->

    <!-- Table & Timeline -->
    <a-row :gutter="24" align="stretch" type="flex">
      <!-- Table -->
      <a-col :lg="16" :span="24" class="mb-24">

        <!-- Projects Table Card -->
        <CardProjectTable
            :columns="tableColumns"
            :data="tableData"
        ></CardProjectTable>
        <!-- / Projects Table Card -->

      </a-col>
      <!-- / Table -->

      <!-- Timeline -->
      <a-col :lg="8" :span="24" class="mb-24">

        <!-- Orders History Timeline Card -->
        <CardOrderHistory></CardOrderHistory>
        <!-- / Orders History Timeline Card -->

      </a-col>
      <!-- / Timeline -->
    </a-row>
    <!-- / Table & Timeline -->

    <!-- Cards -->
    <!-- / Cards -->

  </div>
</template>

<script>

// Bar chart for "Active Users" card.
import CardBarChart from '../components/Cards/CardBarChart';

// Line chart for "Sales Overview" card.
import CardLineChart from '../components/Cards/CardLineChart';

// Counter Widgets
import WidgetCounter from '../components/Widgets/WidgetCounter';

// "Projects" table component.
import CardProjectTable from '../components/Cards/CardProjectTable';

// Order History card component.
import CardOrderHistory from '../components/Cards/CardOrderHistory';
import {getLocal, NGANH} from "@/util/MemoryCommon";


// Counter Widgets data
const data = [
  {
    title: "Chiên con",
    value: 53000,
    prefix: "$",
    suffix: "+30%",
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>`,
    color: "rgb(255, 255, 255)",
  },
  {
    title: "Ấu nhi",
    value: 3200,
    suffix: "+20%",
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>`,
  },
  {
    title: "Thiếu nhi",
    value: 1200,
    prefix: "+",
    status: "danger",
    suffix: "-20%",
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>`,
  },
  {
    title: "Nghĩa sỹ",
    value: 13200,
    prefix: "$",
    suffix: "+10%",
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>`,
  },
  {
    title: "Hiệp sỹ",
    value: 13200,
    prefix: "$",
    suffix: "+10%",
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>`,
  },
  {
    title: "Dự trưởng",
    value: 13200,
    prefix: "$",
    suffix: "+10%",
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>`,
  },
  {
    title: "Huynh trưởng",
    value: 13200,
    prefix: "$",
    suffix: "+10%",
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>`,
  },
  {
    title: "Trợ tá",
    value: 13200,
    prefix: "$",
    suffix: "+10%",
    icon: `
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg>`,
  },
];

// "Projects" table list of columns and their properties.
const tableColumns = [
  {
    title: 'Tên lớp',
    dataIndex: 'company',
    scopedSlots: {customRender: 'company'},
    width: 300,
  },
  {
    title: 'Huynh trưởng phụ trách',
    dataIndex: 'members',
    scopedSlots: {customRender: 'members'},
  },
  {
    title: 'Sĩ số',
    dataIndex: 'budget',
    class: 'font-bold text-muted text-sm',
  },
  {
    title: 'COMPLETION',
    scopedSlots: {customRender: 'completion'},
    dataIndex: 'completion',
  },
];

// "Projects" table list of rows and their properties.
const tableData = [
  {
    key: '1',
    company: {
      name: 'Soft UI Shopify Version',
      logo: 'images/logos/logo-shopify.svg',
    },
    members: ["images/face-1.jpg", "images/face-4.jpg", "images/face-2.jpg", "images/face-3.jpg",],
    budget: '$14,000',
    completion: 60,
  },
  {
    key: '2',
    company: {
      name: 'Progress Track',
      logo: 'images/logos/logo-atlassian.svg',
    },
    members: ["images/face-4.jpg", "images/face-3.jpg",],
    budget: '$3,000',
    completion: 10,
  },
  {
    key: '3',
    company: {
      name: 'Fix Platform Errors',
      logo: 'images/logos/logo-slack.svg',
    },
    members: ["images/face-1.jpg", "images/face-2.jpg", "images/face-3.jpg",],
    budget: 'Not Set',
    completion: {
      label: '100',
      status: 'success',
      value: 100,
    },
  },
  {
    key: '4',
    company: {
      name: 'Launch new Mobile App',
      logo: 'images/logos/logo-spotify.svg',
    },
    members: ["images/face-1.jpg", "images/face-2.jpg",],
    budget: '$20,600',
    completion: {
      label: '100',
      status: 'success',
      value: 100,
    },
  },
  {
    key: '5',
    company: {
      name: 'Add the New Landing Page',
      logo: 'images/logos/logo-jira.svg',
    },
    members: ["images/face-1.jpg", "images/face-4.jpg", "images/face-2.jpg", "images/face-3.jpg",],
    budget: '$4,000',
    completion: 80,
  },
  {
    key: '6',
    company: {
      name: 'Redesign Online Store',
      logo: 'images/logos/logo-invision.svg',
    },
    members: ["images/face-1.jpg", "images/face-4.jpg", "images/face-3.jpg",],
    budget: '$2,000',
    completion: {
      label: 'Cancelled',
      status: 'exception',
      value: 100,
    },
  },
];

export default {
  components: {
    CardBarChart,
    CardLineChart,
    WidgetCounter,
    CardProjectTable,
    CardOrderHistory,
  },
  data() {
    return {

      // Associating table data with its corresponding property.
      tableData,

      // Associating table columns with its corresponding property.
      tableColumns,

      // Counter Widgets data
      data,
      value: JSON.parse(getLocal(NGANH)),
    }
  },
}

</script>

<style lang="scss">
</style>
