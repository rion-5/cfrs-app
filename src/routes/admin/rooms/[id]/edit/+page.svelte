<!-- src/routes/admin/rooms/[id]/edit/+page.svelte -->
<script lang="ts">
  import { roomTypeLabels } from '$lib/utils/room';
	import type { Room } from '@prisma/client';

	export let data: {
		room?: Room;
	};
</script>

<div class="mx-auto max-w-xl px-4 py-8">
	<h1 class="mb-4 text-2xl font-bold">방 수정</h1>
	{#if data.room}
		<form method="POST" class="space-y-4">
      <div>
        <label for="type" class="mb-1 block font-medium">유형</label>
        <select name="type" class="w-full rounded border px-3 py-2" required>
          {#each Object.entries(roomTypeLabels) as [value, label]}
            <option value={value} selected={data.room.type === value}>{label}</option>
          {/each}
        </select>
      </div>



			<div>
				<label for="name" class="mb-1 block font-medium">이름</label>
				<input
					id="name"
					name="name"
					value={data.room.name}
					class="w-full rounded border px-3 py-2"
					required
				/>
			</div>

			<div>
				<label for="capacity" class="mb-1 block font-medium">수용 인원</label>
				<input
					id="capacity"
					name="capacity"
					type="number"
					value={data.room.capacity}
					class="w-full rounded border px-3 py-2"
					required
				/>
			</div>

			<div>
				<label for="location" class="mb-1 block font-medium">위치</label>
				<input
					id="location"
					name="location"
					value={data.room.location}
					class="w-full rounded border px-3 py-2"
					required
				/>
			</div>

			<button
				type="submit"
				class="rounded bg-blue-600 px-4 py-2 text-white shadow transition hover:bg-blue-700"
			>
				저장
			</button>
		</form>
	{:else}
		<p>Loading...</p>
	{/if}
</div>
