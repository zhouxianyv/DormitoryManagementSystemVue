<template>
  <div class="news-container">
    <header>
      <div class="titel">
        <img class="logo" src="@/assets/img/logo-mini.png" />
        <span class="subtitle">宿舍管理系统</span>
      </div>
    </header>
    <ul class="nav-bar">
        <li @click="linkJump('/')">返回首页</li>
        <li @click="linkJump('/report')">上报信息</li>
    </ul>
    <div class="content-main">
      <div class="bg-color">
        <div>
          <span>姓名：</span>
          <i>{{studentInfo.username}}</i>
        </div>
        <div>
          <span>学号：</span>
          <i>{{studentInfo.serialnumber}}</i>
        </div>
        <div>
          <span>所属宿舍楼：</span>
          <i>{{studentInfo.buildname}}</i>
        </div>
        <div>
          <span>所属宿舍：</span>
          <i>{{studentInfo.roomnumber}}</i>
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
import axios from 'axios';
export default {
  data() {
    return {
      studentInfo: {}
    };
  },
  methods: {
    linkJump(path, query) {
      this.$router.push({
        path,
        query
      });
    }
  },
  mounted() {
    axios.get('/api/public-query-userinfo', {params: {id: this.$store.state.login.user.id}}).then(response => {
      if (!response.data.status) return;
      this.studentInfo = response.data.list || {};
    });
  }
}
</script>

<style scoped>
.news-container {
  height: 100vh;
  overflow-y: scroll;
  background-color: #005187;
}
header {
  padding: 0 200px;
  color: #333;
  text-align: center;
  height: 150px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.content-main {
  width: 100%;
  padding: 20px 230px 0;
}
.bg-color {
  border: 1px solid #ebeef5;
  background-color: #fff;
  min-height: 200px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.bg-color div {
  width: calc(50% - 40px);
  margin: 20px;
}

.nav-bar {
  padding: 0 230px;
  color: #fff;
  list-style: none;
  border-bottom: 1px solid rgba(243, 241, 241, 0.6);
  padding-bottom: 10px;
  margin-bottom: 20px;
  display: flex;
}
.nav-bar li {
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
}
.nav-bar li::before {
  content: '';
  display: block;
  height: 12px;
  width: 3px;
  background-color: #51a7fd;
  margin-right: 8px;
}
</style>