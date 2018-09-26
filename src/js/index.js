import gql from './graphql.js'; // graphql 请求管理
import userDetailComponent from '../components/user-detail.js';  // 用户详情repo模块组件
import listFilterComponent from '../components/list-filter.js'; // 列表展示组件
import repoDetailComponent from '../components/repo-detail.js'; // repo详情组件

// 过滤器-时间转换
Vue.filter('formatTime', function (val) {
  var d = new Date(val);
  return d.toLocaleString();
});

// 过滤器-KB转MB，保留2位小数
Vue.filter('toFixed', function (val, digits) {
  return Number(val).toFixed(digits);
});

new Vue({
  el: '#app',
  components: {
    'user-detail-component': userDetailComponent,
    'list-filter-component': listFilterComponent,
    'repo-detail-component': repoDetailComponent
  },
  data: {
    token: localStorage.getItem('token') || '',
    pageLoading: 1,
    isLogining: 0,
    loginUser: null, // 登录用户
    users: [], // 用户组
    repos: {},
    nodeType: '', // 当前类别
    currentNodeData: null, // 当前数据节点
    filterListData: {nodes: [], pageInfo: null}, // 过滤列表
    subjectType: '',
    currentSubjectData: null, // 当前详情数据
  },
  created: function () {
    if (this.token) {
      gql.init(this.token);
      this.login();
    }
  },
  methods: {
    // 打印信息
    log: function (s) {
      console.log(s);
    },

    // 登录
    login: function () {
      var vm = this;
      // 显示loading状态
      this.isLogining = 1;
      // 尝试请求用户数据
      gql.fetchUserData()
        .then(function(data) {
          // 请求成功，保存token
          localStorage.setItem('token', vm.token);
          vm.pageLoading = 0;
          vm.loginUser = data.viewer;
          vm.currentNodeData = data.viewer;
          vm.nodeType = 'user';
          vm.subjectType = 'user';
        })
        .catch(function(err){
          var errors = err.response.errors;
          errors.forEach(function(i){
            console.error(i.message);
          });
          vm.isLogining = 0;
        });
    },

    // 显示仓库列表
    showRepos: function () {
      var login = this.currentNodeData.login;
      var repos = this.repos;

      if (repos[login]) {
        this.filterListData = repos[login];
      } else {
        repos[login] = {nodes: [], pending: 0, pageInfo: null};
        this.filterListData = repos[login];
        this.fetchUserRepos(login);
      }
      this.subjectType = 'repo';
    },

    // 加载更多
    loadmore: function () {
      var login = this.currentNodeData.login;
      var cursor = this.filterListData.pageInfo.endCursor;
      this.fetchUserRepos(login, cursor);
    },

    // 抓取用户repos列表
    fetchUserRepos: function (login, cursor) {
      var repos = this.repos[login];

      if (!login || repos.pending === 1) {
        return;
      }

      // 设置为pending状态
      repos.pending = 1;

      gql.fetchUserRepos(login, cursor)
        .then(function(data) {
          var obj = data.user.repositories;
          repos.pageInfo = obj.pageInfo;
          repos.nodes = repos.nodes.concat(obj.nodes);
          repos.pending = 0;
        })
        .catch(function(err){
          var errors = err.response.errors;
          errors.forEach(function(i){
            console.error(i.message);
          });
          repos.pending = 0;
        });
    },

    // 用户列表点击事件
    userlistClick: function (node) {
      this.filterListData = { nodes: [], pageInfo: null };
      this.currentNodeData = node;
      this.subjectType = 'user';
    },

    // repo列表点击事件
    repolistClick: function (node) {
      var login = this.currentNodeData.login;
      this.currentSubjectData = node;
      this.subjectType = 'repo';
      if (!node.status) {
        this.fetchRepo(login, node);
      }
    },

    // 抓取repo数据
    fetchRepo: function (login, node) {
      var vm = this;

      if (!login || !node || node.status === 1) {
        return;
      }

      // 设置status状态
      // 1：加载中
      // 2：已更新
      // 无状态表示需要加载数据
      // node.status = 1;
      vm.$set(node, 'status', 1);

      gql.fetchRepo(login, node.name)
        .then(function (data) {
          Object.assign(node, data.repository);
          node.status = 2;
        })
        .catch(function (err) {
          var errors = err.response.errors;
          errors.forEach(function (i) {
            console.error(i.message);
          });
          node.status = 0;
        });
    },
  }
});
