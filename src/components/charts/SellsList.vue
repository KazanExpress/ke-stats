<template>
  <el-table :data="pagedData"
            style="width: 100%"
            @sort-change="changedSorting"
            @filter-change="changedStatusFilter">
    <el-table-column
        prop="id"
        label="Id"
        sortable
        width="100">
    </el-table-column>
    <el-table-column
        prop="status"
        :filters="[{text: 'COMPLETED', value: 'COMPLETED'}, {text: 'ACTIVE', value: 'ACTIVE'}]"
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
        label="Price"
        sortable
        width="130">
    </el-table-column>
  </el-table>
</template>

<script>
  import moment from "moment";

  export default {
    name: "SellsList",
    props: {
      page: {
        type: Number,
        default: 0
      },
      size: {
        type: Number,
        default: 15
      }
    },
    data() {
      return {
        filters: {},
        filtersChanged: true,
        sort: undefined
      }
    },
    methods: {
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
      }
    },
    computed: {
      pagedData() {
        let filtered = this.applyFilters(this.$store.state.ordersData, this.filters);
        let sorted = this.applySorts(filtered, this.sort);
        const dummy = this.filtersChanged;
        return sorted.slice(this.page * this.size, this.size);
        // return this.$store.state.ordersData;
      }
    },
  }
</script>

<style scoped>

</style>