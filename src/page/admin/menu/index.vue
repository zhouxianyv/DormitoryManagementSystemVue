<template>
  <div>
    <el-button type="primary" @click="changeDialogVisible('add')"
      >添加</el-button
    >
    <el-table :data="tableData" border stripe class="table-wm">
      <el-table-column prop="id" label="路由ID"></el-table-column>
      <el-table-column prop="title" label="路由名称"></el-table-column>
      <el-table-column label="路由图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="路由地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button  type="text" v-if="scope.row.status">启 用</el-button>
          <el-button  type="text" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="changeDialogVisible('edit', scope.row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            @click="deleteMenu(scope.row.id)"
            :disabled="disabledDelete(scope.row.url)"
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
        title: "",
        icon: "",
        url: "",
        type: 1,
        status: 1,
      },
      flag: "",
      adminMenu: [],
    };
  },
  methods: {
    init() {
      axios
        .get("/api/menulist")
        .then((response) => {
          if (response.data.status) this.tableData = response.data.list || [];
          else this.$message.error(response.data.message);
        })
        .catch((response) => {});
    },
    changeDialogVisible(flag, data = {}) {
      this.flag = flag;
      if (flag === "add")
        this.form = {
          title: "",
          icon: "",
          url: "",
          type: 1,
          status: 1,
        };
      else if (flag === "edit") this.form = { ...data };
      else if (flag === "finish") {
        this.init();
        this.$emit("refreshAdminMenu");
      }
      this.dialogVisible = !this.dialogVisible;
    },
    deleteMenu(id) {
      this.$alert("确定删除此数据？", "删除", {
        confirmButtonText: "确定",
      })
        .then(() => {
          axios
            .post("/api/menudelete", { id })
            .then((response) => {
              if (response.data.status)
                this.$message.success(response.data.message);
              else this.$message.error(response.data.message);
            })
            .catch((response) => {});
        })
        .catch(() => {});
    },
    disabledDelete(path) {
      return this.adminMenu.includes(path);
    },
  },
  mounted() {
    let admin = this.$router.options.routes.find(
      (item) => item.path === "/admin"
    );
    this.adminMenu = admin.children.map(({ path }) => admin.path + "/" + path);
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