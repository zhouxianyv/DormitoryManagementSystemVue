<template>
  <el-dialog
    :title="flag === 'add' ? '添加' : '修改' + '信息'"
    :visible.sync="dialogVisible"
    width="40%"
    :show-close="false"
    top="25vh"
  >
    <el-form  class="dialog-body" :model="form">
        <el-form-item label="标题" :label-width="'120px'">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="'120px'">
          <div class="imgBox">
            <h3>+</h3>
            <img :src="imgUrl" v-if="imgUrl"/>
            <input type="file" @change="changeImg"/>
          </div>
        </el-form-item>

        <el-form-item label="状态" :label-width="'120px'">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
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
      imgUrl: ''
    };
  },
  watch: {
    form(newValue) {
      if(this.flag !== 'edit') return this.imgUrl = '';
      this.imgUrl = this.$host + newValue.img;
    }
  },
  methods: {
    addOrEditItem() {
      let url = this.flag === "add" ? "/api/banneradd" : "/api/banneredit";
      let data = new FormData();
      for (const key in this.form) {
          data.append(key, this.form[key]);
      }
      axios
        .post(url, data)
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
    changeImg(e) {
      let file = e.target.files[0];
      this.form.img = file;
      this.imgUrl = URL.createObjectURL(file);
    },
  }
};
</script>

<style scoped>
.dialog-body {
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
}
.imgBox {
  width: 153px;
  height: 153px;
  border: 1.5px dashed #000;
  position: relative;
}
.imgBox input {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 0;
  left: 0;
  opacity: 0;
}
.imgBox img {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 0;
  left: 0;
}
.imgBox h3 {
  font-size: 40px;
  line-height: 150px;
  text-align: center;
}
</style>