import repoDetailComponent from '../components/repo-detail.js'; // repo详情组件
import followerDetailComponent from '../components/follower-detail.js'; // follower详情组件

var initList = function (text) {
  return {
    data: function () {
      return {
        text: text
      };
    },
    template: `
      <section class="detail-subject" flex="1" flex-align="self-center" text="center">
        {{ text }}
      </section>
    `
  };
};

var component = {
  functional: true,
  render: function (createElement, context) {
    var props = context.props;
    var nodeData = props.nodeData;
    var elem = null;

    if (!nodeData) {
      elem = initList('请选择项目');
    } else if (nodeData.status === 2) {
      if (nodeData.nodeType === 'repo' || nodeData.nodeType === 'star') {
        elem = repoDetailComponent;
      } else if (nodeData.nodeType === 'follower' || nodeData.nodeType === 'following') {
        elem = followerDetailComponent;
      }
    } else {
      elem = initList('加载中...');
    }

    return createElement(
      elem,
      context.data,
      context.children
    );
  }
};

export default component;