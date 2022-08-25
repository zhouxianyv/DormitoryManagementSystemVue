<template>
  <el-dialog
    :title="flag === 'add' ? '添加' : '修改' + '学生信息'"
    :visible.sync="dialogVisible"
    width="40%"
    :show-close="false"
    top="25vh"
  >
    <el-form class="dialog-body" :model="form" label-width="100px">
      <el-form-item label="学生姓名">
        <el-input placeholder="请输入内容" v-model="form.username" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="学生编号">
        <el-input placeholder="请输入内容" v-model="form.serialnumber" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="密码">
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
      <el-form-item label="所在宿舍楼">
        <el-select v-model="form.buildid" placeholder="请选择"  @change="getRoomList()">
          <el-option
            v-for="item in builds"
            :key="item.id"
            :label="item.buildname"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在楼层">
        <el-select v-model="form.floor" placeholder="请选择" @change="getRoomList()">
          <el-option
            v-for="item in floors"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在宿舍">
        <el-select v-model="form.roomid" placeholder="请选择">
          <el-option
            v-for="item in rooms"
            :key="item.id"
            :label="item.roomnumber"
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
      builds: [],
      rooms: [],
      floor: undefined
    };
  },
  computed: {
    floors() {
      if(!(this.builds.length && this.form.buildid)) return;
      return this.builds.find(item => item.id === this.form.buildid).floorcount;
    }
  },
  watch: {
    flag() {
      if(this.flag !== 'edit') return;
      this.getRoomList();
    }
  },
  methods: {
    init() {
      axios
        .get("/api/rolelist", {params:{type: 0}})
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
        .then((response) => {
          if (response.data.status) {
            this.builds = response.data.list || [];
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((response) => {});
    },
    addOrEditItem() {
      this.form.menus = JSON.stringify(this.menus);
      let url = this.flag === "add" ? "/api/studentadd" : "/api/studentedit";
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
    getRoomList() {
      let { buildid, floor } = this.form;
      if (!buildid || !floor) return;
      let params = {
        buildid,
        floor
      };
      axios
        .get("/api/roomlist", {params})
        .then((response) => {
          if (response.data.status) this.rooms = response.data.list || [];
          else this.$message.error(response.data.message);
        })
        .catch((response) => {});
    }
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