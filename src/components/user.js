var component = {
  props: {
    nodeData: {
      type: Object,
      required: true
    }
  },
  template: `
    <div class="list-user-item pos-rel pointer" @click="$emit('user-click', nodeData)">
      <div layout="flex">
        <div class="img-wrap list-user-avatar">
          <img class="avatar" :src="nodeData.avatarUrl" :alt="nodeData.login">
        </div>
        <div class="info-user ml-10">
          <div>{{ nodeData.name }}</div>
          <small color="minor">{{ nodeData.login }}</small>
        </div>
      </div>
      <div class="info-user-bio" v-if="nodeData.bio">
        <small color="minor">{{ nodeData.bio }}</small>
      </div>
      <div class="mt-5" font="f12" color="cold" v-if="nodeData.location">
        {{ nodeData.location }}
      </div>

      <div class="list-action-btns" layout="flex" flex-flow="column" border="left">
        <div layout="flex" flex="1" border="bottom" @click.stop="$emit('user-paperclip-click', nodeData)"><span class="icon icon-large icon-paperclip" flex-align="self-center"></span></div>
        <template v-if="nodeData.viewerCanFollow">
          <div style="display:none" :class="{ active: nodeData.viewerIsFollowing }" layout="flex" flex="1" @click.stop="userFollowClick(nodeData)"><span class="icon icon-large icon-follow" flex-align="self-center"></span></div>
        </template>
      </div>
    </div>
  `
};

export default component;