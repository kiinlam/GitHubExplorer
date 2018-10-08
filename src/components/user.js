var component = {
  props: {
    nodeData: {
      type: Object,
      required: true
    }
  },
  template: `
    <div class="pointer" @click="$emit('user-click', nodeData)">
      <div layout="flex">
        <div class="img-wrap list-user-avatar">
          <img class="avatar" :src="nodeData.avatarUrl" :alt="nodeData.login">
        </div>
        <div class="info-user ml-10">
          <div>{{ nodeData.name }}</div>
          <small color="minor">{{ nodeData.login }}</small>
        </div>
      </div>
      <div v-if="nodeData.bio">
        <small color="minor">{{ nodeData.bio }}</small>
      </div>
      <div class="mt-5" font="f12" color="cold" v-if="nodeData.location">
        {{ nodeData.location }}
      </div>
    </div>
  `
};

export default component;