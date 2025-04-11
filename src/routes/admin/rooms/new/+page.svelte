<!-- src/routes/admin/rooms/new/+page.svelte -->
<script lang="ts">
    import { roomTypeLabels } from '$lib/utils/room';
  </script>
  
  <div class="mx-auto max-w-xl px-4 py-8">
    <h1 class="mb-4 text-2xl font-bold">신규 방 등록</h1>
    <form method="POST" class="space-y-4">
      <div>
        <label for="name" class="mb-1 block font-medium">이름</label>
        <input name="name" class="w-full rounded border px-3 py-2" required />
      </div>
  
      <div>
        <label for="type" class="mb-1 block font-medium">유형</label>
        <select name="type" class="w-full rounded border px-3 py-2" required>
            {#each Object.entries(roomTypeLabels) as [value, label]}
            <option value={value}>{label}</option>
          {/each}
        </select>
      </div>
  
      <div>
        <label for="capacity" class="mb-1 block font-medium">수용 인원</label>
        <input name="capacity" type="number" class="w-full rounded border px-3 py-2" required />
      </div>
  
      <div>
        <label for="location" class="mb-1 block font-medium">위치</label>
        <input name="location" class="w-full rounded border px-3 py-2" required />
      </div>
  
      <button type="submit" class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        등록
      </button>
    </form>
  </div>
  