import repoComponent from '../components/repo.js'; // 单个repo组件
import userComponent from '../components/user.js'; // 单个user组件

var initList = function (text) {
  return {
    data: function () {
      return {
        text: text
      };
    },
    template: `
      <section class="list-filter" layout="flex" flex-align="center" border="right">
        {{ text }}
      </section>
    `
  };
};

var repoList = function () { 
  var component;
  if (repoList.component) {
    return repoList.component;
  } else {
    component = {
      components: {
        'repo-component': repoComponent
      },
      props: {
        listData: {
          type: Object,
          required: true
        },
        nodeData: {
          type: null,
          required: true
        }
      },
      methods: {
        repoClick: function (node) {
          this.$emit('repo-click', node);
        }
      },
      template: `
        <section class="list-filter" style="overflow-x: hidden; overflow-y: auto;">
          <repo-component
            class="bg-minor"
            padding="10"
            border="bottom"
            v-for="node in listData.nodes"
            :node-data="node"
            :class="{active: node === nodeData}"
            @repo-click="repoClick"
          ></repo-component>
          <div class="pointer" padding="10" text="center" color="minor" v-if="listData.pending && listData.pageInfo">加载中...</div>
          <div class="pointer" padding="10" text="center" color="link" v-else-if="listData.pageInfo.hasNextPage" @click="$emit('loadmore')">加载更多</div>
        </section>
      `
    };
  }
  repoList.component = component;
  return component;
};

var followerList = function () {
  var component;
  if (followerList.component) {
    return followerList.component;
  } else {
    component = {
      components: {
        'user-component': userComponent
      },
      props: {
        listData: {
          type: Object,
          required: true
        },
        nodeData: {
          type: null,
          required: true
        }
      },
      methods: {
        followerClick: function (node) {
          this.$emit('follower-click', node);
        }
      },
      template: `
        <section class="list-filter" style="overflow-x: hidden; overflow-y: auto;">
          <user-component
            class="bg-minor"
            padding="10"
            border="bottom"
            v-for="node in listData.nodes"
            :node-data="node"
            :class="{active: node === nodeData}"
            @user-click="followerClick"
          ></user-component>
          <div class="pointer" padding="10" text="center" color="minor" v-if="listData.pending && listData.pageInfo">加载中...</div>
          <div class="pointer" padding="10" text="center" color="link" v-else-if="listData.pageInfo.hasNextPage" @click="$emit('loadmore')">加载更多</div>
        </section>
      `
    };
  }
  followerList.component = component;
  return component;
};

var component = {
  functional: true,
  render: function (createElement, context) {
    var props = context.props;
    var list = props.listData;
    var type = props.listType;
    var elem = null;
    
    if (list.pending && !list.pageInfo) {
      elem = initList('加载中...');
    } else if (list.pengding === 1 && list.nodes.length === 0) {
      elem = initList('暂无Repo');
    } else if (list.nodes.length) {
      if (type === 'repo' || type === 'star') {
        elem = repoList();
      } else if (type === 'follower' || type === 'following') {
        elem = followerList();
      }
    }
    
    return createElement(
      elem,
      context.data,
      context.children
    );
  }
};

export default component;