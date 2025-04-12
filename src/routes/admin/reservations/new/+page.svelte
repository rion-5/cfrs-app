<!-- src/routes/admin/reservations/new/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
    import type { Room } from '@prisma/client'; // Prisma 타입 사용
  
    export let data: { rooms: Room[] };
  
    let rooms: Room[] = [];
  
    onMount(() => {
      rooms = data.rooms;
    });
  </script>
  
  <div class="max-w-xl mx-auto p-6">
    <h1 class="text-2xl font-semibold mb-6 text-center">예약 등록</h1>
  
    <form method="POST" class="space-y-4">
      <div>
        <label for="roomId" class="block font-medium">방 선택</label>
        <select name="roomId" required class="w-full rounded border px-3 py-2">
          <option value="">-- 선택하세요 --</option>
          {#each rooms as room}
            <option value={room.id}>{room.name}</option>
          {/each}
        </select>
      </div>
  
      <div>
        <label for="userId" class="block font-medium">학번</label>
        <input type="text" name="userId" required class="w-full rounded border px-3 py-2" />
      </div>
  
      <div>
        <label for="name" class="block font-medium">이름</label>
        <input type="text" name="name" required class="w-full rounded border px-3 py-2" />
      </div>
  
      <div>
        <label for="email" class="block font-medium">이메일</label>
        <input type="email" name="email" class="w-full rounded border px-3 py-2" />
      </div>
  
      <div>
        <label for="phone" class="block font-medium">전화번호</label>
        <input type="tel" name="phone" class="w-full rounded border px-3 py-2" />
      </div>
  
      <div>
        <label for="startTime" class="block font-medium">시작 시간</label>
        <input type="datetime-local" name="startTime" required class="w-full rounded border px-3 py-2" />
      </div>
  
      <div>
        <label for="endTime" class="block font-medium">종료 시간</label>
        <input type="datetime-local" name="endTime" required class="w-full rounded border px-3 py-2" />
      </div>
  
      <div class="text-center">
        <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded">
          예약 등록
        </button>
      </div>
    </form>
  </div>