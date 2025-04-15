<!-- src/routes/login/+page.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/stores/auth';
	import { login } from '$lib/api/login';
	import type { LoginParam } from '$lib/types/LoginParam';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let loginId = '';
	let password = '';
	let error: string | null = null;
	let loginIdInput: HTMLInputElement;
	let passwordInput: HTMLInputElement;

	onMount(() => {
		loginIdInput.focus();
	});

	async function handleLogin() {
		if (!loginId) {
			loginIdInput.focus();
			return;
		}
		if (!password) {
			passwordInput.focus();
			return;
		}

		const params: LoginParam = { loginId, password };
		try {
			const result = await login(params);
			console.log(JSON.stringify(result, null, 2));
			if (result.success) {
				auth.set({ isLoggedIn: true, 
                    token: result.data.accessToken,
                    user_name: result.data.name,
                    id_no: result.data.memberNo,
                    dept_name: result.data.parentDept.name,
                    dept_code: result.data.parentDept.code
                });
				error = null;
				const target = $page.url.searchParams.get('redirect') || '/';
				goto(target);
			} else {
				error = result.message;
			}
		} catch (err) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'An unknown error occurred';
			}
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleLogin();
		}
	}
</script>

<div class="min-h-screen flex justify-center items-start bg-gray-100">
  <div class="w-full max-w-sm mt-40 bg-white p-6 rounded-xl shadow-md">
    <h2 class="text-xl font-semibold mb-4 text-center">Login</h2>

    <input
      class="w-full mb-3 p-3 border border-gray-300 rounded-md"
      type="text"
      placeholder="Portal ID"
      bind:this={loginIdInput}
      bind:value={loginId}
      on:keydown={handleKeydown}
    />

    <input
      class="w-full mb-3 p-3 border border-gray-300 rounded-md"
      type="password"
      placeholder="Password"
      bind:this={passwordInput}
      bind:value={password}
      on:keydown={handleKeydown}
    />

    <button
      class="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      on:click={handleLogin}
    >
      Login
    </button>

    {#if error}
      <p class="text-red-500 mt-4 text-sm">{error}</p>
    {/if}
  </div>
</div>


<style>
</style>
