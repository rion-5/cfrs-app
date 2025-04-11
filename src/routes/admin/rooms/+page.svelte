<!-- src/routes/admin/rooms/+page.svelte -->

<script lang="ts">
  import { roomTypeLabels } from '$lib/utils/room';
  export let data;
    // 프론트에서 보여줄 label과 type을 매핑
    const typeLabels = {
    LECTURE: '강의실',
    STUDY: '토론실',
    READING: '도담'
  };

  // 현재 선택된 탭
  let currentType: keyof typeof typeLabels = 'LECTURE';

  // 필터링된 방 목록
  $: filteredRooms = data.rooms.filter((room) => room.type === currentType);
</script>

<div class="max-w-4xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-semibold mb-6 text-center">방 목록</h1>
  <div class="text-right mb-4">
    <a href="/admin/rooms/new" class="inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
      + 신규 방 등록
    </a>
  </div>
    <!-- 탭 UI -->
    <div class="mb-6 flex justify-center gap-2">
      {#each Object.entries(typeLabels) as [type, label]}
        <button
          class={`px-4 py-2 rounded-full border ${
            currentType === type ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border-gray-300'
          }`}
          on:click={() => (currentType = type)}
        >
          {label}
        </button>
      {/each}
    </div>
    
  <div class="overflow-x-auto rounded-2xl shadow">
    <table class="min-w-full bg-white border border-gray-200">
      <thead class="bg-gray-100">
        <tr>
          <th class="text-left px-4 py-3 border-b border-gray-200">구분</th>
          <th class="text-left px-4 py-3 border-b border-gray-200">이름</th>
          <th class="text-left px-4 py-3 border-b border-gray-200">수용 인원</th>
          <th class="text-left px-4 py-3 border-b border-gray-200">위치</th>
          <th class="text-left px-4 py-3 border-b border-gray-200">관리</th>
        </tr>
      </thead>
      <tbody>
        {#each data.rooms as room}
          <tr class="hover:bg-gray-50 transition">
            <td class="px-4 py-2 border-b border-gray-100">
              {roomTypeLabels[room.type] ?? room.type}
            </td>
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
