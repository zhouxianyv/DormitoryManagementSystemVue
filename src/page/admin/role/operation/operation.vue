<template>
  <el-dialog
    :title="flag === 'add' ? '添加' : '修改' + '角色'"
    :visible.sync="dialogVisible"
    width="40%"
    :show-close="false"
    top="25vh"
  >
    <el-form class="dialog-body" :model="form" label-width="80px">
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">管理员</el-radio>
          <el-radio :label="0">学生</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="角色名称">
        <el-input placeholder="请输入内容" v-model="form.rolename" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="菜单权限" v-if="form.type">
        <el-transfer v-model="menus" :data="routes" :titles="['未添加权限', '已有权限']"></el-transfer>
      </el-form-item>
      <el-form-item label="启用">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('changeDialogVisible')">取 消</el-button>
      <el-button type="primary" @click="addOrEditItem()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: ["flag", "dialogVisible", "form"],
  data() {
    return {
      routes: [],
      menus: [],
    };
  },
  watch: {
    flag(newValue, oldValue) {
      if (newValue === 'add') {
        this.menus = [];
      } else if(newValue === 'edit') {
        this.menus = JSON.parse(this.form.menus);
      }
    }
  },
  methods: {
    init() {
      axios
        .get("/api/menulist", {params: {type: 1}})
        .then((response) => {
          if (response.data.status) {
            this.routes = (response.data.list || []).map(item => ({key: item.id,  label: item.title}));
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((response) => {});
    },
    addOrEditItem() {
      this.form.menus = JSON.stringify(this.menus);
      let url = this.flag === "add" ? "/api/roleadd" : "/api/roleedit";
      axios
        .post(url, this.form)
        .then((response) => {
          if (response.data.status) {
            this.$message.success(response.data.message);
            this.$emit("changeDialogVisible", "finish");
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((response) => {});
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.dialog-body {
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
}
</style>