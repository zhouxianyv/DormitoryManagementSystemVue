<template>
  <div>
    <el-button type="primary" @click="changeDialogVisible('add')"
      >添加</el-button
    >
    <el-table :data="tableData" border stripe class="table-wm">
      <el-table-column prop="username" label="名称"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="serialnumber" label="管理员编号"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="text" v-if="scope.row.status">启 用</el-button>
          <el-button type="text" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="changeDialogVisible('edit', scope.row)"
            >修改</el-button
          >
          <el-button type="danger" @click="deleteItem(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <operation-form
      :flag="flag"
      :dialogVisible="dialogVisible"
      :form="form"
      @changeDialogVisible="changeDialogVisible"
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
      total: 0,
      dialogVisible: false,
      form: {
        username: '',
        serialnumber: '',
        password: '',
        roleid: '',
        status: 1,
      },
      flag: '',
    };
  },
  methods: {
    init() {
      axios
        .get("/api/studentlist", {params: {page: 1, size: 10}})
        .then((response) => {
          if (response.data.status) {
              this.tableData = response.data.list || [];
              this.total = response.total;
          }
          else {
              this.$message.error(response.data.message);
          }
        })
        .catch((response) => {});
    },
    changeDialogVisible(flag, data = {}) {
      this.flag = flag;
      if (flag === 'add') {
        this.form = {
          username: '',
          serialnumber: '',
          password: '',
          roleid: '',
          status: 1,
          buildid: undefined,
          roomid: undefined,
          floor: undefined
        };
      } else if (flag === 'edit') {
        this.form = {...data};
      } else if (flag === 'finish') {
        this.init();
      }
      this.dialogVisible = !this.dialogVisible;
    },
    deleteItem(data) {
      this.$alert("确定删除此数据？", "删除", {
        confirmButtonText: "确定",
      })
        .then(() => {
          axios
            .post("/api/studentdelete", { id: data.id, roomid: data.roomid })
            .then((response) => {
              if (response.data.status) {
                this.init();
                this.$message.success(response.data.message);
              } else {
                this.$message.error(response.data.message);
              }
            })
            .catch((response) => {});
        })
        .catch(() => {});
    },
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
</style>