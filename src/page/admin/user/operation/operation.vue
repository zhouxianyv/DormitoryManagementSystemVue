<template>
  <el-dialog
    :title="flag === 'add' ? '添加' : '修改' + '管理员'"
    :visible.sync="dialogVisible"
    width="40%"
    :show-close="false"
    top="25vh"
  >
    <el-form class="dialog-body" :model="form" label-width="100px">
      <el-form-item label="管理员名称">
        <el-input placeholder="请输入内容" v-model="form.username" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="管理员编号">
        <el-input placeholder="请输入内容" v-model="form.serialnumber" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input placeholder="请输入内容" v-model="form.password" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="所属角色">
        <el-select v-model="form.roleid" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理宿舍楼">
        <el-select v-model="form.buildid" placeholder="请选择">
          <el-option
            v-for="item in builds"
            :key="item.id"
            :label="item.buildname"
            :value="item.id"
          >
          </el-option>
        </el-select>
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
      roles: [],
      builds: []
    };
  },
  methods: {
    init() {
      axios
        .get("/api/rolelist", {params:{type: 1}})
        .then((response) => {
          if (response.data.status) {
            this.roles = response.data.list || [];
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((response) => {});
      axios
        .get('/api/buildlist')
        .then(response => {
          this.builds = response.data.list;
        })
        .catch(() => {});
    },
    addOrEditItem() {
      this.form.menus = JSON.stringify(this.menus);
      let url = this.flag === "add" ? "/api/adminadd" : "/api/adminedit";
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