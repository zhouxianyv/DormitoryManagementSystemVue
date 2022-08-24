<template>
  <div v-show="dialogVisible">
    <el-form  class="dialog-body" :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.detail"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
    <div id="wang-editor"></div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('changeDialogVisible')">取 消</el-button>
      <el-button type="primary" @click="addOrEditItem()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import E from "wangeditor";
export default {
  props: ["flag", "dialogVisible", "form"],
  data() {
    return {
      editor: null
    };
  },
  watch: {
    form(newValue) {
      if(this.flag === 'edit' && this.editor) this.queryInformationByPath({filepath: newValue.filepath});
      else this.editor.txt.html('');
    }
  },
  methods: {
    addOrEditItem() {
      let url = this.flag === "add" ? "/api/informationadd" : "/api/informationedit";
      this.form.information = this.editor.txt.html();
      this.form.adminid = this.$store.state.login.user.id;
      this.form.updatetime = (new Date()).getTime().toString();
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
    queryInformationByPath(params) {
      axios.get('/api/informationbypath', {params}).then(response => {
        if(!response.data.status) return;
        this.editor.txt.html(response.data.list.information);
      });
    }
  },
  mounted() {
    this.editor = new E("#wang-editor");
    this.editor.config.uploadImgShowBase64 = true;
    this.editor.create();
  },
};
</script>

<style scoped>
#wang-editor {
  margin-bottom: 20px;
}
.dialog-footer{
  display: flex;
  justify-content: right;
}
.w-e-toolbar, .w-e-text-container {
  z-index: 1000 !important;
}
</style>