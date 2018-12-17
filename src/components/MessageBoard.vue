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
      <span class="has-text-danger">This is a live demo of the dev branch and will be restarted at UTC+1 to pull 
      new data from github. (Or whenever we feel like it).</span>
        Konishi is currently in <span class="has-text-danger">testing phase and is really barebones</span>, if you encounter any bugs
        and issues, please create an issue on Github 
        <a href="https://github.com/konishi-project/higala" target="_blank">Frontend</a> or
        <a href="https://github.com/konishi-project/zimmerman" target="_blank">Backend</a>

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
