<template>
  <el-dialog
    :title="flag === 'add' ? '添加' : '修改' + '信息'"
    :visible.sync="dialogVisible"
    width="40%"
    :show-close="false"
    top="25vh"
  >
    <el-form class="dialog-body" :model="form" label-width="80px">
      <el-form-item label="楼名">
        <el-input placeholder="请输入内容" v-model="form.buildname" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="楼层数">
        <el-input placeholder="请输入内容" v-model="form.floorcount" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="房间数">
        <el-input placeholder="请输入内容" v-model="form.roomcount" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="管理人员" v-if="flag === 'edit'">
        <span v-for="(item, index) in admins" :key="item.id">{{item.username}}{{index === admins.length-1 ? '' : '、'}}</span>
      </el-form-item>
      <el-form-item label="当前值班" v-if="flag === 'edit'">
        <div>{{form.username}}</div>
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
      admins: []
    };
  },
  methods: {
    addOrEditItem() {
      let url = this.flag === "add" ? "/api/buildadd" : "/api/buildedit";
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
    axios.get('/api/buildadmins', {params: {buildid: this.form.id}})
      .then(response => {
        this.admins = response.data.list;
      }).catch(() => {});
  }
};
</script>

<style scoped>
.dialog-body {
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
}
</style>