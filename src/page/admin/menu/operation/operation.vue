<template>
  <el-dialog
    :title="flag === 'add' ? '添加' : '修改' + '路由'"
    :visible.sync="dialogVisible"
    width="35%"
    :show-close="false"
    top="25vh"
  >
    <el-form class="dialog-body" :model="form" label-width="80px">
      <el-form-item label="路由归属">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">管理员模块路由</el-radio>
          <el-radio :label="0">非管理员模块路由</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="路由">
        <el-select v-model="routeInfo" placeholder="请选择" @change="setForm()">
          <el-option
            v-for="item in routes"
            :key="item.path"
            :label="item.name"
            :value="item.path + ',' + item.name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="icon">
        <el-select v-model="form.icon" placeholder="请选择">
          <el-option v-for="item in icons" :key="item" :value="item">
            <i :class="item"></i>
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
      <el-button type="primary" @click="addMenu()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from 'axios';
export default {
  props: ['flag', 'dialogVisible', 'form'],
  data() {
    return {
      routes: [],
      routeInfo: "",
      icons: [
        "el-icon-setting",
        "el-icon-user",
        "el-icon-phone-outline",
        "el-icon-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
        "el-icon-tickets",
        "el-icon-office-building",
        "el-icon-school",
        "el-icon-s-custom",
        "el-icon-picture",
        "el-icon-question",
        "el-icon-s-data",
        "el-icon-s-comment"
      ],
    };
  },
  watch: {
    flag(newValue, oldValue) {
      if (newValue === 'add') this.routeInfo = '';
      else if(newValue === 'edit') this.routeInfo = this.form.url + ',' + this.form.title;
    }
  },
  methods: {
    setRoutes() {
      this.$router.options.routes.forEach((item) => {
        if (item.children)
          this.routes.push(
            ...item.children.map(({ name, path }) => ({
              name,
              path: item.path + "/" + path,
            }))
          );
        // else this.routes.push({ name: item.name, path: item.path });
      });
    },
    setForm() {
      const [url, title] = this.routeInfo.split(",");
      this.form.url = url;
      this.form.title = title;
    },
    addMenu() {
      let url = this.flag === 'add' ? '/api/menuadd' : '/api/menuedit';
      axios.post(url, this.form).then((response) => {
          if (response.data.status) {
            this.$message.success(response.data.message);
            this.$emit('changeDialogVisible', 'finish');
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((response) => {});
    },
  },
  mounted() {
    this.setRoutes();
  },
};
</script>

<style scoped>
.dialog-body {
  min-height: 100px;
  max-height: 250px;
  overflow-y: auto;
}
</style>