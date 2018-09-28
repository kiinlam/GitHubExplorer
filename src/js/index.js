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
    repos: {}, // 以用户名为key的repo集合
    stars: {}, // 以用户名为key的star集合
    navType: '', // 当前类别
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
        .then(function(res) {
          // 请求成功，保存token
          localStorage.setItem('token', vm.token);
          vm.pageLoading = 0;
          vm.loginUser = res.viewer;
          vm.currentNodeData = res.viewer;
          vm.navType = 'user';
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

    // 显示star列表
    // @param {string} type - repo or star
    showList: function (type) {
      var login = this.currentNodeData.login;
      var key = type + 's';
      var data = this[key];

      if (data[login]) {
        this.filterListData = data[login];
      } else {
        data[login] = { nodes: [], pending: 0, pageInfo: null };
        this.filterListData = data[login];
        this.fetchRepos(key, login);
      }
      this.subjectType = type;
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
      // this.subjectType = 'repo';
      if (!node.status) {
        this.fetchRepo(node);
      }
    },

    // 抓取用户repos列表
    fetchRepos: function (key, login, cursor) {
      var data = this[key][login];

      if (!login || data.pending === 1) {
        return;
      }

      // 设置为pending状态
      data.pending = 1;

      gql.fetchRepos(key, login, cursor)
        .then(function(res) {
          var obj = res.user.dataList;
          data.pageInfo = obj.pageInfo;
          data.nodes = data.nodes.concat(obj.nodes);
          data.pending = 0;
        })
        .catch(function(err){
          var errors = err.response.errors;
          errors.forEach(function(i){
            console.error(i.message);
          });
          data.pending = 0;
        });
    },

    // 抓取repo数据
    fetchRepo: function (node) {
      var vm = this;
      var login = node.owner && node.owner.login || '';

      if (!login || node.status === 1) {
        return;
      }

      // 设置status状态
      // 1：加载中
      // 2：已更新
      // 无状态表示需要加载数据
      // node.status = 1;
      vm.$set(node, 'status', 1);

      gql.fetchRepo(login, node.name)
        .then(function (res) {
          Object.assign(node, res.repository);
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

    // 加载更多
    loadmore: function () {
      var type = this.subjectType;
      var key = type + 's';
      var login = this.currentNodeData.login;
      var cursor = this.filterListData.pageInfo.endCursor;
      this.fetchRepos(key, login, cursor);
    },
  }
});
