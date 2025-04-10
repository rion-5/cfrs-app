<!-- src/routes/rooms/+page.svelte -->
<script lang="ts">
    export let data;
  </script>
  
  <h1>방 목록</h1>
  <ul>
    {#each data.rooms as room}
      <li>{room.name} ({room.type}) - 정원 {room.capacity}명</li>
    {/each}
  </ul>
  