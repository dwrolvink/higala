<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        Important information 
        <b-icon icon="message-bulleted" size="is-small" class="ml2"></b-icon>
      </div>
    </div>

    <div class="card-content">
      <div class="content">
        Konishi is currently in <span class="has-text-danger">testing phase and is really barebones</span>, if you encounter any bugs
        feel free to contact Zeth (AKA Linus Stallman on FB).

        <ul>
          <li>Please remain civil and keep it SFW.</li>
          <li>Post locking and deletion works for admins.</li>
          <li>Check if it's Saturday..</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageBoard"
};
</script>
