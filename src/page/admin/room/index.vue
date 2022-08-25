<template>
  <div>
    <div class="hearder">
      <div class="search-box">
        <span>宿舍楼：</span>
        <el-select v-model="params.buildid" placeholder="请选择" @change="changeBuildId">
          <el-option
            v-for="item in builds"
            :key="item.id"
            :label="item.buildname"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <span>楼层：</span>
        <el-select v-model="params.floor" placeholder="请选择">
          <el-option
            v-for="item in floors"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
        <el-button type="primary" @click="search()">搜索</el-button>
        <el-button type="primary" @click="clear()">清空</el-button>
      </div>
      <el-button type="primary" @click="changeDialogVisible('add')">添加</el-button>
    </div>
    <el-table :data="tableData" border stripe class="table-wm">
      <el-table-column prop="roomnumber" label="房间号"></el-table-column>
      <el-table-column prop="buildname" label="所属宿舍楼"></el-table-column>
      <el-table-column prop="floor" label="楼层"></el-table-column>
      <el-table-column  prop="occupancy" label="已入住人数"></el-table-column>
      <el-table-column  prop="volume" label="可入住人数"></el-table-column>
      <el-table-column  prop="remaining" label="剩余可入住人数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="changeDialogVisible('edit', scope.row)"
            >修改</el-button
          >
          <el-button type="danger" @click="deleteItem(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <operation-form
      :flag="flag"
      :dialogVisible="dialogVisible"
      :form="form"
      :builds="builds"
      @changeDialogVisible="changeDialogVisible"
      v-if="dialogVisible"
    ></operation-form>
  </div>
</template>

<script>
import axios from "axios";
import operationForm from "./operation/operation.vue";
export default {
  components: {
    operationForm,
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        roomnumber: '',
        buildid: '',
        floor: undefined,
        occupancy: undefined,
        volume: undefined,
      },
      flag: '',
      params: {
        buildid: '',
        floor: ''
      },
      builds: [],
      floors: 0
    };
  },
  methods: {
    init() {
      axios
      .get('/api/buildlist')
      .then(response => {
        this.builds = response.data.list;
        if(this.builds.length) {
          this.params.buildid = this.builds[0].id;
          if (this.builds[0].floorcount > 1) this.params.floor = 1;
        }
        this.search();
      })
      .catch(() => {});
    },
    changeDialogVisible(flag, data = {}) {
      this.flag = flag;
      if (flag === 'add') {
        this.form = {
          roomnumber: '',
          buildid: '',
          floor: undefined,
          occupancy: 0,
          volume: undefined,
        };
      } else if (flag === 'edit') {
        this.form = {...data};
      } else if (flag === 'finish') {
        this.init();
      }
      this.dialogVisible = !this.dialogVisible;
    },
    deleteItem(id) {
      this.$alert("确定删除此数据？", "删除", {
        confirmButtonText: "确定",
      })
        .then(() => {
          axios
            .post("/api/roomdelete", { id })
            .then((response) => {
              if (response.data.status) {
                this.$message.success(response.data.message);
                this.init();
              }
              else {
                this.$message.error(response.data.message);
              }
            })
            .catch((response) => {});
        })
        .catch(() => {});
    },
    search() {
      let params = this.params;
      axios
        .get("/api/roomlist", {params})
        .then((response) => {
          if (response.data.status) this.tableData = response.data.list || [];
          else this.$message.error(response.data.message);
        })
        .catch((response) => {});
    },
    changeBuildId(vaule) {
      if(!(this.builds.length && vaule)) this.floors = 0;
      return this.floors = this.builds.find(item => item.id === vaule).floorcount;
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.table-wm {
  width: 100%;
  margin-top: 15px;
}
.hearder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
}
/* .operation-box {

}
.operation-box {

} */
</style>