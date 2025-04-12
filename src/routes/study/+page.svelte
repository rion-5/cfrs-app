<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  const today = new Date();
  const dateOptions = Array.from({ length: 3 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return {
      label: `${d.getMonth() + 1}/${d.getDate()} (${['일','월','화','수','목','금','토'][d.getDay()]})`,
      value: d.toISOString().split('T')[0]
    };
  });

  const selectedDate = writable(dateOptions[0].value);
  const rooms = Array.from({ length: 9 }, (_, i) => `토론실 ${i + 1}`);

  const timeSlots = [
    '9', '10', '11', '12', '13', '14',
    '15', '16', '17', '18', '19', '20', '21', '22'
  ];

  function isAvailable(room: string, date: string, time: string): boolean {
    return !(room === '토론실 2' && time === '13') && !(room === '토론실 4' && time === '10');
  }

  // function reserve(room: string, time: string) {
  //   alert(`${room}의 ${time}시 예약 완료!`);
  // }
  async function reserve(room: string, time: string) {
  const payload = {
    date: $selectedDate,
    room,
    startTime: time,
    userId: '20201234',
    name: '홍길동',
    email: 'hong@school.ac.kr',
    phone: '010-1234-5678'
  };

  const res = await fetch('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    alert(`${room} ${time} 예약 성공!`);
    // 새로고침 또는 예약된 시간 제거 로직 필요
  } else {
    const err = await res.json();
    alert(`예약 실패: ${err.message}`);
  }
}

</script>

<div class="p-4">
  <!-- 날짜 선택 탭 -->
  <div class="flex gap-2 overflow-x-auto pb-2">
    {#each dateOptions as date}
      <button
        class="flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition-colors"
        class:selected={$selectedDate === date.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-800 border-gray-300'}
        on:click={() => selectedDate.set(date.value)}
      >
        {date.label}
      </button>
    {/each}
  </div>

  <!-- 토론실별 시간 버튼 -->
  <div class="mt-4 space-y-6">
    {#each rooms as room}
      <div>
        <div class="mb-2 text-base font-semibold text-gray-800">{room}</div>
        <div class="flex flex-wrap gap-2">
          {#each timeSlots as time}
            {#if isAvailable(room, $selectedDate, time)}
              <button
                class="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                on:click={() => reserve(room, time)}
              >
                {time}
              </button>
            {/if}
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  button.selected {
    background-color: #3b82f6;
    color: white;
    border-color: #3b82f6;
  }
</style>