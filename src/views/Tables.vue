<!--
	This is the tables page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <!-- Authors Table -->
    <a-row :gutter="24" type="flex">

      <!-- Authors Table Column -->
      <a-col :span="24" class="mb-24">

        <!-- Authors Table Card -->
        <CardAuthorTable
            :columns="table1Columns"
            :data="listUser"
        ></CardAuthorTable>
        <!-- / Authors Table Card -->

      </a-col>
      <!-- / Authors Table Column -->

    </a-row>
    <!-- / Authors Table -->

    <!-- Projects Table -->
    <a-row :gutter="24" type="flex">

      <!-- Projects Table Column -->
      <a-col :span="24" class="mb-24">

        <!-- Projects Table Column -->
        <CardProjectTable2
            :columns="table2Columns"
            :data="table2Data"
        ></CardProjectTable2>
        <!-- / Projects Table Column -->

      </a-col>
      <!-- / Projects Table Column -->

    </a-row>
    <!-- / Projects Table -->
  </div>

</template>

<script>

// "Authors" table component.
import CardAuthorTable from '../components/Cards/CardAuthorTable';

// "Projects" table component.
import CardProjectTable2 from '../components/Cards/CardProjectTable2';
import Detail from '@/views/Detail-Edit.vue';
import axios from "axios";
import {baseURL, GET_ALL, USER} from "@/api/api";

// "Authors" table list of columns and their properties.
const table1Columns = [
  {
    title: 'STT',
    dataIndex: 'stt',
    width: '10%',
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
    width: '10%',
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
  },
];


// "Projects" table list of columns and their properties.
const table2Columns = [
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
    width: 50,
  },
];

// "Projects" table list of rows and their properties.
const table2Data = [
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
  components: {
    CardAuthorTable,
    CardProjectTable2,
    Detail
  },
  data() {
    return {
      // Associating "Authors" table data with its corresponding property.

      // Associating "Authors" table columns with its corresponding property.
      table1Columns: table1Columns,

      // Associating "Projects" table data with its corresponding property.
      table2Data: table2Data,

      // Associating "Projects" table columns with its corresponding property.
      table2Columns: table2Columns,
      listUser: [],

    }
  },
  created() {
    this.getAllUser();
  },
  methods:{
    getAllUser() {
      axios.get(baseURL + USER + GET_ALL)
        .then(res => {
          for (const element of res.data) {
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
        })
        .catch(err => {
          console.log(err);
        })
    },
  }
}

</script>

<style lang="scss">
</style>
