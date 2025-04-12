<script lang="ts">
	// import { user } from '$lib/stores/user';
	import { logout, auth } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';

	let a = get(auth);

	const handleSelect = (type: 'STUDY' | 'READING' | 'LECTURE') => {
		if (type === 'STUDY') {
			window.location.href = '/study';
		} else if (type === 'READING') {
			window.location.href = '/reading';
		} else if (type === 'LECTURE') {
			window.location.href = '/lecture';
		}
	};

	function handleLogout() {
		logout();
		goto('/login');
	}

	onMount(() => {
		if (!a) {
			goto('/login');
		}
	});
</script>

{#if $auth.isLoggedIn}
	<div class="flex items-center justify-between p-4">
		<div class="text-lg font-semibold">👋 {$auth.user_name}님</div>
		<button class="text-sm text-red-500 hover:underline" on:click={handleLogout}>로그아웃</button>
	</div>
	{/if}
<main class="mx-auto max-w-md space-y-8 p-6 text-center text-neutral-800">
	{#if $auth.user_name}
		<div class="text-lg font-semibold">👋 {$auth.user_name}({$auth.id_no})님, 안녕하세요</div>
		<div class="text-base text-neutral-600">소속: {$auth.dept_name}({$auth.dept_code})</div>
	{/if}
	<div class="text-base text-neutral-600">어떤 공간을 예약하시겠어요?</div>

	<div class="grid gap-3">
		<button
			class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100"
			on:click={() => handleSelect('STUDY')}
		>
			토론실
		</button>
		<button
			class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100"
			on:click={() => handleSelect('READING')}
		>
			도담
		</button>
		<button
			class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100"
			on:click={() => handleSelect('LECTURE')}
		>
			강의실
		</button>
	</div>

	<div class="mt-8 text-sm text-neutral-400">최근 예약 기능은 곧 제공될 예정입니다.</div>
</main>
