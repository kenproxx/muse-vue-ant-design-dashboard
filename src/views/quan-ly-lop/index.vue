<template>

  <!-- Projects Table Column -->
  <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
    <template #title>
      <a-row type="flex" align="middle">
        <a-col :span="24" :md="12">
          <h5 class="font-semibold m-0">Danh sách lớp</h5>
        </a-col>
      </a-row>
    </template>
    <div>
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="12">
          <a-input-search
              placeholder="Nhập vào đây..."
              enter-button="Tìm kiếm"
              size="small"
              @search="onSearch"
          />
        </a-col>
      </a-row>
    </div>
    <br>
    <a-table :columns="tableColumns" :data-source="tableData" :pagination="pagination" style="height: 100%"
             :loading="loading">
      <template slot="company" slot-scope="company">
        <h6>
          {{ company.name }}
        </h6>
      </template>
      <template slot="editBtn" slot-scope="row">
        <a-button type="link" :data-id="row.key">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-gray-7"
                  d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"/>
            <path class="fill-gray-7" d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"/>
          </svg>
        </a-button>
      </template>

    </a-table>

  </a-card>

</template>

<script>
import axios from "axios";
import {baseURL, SEARCH, USER} from "@/api/api";

const tableColumns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    align: 'center',
    width: '10%',
  },
  {
    title: 'Tên lớp',
    dataIndex: 'company',
    scopedSlots: {customRender: 'company'},
  },
  {
    title: 'Số lượng',
    dataIndex: 'number',
    class: 'font-semibold text-muted',
  },
  {
    title: 'Huynh trưởng phụ trách',
    dataIndex: 'budget',
    class: 'font-semibold text-muted',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    class: 'font-semibold text-muted text-sm',
  },
  {
    title: '',
    scopedSlots: {customRender: 'editBtn'},
  },
];

const tableData = [
  {
    key: '1',
    company: {
      name: 'Spotify Version',
      logo: 'images/logos/logo-spotify.svg',
    },
    status: "working",
    budget: '$14,000',
    completion: 60,
  },
  {
    key: '2',
    company: {
      name: 'Progress Track',
      logo: 'images/logos/logo-atlassian.svg',
    },
    status: "working",
    budget: '$3,000',
    completion: 10,
  },
  {
    key: '3',
    company: {
      name: 'Jira Platform Errors',
      logo: 'images/logos/logo-slack.svg',
    },
    status: "done",
    budget: 'Not Set',
    completion: {
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
    status: "canceled",
    budget: '$20,600',
    completion: {
      status: 'exception',
      value: 50,
    },
  },
  {
    key: '5',
    company: {
      name: 'Web Dev',
      logo: 'images/logos/logo-webdev.svg',
    },
    status: "working",
    budget: '$4,000',
    completion: 80,
  },
  {
    key: '6',
    company: {
      name: 'Redesign Online Store',
      logo: 'images/logos/logo-invision.svg',
    },
    status: "canceled",
    budget: '$2,000',
    completion: {
      status: 'exception',
      value: 0,
    },
  },
];

export default {
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
  data() {
    return {
      // Active button for the "Projects" table's card header radio button group.
      projectHeaderBtns: 'all',
      tableColumns, tableData,
      loading: false,
    }
  },
  methods: {
    onSearch(value) {
    },
  },
}

</script>
