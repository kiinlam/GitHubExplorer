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
    subjectType: '',
    currentNodeData: null, // 当前数据节点
    filterListData: {list: [], pageInfo: null} // 过滤列表
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
      var vm = this;
      var login = this.currentNodeData.login;
      var repos = this.repos;
      var filterListData = this.filterListData;
      if (repos[login]) {
        console.log(repos[login]);
        vm.$set(filterListData, 'pageInfo', repos[login].pageInfo);
        vm.$set(filterListData, 'list', repos[login].nodes);
      } else {
        repos[login] = {nodes: []};

        gql.fetchUserRepos(login)
        .then(function(data) {
          console.log(data);
          var obj = data.user.repositories;
          repos[login].pageInfo = obj.pageInfo;
          repos[login].nodes = repos[login].nodes.concat(obj.nodes);
          console.log('fetch end:');
          console.log(repos[login]);
          vm.$set(filterListData, 'pageInfo', repos[login].pageInfo);
          vm.$set(filterListData, 'list', repos[login].nodes);
        })
        .catch(function(err){
          var errors = err.response.errors;
          errors.forEach(function(i){
            console.error(i.message);
          });
        });
      }
    }
  }
});
