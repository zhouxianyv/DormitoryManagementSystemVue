<template>
  <div>
      <el-table :data="tableData" border stripe class="table-wm">
        <el-table-column label="描述">
            <template slot-scope="scope">
            <div>{{scope.row.detail}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="studentname" label="上报人名称"></el-table-column>
        <el-table-column label="上报时间">
            <template slot-scope="scope">
            <div>{{scope.row.createtime | momentTime}}</div>
            </template>
        </el-table-column>
        <el-table-column prop="buildname" label="宿舍楼"></el-table-column>
        <el-table-column prop="roomnumber" label="房间号"></el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
            <el-button  type="text">{{scope.row.status === 2 ? '已处理' : '未处理'}}</el-button>
            </template>
        </el-table-column>
        <el-table-column label="处理人">
            <template slot-scope="scope">
            <div>{{scope.row.adminname || '-'}}</div>
            </template>
        </el-table-column>
        <el-table-column label="处理时间">
            <template slot-scope="scope">
            <div>{{scope.row.handletime | momentTime}}</div>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button
                type="primary"
                @click="changeStatus(scope.row)"
                v-if="scope.row.status === 1"
                >流转处理状态</el-button
            >
            </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  filters: {
    momentTime(time) {
      return time ? moment(parseInt(time)).format('YYYY年MM月DD日 hh:mm:ss') : '-';
    }
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    init() {
      let params = {
        buildid: this.$store.state.login.user.buildid
      };
      axios
        .get("/api/reportlist", { params })
        .then((response) => {
          if (response.data.status) this.tableData = response.data.list || [];
          else this.$message.error(response.data.message);
        })
        .catch((response) => {});
    },
    changeStatus(data) {
        this.$confirm('上报问题状态将由未处理流转到已处理，是否确认流转？', '状态流转', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/api/reportchangestatus', {id: data.id, status: 2, handlerid: this.$store.state.login.user.id, handletime: (new Date()).getTime()})
            .then(response => {
              if (!response.data.status) return this.$message.error('流转失败');
              this.$message.success('流转成功');
              this.init();
            }).catch(() => this.$message.error('流转失败'))
        });
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.table-wm {
  width: 100%;
  margin-top: 15px;
}
</style>