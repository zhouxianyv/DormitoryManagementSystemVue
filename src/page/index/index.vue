<template>
  <div class="container">
      <header>
        <div class="titel">
          <img class="logo" src="@/assets/img/logo-mini.png" />
          <span class="subtitle">宿舍管理系统</span>
        </div>
      </header>
      <div>
        <div class="banner">
          <el-carousel :interval="4000" type="card" :height="imgHeight+'px'">
            <el-carousel-item v-for="(item, index) in bannerList" :key="item.img">
              <el-image ref="bannerImgs"  @load="initImg(index)" :src="$host + item.img" fit="contain"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="content-main">
          <div class="content-container">
            <div class="operation-entrance">
              <div class="information-title">操作入口</div>
              <ul class="information-content nav-bar">
                <li v-for="item in navList" :key="item.path" @click="linkJump(item.path)">{{item.name}}</li>
              </ul>
            </div>
            <div class="push-information">
              <div class="information-title">学校资讯 & 公告通知</div>
              <div class="information-content">
                <ul class="content-left">
                  <li v-for="item in informationList" :key="item.filepath" @click="linkJump('/news', {type: 'information', id: item.id})">
                    <div class="content-title">【{{item.title}}】</div>
                    <div class="content-detail">{{item.detail}}</div>
                  </li>
                </ul>
                <div class="content-right">
                  <ul>
                    <li v-for="item in noticeList" :key="item.filepath"  @click="linkJump('/news', {type: 'notice', id: item.id})">{{item.title}}</li>
                  </ul>
                </div>
              </div>
            </div>
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
import {mapGetters, mapActions} from 'vuex';
export default {
  data() {
    return {
      imgHeight: 400,
      navList: [
        {name: '个人信息', path: '/user'},
        {name: '退出登录', path: '/login'},
        {name: '上报问题', path: '/report'},
        {name: '管理后台', path: '/admin/menu'},
      ]
    };
  },
  computed: {
    ...mapGetters({
      bannerList: 'overt/bannerList',
      informationList: 'overt/informationList',
      noticeList: 'overt/noticeList',
    })
  },
  methods: {
    ...mapActions({
      queryBannerList: 'overt/queryBannerList',
      queryInformationList: 'overt/queryInformationList',
      queryNoticeList: 'overt/queryNoticeList',
    }),
    login() {
      this.$router.push("/login");
    },
    initImg(index){
      let height = this.$refs.bannerImgs[index].$el.clientHeight;
      if(height < this.imgHeight) this.imgHeight = height;
    },
    eventWindow() {
      this.imgHeight = Math.min.apply(null, this.$refs.bannerImgs.map(item => item.$el.clientHeight));
    },
    linkJump(path, query) {
      this.$router.push({
        path,
        query
      });
    }
  },
  mounted() {
    if (this.$store.state.login.user.type == 0) this.navList = [
        {name: '个人信息', path: '/user'},
        {name: '退出登录', path: '/login'},
        {name: '上报问题', path: '/report'},
      ];
    if (this.$store.state.login.user.type == 1) this.navList = [
        {name: '退出登录', path: '/login'},
      ];
    if(!this.bannerList.length) this.queryBannerList();
    if(!this.informationList.length) this.queryInformationList();
    if(!this.noticeList.length) this.queryNoticeList({buildid: this.$store.state.login.user.buildid});
    window.addEventListener("resize", this.eventWindow);
  },
  destroy() {
    window.removeEventListener("resize", this.eventWindow);
  }
};
</script>

<style scoped>
ul,ol{
    list-style: none;
}
header {
  color: #333;
  text-align: center;
  height: 150px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 150px;
}

body .container {
  background-color: #005187;
  height: 100vh;
  overflow-y: scroll;
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

.login-status > a {
  font-size: 12px;
  display: block;
}

.login-status > a:hover {
  color: #005187;
  cursor: pointer;
}

.banner {
  background-color: #005187;
  padding-bottom: 15px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.content-main {
  width: 100%;
  padding: 0 250px;
  background-color: #005187;
}

.content-container {
  width: 100%;
  padding: 25px 20px;
  background-color: #deedff;
}
img{
  display: block;
}
.information-title {
  font-size: 20px;
  height: 30px;
  line-height: 30px;
  color: #666;
  display: flex;
  align-items: center;
  padding: 0 10px 10px;
  border-bottom: 1px solid rgba(175,175,175, 0.6);
  box-sizing: content-box;
  margin-bottom: 15px;
}
.information-title::before {
  content: '';
  display: block;
  width: 4px;
  height: 18px;
  margin-right: 8px;
  background-color: #409eff;
}

.information-content {
  padding: 15px 20px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  margin: 0 10px;
  display: flex;
  background-color: #fff;
}

.content-left {
  padding-right: 20px;
  width: 50%;
  border-right: 1px dashed rgba(175,175,175, 0.6);
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}
.content-left li {
  width: calc(33.3% - 30px);
  margin: 15px 0;
  padding: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #efefefef;
}
.content-title {
  font-size: 14px;
  color: #64854c;
  font-weight: 600;
  margin-bottom: 10px;
}
.content-detail {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 12px;
}
.content-right {
  width: 50%;
  padding: 15px 0;
  padding-left: 20px;
  max-height: 350px;
  overflow-y: auto;
}
.content-right ul {
  list-style: initial;
  list-style-position: inside;
}
.content-right ul li{
  font-size: 14px;
  margin-bottom: 10px;
  height: 25px;
  padding: 0 10px;
  margin: 10px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  cursor: pointer;
  border-bottom: 1px solid rgba(175,175,175, 0.6);
}
.operation-entrance {
  margin-bottom: 50px;
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
.nav-bar {
  list-style: none;
  display: flex;
  justify-content: space-between;
}
.nav-bar li {
  display: flex;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
}
.nav-bar li:hover {
  color: #51a7fd;
}
</style>