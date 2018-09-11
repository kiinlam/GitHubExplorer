import gql from './graphql.js';

new Vue({
  el: '#app',
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
    },

    // 加载更多
    loadmore: function () {
      var login = this.currentNodeData.login;
      var cursor = this.filterListData.pageInfo.endCursor;
      this.fetchUserRepos(login, cursor);
    },

    // 抓取用户repos列表
    fetchUserRepos: function (login, cursor) {
      var vm = this;
      var repos = this.repos[login];
      var filterListData = this.filterListData;

      if (!login) {
        return;
      }

      // 设置为pending状态
      repos.pending = 1;

      gql.fetchUserRepos(login, cursor)
        .then(function(data) {
          console.log(data);
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

    // repo列表点击事件
    repolistClick: function (node) {
      var vm = this;
      this.currentSubjectData = node;
      this.subjectType = 'repo';
    },
  }
});
