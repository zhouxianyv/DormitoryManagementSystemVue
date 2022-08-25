<template>
  <div class="container">
    <header>
      <div class="titel">
        <img class="logo" src="@/assets/img/logo-mini.png" />
        <span class="subtitle">宿舍管理系统</span>
      </div>
    </header>
    <div class="login">
      <div class="from-box">
        <h3>登录</h3>
        <div>
          <el-radio v-model="user.usertype" label="0">学生登录</el-radio>
          <el-radio v-model="user.usertype" label="1">管理员登录</el-radio>
        </div>
        <div>
          <el-input
            placeholder="请输入用户名"
            v-model="user.username"
            clearable
          ></el-input>
        </div>
        <div>
          <el-input
            :placeholder="
              user.usertype === '1' ? '请输入教职工编号' : '请输入学号'
            "
            v-model="user.serialnumber"
            clearable
          ></el-input>
        </div>
        <div>
          <el-input
            placeholder="请输入密码"
            v-model="user.password"
            clearable
            show-password
          ></el-input>
        </div>
        <div>
          <el-button type="primary" class="btn" @click="login">登录</el-button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="foot-content">
        <div class="copyright">
          <img class="foot-logo" src="@/assets/img/d_logo.png" />
          <div>
            版权所有：河南科技职业大学
          </div>
          <div>
            资讯电话：0394-8511111 8911111 8385111
            <br>
            地址：河南省周口市文昌大道东段6号
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        usertype: "0",
        username: "",
        password: "",
        serialnumber: "",
      },
    };
  },
  methods: {
    login() {
      axios
        .post("/api/userlogin", this.user)
        .then((response) => {
          if (response.data.status) {
            this.$message.success(response.data.message);
            this.$store.commit("login/changeUser", response.data.list);
            if (this.user.usertype === "0") this.$router.push("/");
            else if (this.user.usertype === "1") this.$router.push("/admin/role");
          } else {
            this.$message.error(response.data.message);
          }
        })
        .catch((response) => {});
    },
  },
};
</script>

<style scoped>
.login {
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.from-box {
  width: 500px;
  background-color: #fff;
  padding: 30px 80px 30px 80px;
  border-radius: 10px;
}
.from-box > h3 {
  text-align: center;
  font-size: 24px;
}
.from-box > div {
  margin-top: 20px;
}
.btn,
.btn span {
  display: block;
  width: 100%;
}
header {
  color: #333;
  text-align: center;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 150px;
  margin-bottom: 60px;
  border-bottom: 1px solid rgba(175,175,175, 0.6);
}
body .container {
  background-color: #005187;
  height: 100vh;
  overflow-y: auto;
}
.logo {
  width: 330px;
  display: block;
}

.titel {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.subtitle {
  color: #efefef;
  font-size: 32px;
  font-weight: 500;
  display: block;
  height: 60px;
  margin-left: 10px;
  padding-top: 12px;
}
.footer {
  margin-top: 60px;
  padding: 80px 200px 60px;
  border-top: 1px solid rgba(175,175,175, 0.6);
}
.copyright {
  font-size: 12px;
  padding: 0 80px;
  color: rgb(137, 157, 182);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>