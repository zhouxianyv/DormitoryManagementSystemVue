<template>
  <div>
    <el-button type="primary" @click="changeDialogVisible('add')"
      >添加</el-button
    >
    <el-table :data="tableData" border stripe class="table-wm">
      <el-table-column prop="id" label="角色ID"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span>{{scope.row.type ? '管理员' : '学生'}}</span>
        </template>
      </el-table-column>
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
      dialogVisible: false,
      form: {
        rolename: '',
        menus: [],
        status: 1,
        type: 1,
      },
      flag: '',
    };
  },
  methods: {
    init() {
      axios
        .get("/api/rolelist")
        .then((response) => {
          if (response.data.status) this.tableData = response.data.list || [];
          else this.$message.error(response.data.message);
        })
        .catch((response) => {});
    },
    changeDialogVisible(flag, data = {}) {
      this.flag = flag;
      if (flag === 'add') {
        this.form = {
          rolename: '',
          menus: [],
          status: 1,
          type: 1,
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
            .post("/api/roledelete", { id })
            .then((response) => {
              if (response.data.status)
                this.$message.success(response.data.message);
              else this.$message.error(response.data.message);
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