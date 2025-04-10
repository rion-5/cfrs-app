<!-- src/routes/admin/rooms/new/+page.svelte -->
<script lang='ts'>
    let name = '';
    let type = 'STUDY';
    let capacity = 1;
    let location = '';
  </script>
  
  <form method="POST">
    <label>방 이름
      <input name="name" bind:value={name} required />
    </label>
  
    <label>방 타입
      <select name="type" bind:value={type}>
        <option value="STUDY">스터디룸</option>
        <option value="LECTURE">강의실</option>
        <option value="READING">열람실</option>
      </select>
    </label>
  
    <label>수용 인원
      <input type="number" name="capacity" bind:value={capacity} min="1" required />
    </label>
  
    <label>위치
      <input name="location" bind:value={location} />
    </label>
  
    <button type="submit">등록</button>
  </form>
  