import { GraphQLClient } from 'graphql-request'

new Vue({
  el: '#app',
  data: {
    token: localStorage.getItem('token') || '',
    pageLoading: 1,
    isLogining: 0,
    gql: null,
    loginUser: null, // 登录用户
    users: [], // 用户组
    nodeType: '', // 当前类别
    subjectType: '',
    currentNode: null, // 当前数据节点
    filterList: [] // 过滤列表
  },
  created: function () {
    if (this.token) {
      this.login();
    }
  },
  methods: {
    login: function () {
      var vm = this;
      // 显示loading状态
      this.isLogining = 1;
      // 尝试请求用户数据
      this.fetchUserData()
        .then(function(data) {
          // 请求成功，保存token
          localStorage.setItem('token', vm.token);
          vm.pageLoading = 0;
          vm.loginUser = data.viewer;
          vm.currentNode = data.viewer;
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
    getGQLClient: function () {
      var token;
      if (!this.gql) {
        token = this.token;
        this.gql = new GraphQLClient('https://api.github.com/graphql', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        });
      }
      return this.gql;
    },
    fetchUserData: function (login) {
      var gql = this.getGQLClient();
      var query = `{
        ${ !login ? 'viewer' : 'user(login:"${login}")' } {
          avatarUrl(size: 200)
          bio
          company
          createdAt
          email
          followers {
            totalCount
          }
          following {
            totalCount
          }
          isHireable
          issueComments {
            totalCount
          }
          issues {
            totalCount
          }
          location
          login
          name
          organizations(first:100) {
            totalCount
            nodes {
              avatarUrl(size:35)
              members {
                totalCount
              }
              name
              url
            }
          }
          pinnedRepositories(first:6) {
            nodes {
              description
              forks {
                totalCount
              }
              issues {
                totalCount
              }
              isFork
              languages(first:1) {
                nodes {
                  color
                  name
                }
              }
              name
              stargazers {
                totalCount
              }
              url
            }
          }
          pullRequests {
            totalCount
          }
          repositories(first:6, affiliations:OWNER, orderBy:{field:STARGAZERS, direction: DESC}) {
            totalCount
            nodes {
              description
              forks {
                totalCount
              }
              issues {
                totalCount
              }
              isFork
              languages(first:1) {
                nodes {
                  color
                  name
                }
              }
              name
              stargazers {
                totalCount
              }
              url
            }
          }
          repositoriesContributedTo {
            totalCount
          }
          starredRepositories {
            totalCount
          }
          url
          viewerCanFollow
          viewerIsFollowing
          websiteUrl
        }
      }`
      return gql.request(query);
    }
  }
});
