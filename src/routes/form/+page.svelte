<script lang="ts">
  import type { PageData } from "./$types";
  import SettingsForm from "./svelte-form.svelte";
  export let data: PageData;
</script>
 
<SettingsForm data={data.form} />