var initList = function (text) {
  return {
    data: function () {
      return {
        text: text
      };
    },
    template: `
      <section class="list-user" layout="flex" flex-align="center" border="right">
        {{ text }}
      </section>
    `
  };
};

var usersComponent = {
  props: {
    listData: {
      type: Array,
      required: true
    },
    nodeData: {
      type: null,
      required: true
    }
  },
  template: `
    <section class="list-user" border="right" style="overflow-x: hidden; overflow-y: auto;">
      <div class="bg-minor pos-rel list-user-item" padding="10" border="bottom" v-for="node in listData" :class="{active: node === nodeData}">
        <div class="pointer list-user-item-top" layout="flex" @click="$emit('user-menu-click', node)">
          <div class="img-wrap list-user-avatar">
            <img class="avatar" :src="node.avatarUrl" :alt="node.login">
          </div>
          <div class="info-user ml-10">
            <div>{{ node.name }}</div>
            <small color="minor">{{ node.login }}</small>
          </div>
        </div>
        <div class="mt-16" v-if="node.repositories && node === nodeData">
          <div class="mt-5 minor pointer link-active" font="f12" @click="$emit('show-repo-list', 'repo')">Repositories <span class="numerical flr">{{ node.repositories.totalCount }}</span></div>
          <div class="mt-5 minor pointer link-active" font="f12" @click="$emit('show-repo-list', 'star')">Stars <span class="numerical flr">{{ node.starredRepositories.totalCount }}</span></div>
          <div class="mt-5 minor pointer link-active" font="f12" @click="$emit('show-follower-list', 'follower')">Followers <span class="numerical flr">{{ node.followers.totalCount }}</span></div>
          <div class="mt-5 minor pointer link-active" font="f12" @click="$emit('show-follower-list', 'following')">Following <span class="numerical flr">{{ node.following.totalCount }}</span></div>
        </div>

        <div class="list-action-btns" layout="flex" flex-flow="column" border="left bottom">
          <div class="active" layout="flex" flex="1" border="bottom" @click.stop="$emit('user-paperclip-click', node)"><span class="icon icon-large icon-paperclip" flex-align="self-center"></span></div>
        </div>
      </div>
    </section>
  `
};

var component = {
  functional: true,
  render: function (createElement, context) {
    var props = context.props;
    var list = props.listData;
    var elem = null;
    
    if (list.length) {
      elem = usersComponent
    } else {
      elem = initList('请先收集用户');
    }
    
    return createElement(
      elem,
      context.data,
      context.children
    );
  }
};

export default component;