<template>
  <el-dialog
    :title="flag === 'add' ? '添加' : '修改' + '宿舍'"
    :visible.sync="dialogVisible"
    width="40%"
    :show-close="false"
    top="25vh"
  >
    <el-form class="dialog-body" :model="form" label-width="100px">
      <el-form-item label="房间号">
        <el-input placeholder="请输入内容" v-model="form.roomnumber" clearable></el-input>
      </el-form-item>
      <el-form-item label="可入住人数">
        <el-input placeholder="请输入内容" v-model="form.volume" clearable></el-input>
      </el-form-item>
      <el-form-item label="宿舍楼">
        <el-select v-model="form.buildid" placeholder="请选择" @change="changeBuildId">
          <el-option
            v-for="item in builds"
            :key="item.id"
            :label="item.buildname"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼层">
        <el-select v-model="form.floor" placeholder="请选择">
          <el-option
            v-for="item in floors"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="已入住人数">
        {{form.occupancy}}
      </el-form-item>
      <el-form-item label="剩余可入住人数">
        {{form.remaining}}
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
  props: ["flag", "dialogVisible", "form", 'builds'],
  data() {
    return {
      routes: [],
      menus: [],
      floors: 0
    };
  },
  watch: {
    'flag': {
      handler(value) {
        if(!(this.builds.length && this.form.buildid)) return this.floors = 0;
        this.floors = this.builds.find(item => item.id === this.form.buildid).floorcount;
      },
      immediate: true
    }
  },
  methods: {
    addOrEditItem() {
      this.form.menus = JSON.stringify(this.menus);
      let url = this.flag === "add" ? "/api/roomadd" : "/api/roomedit";
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
    changeBuildId(value) {
      if(!(this.builds.length && value)) return this.floors = 0;
      this.floors = this.builds.find(item => item.id === value).floorcount;
    }
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