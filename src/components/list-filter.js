import repoComponent from '../components/repo.js'; // 单个repo组件

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

var dataList = function () { 
  return {
    components: {
      'repo-component': repoComponent
    },
    props: {
      list: {
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
      <section class="list-filter" border="right" style="overflow-x: hidden; overflow-y: auto;">
        <template v-for="node in list.nodes">
          <repo-component
            class="bg-minor"
            padding="10"
            border="bottom"
            :node-data="node"
            :class="{active: node === nodeData}"
            @repo-click="repoClick"
          ></repo-component>
        </template>
        <div class="pointer" padding="10" text="center" color="minor" v-if="list.pending && list.pageInfo">加载中...</div>
        <div class="pointer" padding="10" text="center" color="link" v-else-if="list.pageInfo.hasNextPage" @click="$emit('loadmore')">加载更多</div>
      </section>
    `
  };
};

var component = {
  functional: true,
  render: function (createElement, context) {
    var props = context.props,
      list = props.list,
      elem = null;
    
    if (list.pending && !list.pageInfo) {
      elem = initList('加载中...');
    } else if (list.pengding === 1 && list.nodes.length === 0) {
      elem = initList('暂无Repo');
    } else if (list.nodes.length) {
      elem = dataList();
    }
    
    return createElement(
      elem,
      context.data,
      context.childrene
    );
  }
};

export default component;