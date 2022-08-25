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
    </ul>
    <div class="content-main">
      <div class="bg-color">
        <div class="information-content">
          <div class="news-title">
            <span>{{news.title}}</span>
            <div>最新更新时间：{{updateTime}}</div>
          </div>
          <iframe ref="iframe" @load="changeIframeHeight()" :src="$baseUrl + news.filepath" frameborder="no" scrolling="no"></iframe>
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
import moment from 'moment';
import axios from 'axios';
export default {
  data() {
    return {
      ratio: 0,
      news: {}
    }
  },
  computed: {
    updateTime() {
      return moment(Number(this.news.updatetime) || (new Date()).getTime()).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  methods: {
    changeIframeHeight() {
      if(!this.ratio) {
        this.ratio = Math.floor(this.$refs.iframe.contentWindow.document.body.scrollHeight / this.$refs.iframe.contentWindow.document.body.scrollWidth * 100) / 100;
        this.$refs.iframe.height = this.$refs.iframe.contentWindow.document.body.scrollHeight;
      } else {
        this.$refs.iframe.height = this.$refs.iframe.contentWindow.document.body.height = this.$refs.iframe.contentWindow.document.body.scrollWidth * this.ratio;
      }
    },
    linkJump(path, query) {
      this.$router.push({
        path,
        query
      });
    }
  },
  created() {
    axios.get('/api/public-query-news', {params: this.$route.query}).then(response => {
      if (!response.data.status) return;
      this.news = response.data.list || {};
    });
  },
  mounted() {
    window.addEventListener("resize", this.changeIframeHeight);

  },
  destroy() {
    this.ratio = 0;
    window.removeEventListener("resize", this.changeIframeHeight);
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
  min-height: 300px;
  padding: 20px 230px;
}
.bg-color {
  background-color: #deedff;
}
.information-content {
  padding: 15px 20px;
  min-height: 460px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 10%);
  border: 1px solid #ebeef5;
  background-color: #fff;
}
.news-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(175,175,175, 0.6);
  margin-bottom: 15px;
}
.news-title span{
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 14px;
  margin-bottom: 5px;
}
iframe{
  padding: 0 20px;
  width: 100%;
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