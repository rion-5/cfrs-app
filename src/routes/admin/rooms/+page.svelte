<!-- src/routes/admin/rooms/+page.svelte -->

<script lang="ts">
  export let data;
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-semibold">방 목록</h1>
    <a href="/admin/rooms/new" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      + 신규 방 등록
    </a>
  </div>

  <div class="overflow-x-auto rounded-2xl shadow">
    <table class="min-w-full bg-white border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left px-4 py-3 border-b border-gray-200">ID</th>
          <th class="text-left px-4 py-3 border-b border-gray-200">이름</th>
          <th class="text-left px-4 py-3 border-b border-gray-200">수용 인원</th>
          <th class="text-left px-4 py-3 border-b border-gray-200">위치</th>
          <th class="text-left px-4 py-3 border-b border-gray-200">관리</th>
        </tr>
      </thead>
      <tbody>
        {#each data.rooms as room}
          <tr class="hover:bg-gray-50 transition">
            <td class="px-4 py-2 border-b border-gray-100">{room.id}</td>
            <td class="px-4 py-2 border-b border-gray-100">{room.name}</td>
            <td class="px-4 py-2 border-b border-gray-100">{room.capacity}</td>
            <td class="px-4 py-2 border-b border-gray-100">{room.location}</td>
            <td class="px-4 py-2 border-b border-gray-100">
              <a href={`/admin/rooms/${room.id}/edit`} class="text-blue-600 hover:underline">수정</a>
              <form method="POST" action="?/delete" class="inline">
                <input type="hidden" name="id" value={room.id} />
                <button
                  type="submit"
                  name="intent"
                  value="delete"
                  formaction="?/delete"
                  class="text-red-600 hover:underline"
                  on:click|preventDefault={(event) => {
                    if (confirm(`'${room.name}'을(를) 삭제하시겠습니까?`)) {
                      (event.target as HTMLFormElement).form?.submit();
                    }
                  }}
                >
                  삭제
                </button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
