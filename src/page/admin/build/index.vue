<template>
  <div>
    <el-button type="primary" @click="changeDialogVisible('add')"
      >添加</el-button
    >
    <el-table :data="tableData" border stripe class="table-wm">
      <el-table-column prop="buildname" label="名称"></el-table-column>
      <el-table-column prop="floorcount" label="楼层数"></el-table-column>
      <el-table-column prop="roomcount" label="房间数"></el-table-column>
      <el-table-column  prop="username" label="当前值班"></el-table-column>
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
        buildname: '',
        floorcount: '',
        roomcount: '',
        username: '',
      },
      flag: '',
    };
  },
  methods: {
    init() {
      axios
        .get("/api/buildlist")
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
          buildname: '',
          floorcount: '',
          roomcount: '',
          username: '',
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
            .post("/api/builddelete", { id })
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