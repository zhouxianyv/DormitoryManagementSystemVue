<template>
  <el-container class="box">
    <el-aside>
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        background-color="#20222a"
        text-color="#fff"
        active-text-color="#ffd04b"
        unique-opened
        router
      >
        <el-menu-item v-for="menuItem in menuList" :key="menuItem.url" :index="menuItem.url">
          <i :class="menuItem.icon"></i>
          <span>{{menuItem.title}}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-box">
          <span>{{$route.name}}</span>
          <div>
            <el-button @click="updateWorkStatus(userInfo.workstatus)">{{userInfo.workstatus ? '正在值班，点击值班下线': '点击进行值班'}}</el-button>
            <el-button @click="toIndex()">返回门户页面</el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <router-view @refreshAdminMenu="refresh"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      menuList: [],
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.login.user || {};
    }
  },
  methods: {
    toIndex(){
      this.$router.push('/');
    },
    getMenu() {
      axios.get('/api/menulist', {menus: this.$store.state.login.user.menus, type: 1}).then((response) => {
          if(response.data.status) this.menuList = (response.data.list || []).filter(item => this.$store.state.login.user.menus.includes(item.id));
          else this.$message.error(response.data.message);
        })
        .catch((response) => {});
    },
    refresh() {
      this.getMenu();
    },
    updateWorkStatus(workstatus) {
      axios.post('/api/updateworkstatus', {id: this.userInfo.id, workstatus, buildid: this.userInfo.buildid})
        .then(response => {
          if(response.data.status) this.$store.commit('login/changeUser', {...this.userInfo, workstatus: workstatus ? 0 : 1});
          else this.$message.error(response.data.message);
        });
    },
    socketLogin(data) {
      this.$socket.emit('login', data);
      this.$socket.on('new-problems', () => {
        this.$notify({
          title: '消息提示',
          duration: 0,
          dangerouslyUseHTMLString: true,
          message: this.$route.path === '/admin/report' ? `<a>有一条新消息，可刷新页面查看</a>` : `<a href="/#/admin/report">有一条新消息，点击查看</a>`
        });
      });
    }
  },
  mounted() {
    this.socketLogin(this.$store.state.login.user);
    this.getMenu();
  }
};
</script>

<style scoped>
.box {
  height: 100vh;
}
.box > section > header {
  height: 65px !important;
  background-color: #b3c0d1;
}
.box > aside {
  width: 150px !important;
  overflow-x: hidden;
  background-color: #20222a;
}
.header-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-box span{
  font-size: 18px;
  font-weight: 500;
}

.el-menu {
  border-right: 0;
}
</style>