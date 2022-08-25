<template>
  <div>
    <div v-show="!dialogVisible">
        <el-button type="primary" @click="changeDialogVisible('add')"
        >添加</el-button
        >
        <el-table :data="tableData" border stripe class="table-wm">
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="描述">
            <template slot-scope="scope">
            <div>{{scope.row.detail}}</div>
            </template>
        </el-table-column>
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
            <el-button type="danger" @click="deleteItem(scope.row.id)"
                >删除</el-button
            >
            </template>
        </el-table-column>
        </el-table>
    </div>
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
        detail: "",
        status: 1,
        information: ''
      },
      flag: '',
    };
  },
  methods: {
    init() {
      axios
        .get("/api/informationlist")
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
          title: "",
          detail: "",
          status: 1,
          information: ''
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
            .post("/api/informationdelete", { id })
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