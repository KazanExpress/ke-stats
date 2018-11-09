<template>
  <el-card shadow="always" class="sells-list-container">
    <el-table :data="pagedData"
              style="width: 100%"
              @sort-change="changedSorting"
              @filter-change="changedStatusFilter"
              @expand-change="loadDetails">
      <el-table-column type="expand">
        <template slot-scope="props">
          <order-table-details :details="details(props.row.id)"/>
        </template>
      </el-table-column>
      <el-table-column
          prop="id"
          label="Id"
          sortable
          width="100">
      </el-table-column>
      <el-table-column
          prop="status"
          :filters="statuses"
          :filter-method="() => {return true;}"
          column-key="status"
          label="Status">
      </el-table-column>
      <el-table-column
          prop="date_created"
          label="Date"
          column-key="date_created"
          sortable
          :formatter="dateFormatter">
      </el-table-column>
      <el-table-column
          prop="price"
          label="Price(RUB)"
          sortable
          width="130">
      </el-table-column>
    </el-table>
    <el-pagination
        style="margin: 1rem 0 0 0"
        layout="sizes, prev, pager, next"
        :current-page.sync="page"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :page-sizes="[8, 15, 50, 100]"
        :pager-count="11"
        :total="unpagedData.length">
    </el-pagination>
  </el-card>
</template>

<script>
  import moment from "moment";
  import DataApiClient from "@/utils/DataApiClient";
  import OrderTableDetails from "@/components/charts/OrderTableDetails";

  export default {
    name: "SellsList",
    components: {OrderTableDetails},
    data() {
      return {
        statuses: [],
        filters: {},
        filtersChanged: true,
        sort: undefined,
        page: 1,
        pageSize: 15,
        detailsData: []
      }
    },
    methods: {
      parseStatuses(data) {
        data.forEach(item => {
          if (this.statuses.find(i => i.value === item.status)) {
            return;
          }
          this.statuses.push({text: item.status, value: item.status});
        })
      },
      dateFormatter(row, column, value) {
        return moment(value).format('L LTS');
      },
      changedSorting({column, prop, order}) {
        if (!prop) {
          return;
        }
        console.log(column, prop, order);
        console.log(this.sort);
        this.sort = {prop, order};
      },
      changedStatusFilter(filters) {
        for (let p in filters) {
          if (filters.hasOwnProperty(p)) {
            this.filtersChanged = !this.filtersChanged;
            this.filters[p] = filters[p];
          }
        }
      },
      applySorts(data, sort) {
        data.sort((a, b) => {
          if (!sort) {
            return 0;
          }
          if (a[sort.prop] !== b[sort.prop]) {
            return (a[sort.prop] - b[sort.prop]) * (sort.order === 'ascending' ? 1 : -1);
          }
          return 0;
        });
        return data;
      },
      applyFilters(data, filters) {
        let res = data.slice();
        const statuses = filters.status;
        if (!statuses || statuses.length === 0) {
          return res;
        }
        return res.filter(item => {
          let res = true;
          res = res && statuses.includes(item.status);
          return res;
        });
      },
      handleSizeChange(value) {
        this.pageSize = value;
      },
      async loadDetails(row, expandedRows) {
        if (!expandedRows.includes(row) || this.details(row.id) && !this.details(row.id).error) {
          return;
        }
        this.detailsData = this.detailsData.filter(d => d.id !== row.id);
        let res = await this.dataApiClient.getDetails(row.id);
        if (!res.error) {
          this.detailsData.push({
            id: row.id,
            details: 123
          });
        } else {
          this.detailsData.push({
            id: row.id,
            error: res.status
          });
        }
      },
      details(id) {
        return this.detailsData.find(d => d.id === id);
      }
    },
    created() {
      this.dataApiClient = new DataApiClient(this.$store.getters.access_token);
    },
    computed: {
      unpagedData() {
        this.parseStatuses(this.$store.state.ordersData);
        let filtered = this.applyFilters(this.$store.state.ordersData, this.filters);
        let sorted = this.applySorts(filtered, this.sort);
        const dummy = this.filtersChanged;
        return sorted;
      },
      pagedData() {
        return this.unpagedData.slice(this.offset, this.pageSize + this.offset);
      },
      offset() {
        return (this.page - 1) * this.pageSize;
      }
    },
  }
</script>

