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
      This is a live demo of the dev branch and will be <span class="has-text-danger">restarted at 0:00 UTC+1</span> to pull 
      new data from github. (Or whenever we feel like it).</br>
      
        Konishi is currently in <span class="has-text-danger">testing phase and is really barebones</span>, if you encounter any bugs
        and issues, please create an issue on <a href="https://github.com/Konishi2" target="_blank">Github</a>. 

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
